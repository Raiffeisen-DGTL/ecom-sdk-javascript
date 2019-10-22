import { PaymentPage } from 'src/components/PaymentPage';
import { Confirm } from 'src/components/Confirm';
import classProvider from 'src/utils/classProvider';
import { VERSION } from 'src/constants/version';
import { SUCCESS_RESULT, FAILED_RESULT } from 'src/constants/messages';
import { addMessageListener, removeMessageListener } from 'src/utils/bindListener';
import prepareUrl from 'src/utils/prepareUrl';
import changeLocation from 'src/utils/changeLocation';
import { disableScroll, enableScroll } from './utils/scroll';

const prepareValue = value => {
    if (value instanceof Object) {
        try {
            return JSON.stringify(value);
        } catch (e) {
            return '';
        }
    }

    return value;
};

class PaymentPageSdk {
    constructor(paymentData = {}, targetElem, url = 'https://e-commerce.raiffeisen.ru/pay') {
        if (targetElem instanceof HTMLElement) {
            this.mount = targetElem;
        } else {
            this.mount = document.body;
        }

        this.paymentData = { ...paymentData, version: VERSION };
        this.url = prepareUrl(url);

        this.messageBinding = addMessageListener(
            window,
            { finish: this.handleFinishPayment }
        );
    }

    openPopup = () => {
        if (this.paymentPage && this.paymentPage.isMount()) {
            return;
        }

        this.paymentPage = new PaymentPage();

        this.mount.appendChild(this.paymentPage.execute({
            paymentData: this.paymentData,
            onClose: this.closePopup,
            onForceClose: this.forceClosePopup,
            url: this.url
        }));

        this.submitForm(this.paymentPage.name);

        disableScroll();
    }

    closePopup = () => {
        if (
            (this.confirm && this.confirm.isMount())
            || !this.paymentPage
            || !this.paymentPage.isMount()
        ) {
            return;
        }

        this.confirm = new Confirm();

        this.mount.appendChild(this.confirm.execute({
            onClose: this.forceClosePopup,
            onCancel: () => this.confirm.unmount()
        }));
    };

    forceClosePopup = () => {
        if (this.paymentPage) {
            this.paymentPage.unmount();
        }

        if (this.confirm) {
            this.confirm.unmount();
        }

        removeMessageListener(window, this.messageBinding);

        enableScroll();
    };

    submitForm = (target = '_self') => {
        const form = document.createElement('form');
        form.setAttribute('action', this.url);
        form.setAttribute('method', 'POST');
        form.setAttribute('target', target);

        Object.keys(this.paymentData).forEach(paymentDataKey => {
            const input = document.createElement('input');
            const value = prepareValue(this.paymentData[paymentDataKey]);

            input.setAttribute('value', value);
            input.setAttribute('name', paymentDataKey);

            form.appendChild(input);
        });

        this.mount.appendChild(form);
        form.submit();

        this.mount.removeChild(form);
    }

    open = isTargetBlank => {
        this.submitForm(isTargetBlank ? '_blank' : '_self');
    }

    handleFinishPayment = content => {
        if (content.result === SUCCESS_RESULT && this.paymentData.successUrl) {
            changeLocation(this.paymentData.successUrl);

            return;
        }

        if (content.result === FAILED_RESULT && this.paymentData.failUrl) {
            changeLocation(this.paymentData.failUrl);

            return;
        }

        this.forceClosePopup();
    }
}

export default classProvider(PaymentPageSdk);
