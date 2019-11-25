import { PaymentPage } from 'src/components/PaymentPage';
import { Confirm } from 'src/components/Confirm';
import classProvider from 'src/utils/classProvider';
import { VERSION } from 'src/constants/version';
import { SUCCESS_RESULT, FAILED_RESULT } from 'src/constants/messages';
import { addMessageListener, removeMessageListener } from 'src/utils/bindListener';
import prepareUrl from 'src/utils/prepareUrl';
import changeLocation from 'src/utils/changeLocation';
import 'promise-polyfill/src/polyfill';
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
    constructor(publicId, targetElem, url = 'https://e-commerce.raiffeisen.ru/pay') {
        if (targetElem instanceof HTMLElement) {
            this.mount = targetElem;
        } else {
            this.mount = document.body;
        }

        this.publicId = publicId;
        this.version = VERSION;
        this.url = prepareUrl(url);
    }

    closePopup = res => () => {
        console.log("CLOSEPOPUP");
        res();

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
        console.log("FORCECLOSEPOPUP");
        if (this.paymentPage) {
            this.paymentPage.unmount();
        }

        if (this.confirm) {
            this.confirm.unmount();
        }

        removeMessageListener(window, this.messageBinding);
        this.messageBinding = null;

        enableScroll();
    };

    submitForm = (target = '_self', paymentData) => {
        const form = document.createElement('form');
        form.setAttribute('action', this.url);
        form.setAttribute('method', 'POST');
        form.setAttribute('target', target);

        Object.keys(paymentData).forEach(paymentDataKey => {
            const input = document.createElement('input');
            const value = prepareValue(paymentData[paymentDataKey]);

            input.setAttribute('value', value);
            input.setAttribute('name', paymentDataKey);

            form.appendChild(input);
        });


        this.mount.appendChild(form);
        form.submit();

        this.mount.removeChild(form);
    }

    openPopup = (amount, props) => new Promise((resolve, reject) => {
        if (this.paymentPage && this.paymentPage.isMount() && this.messageBinding) {
            return;
        }

        const { publicId, version } = this;
        const paymentData = {
            ...props, publicId, version, amount, successUrl: '#', failUrl: '#'
        };

        this.paymentPage = new PaymentPage();

        this.mount.appendChild(this.paymentPage.execute({
            onClose: this.closePopup(resolve),
            onForceClose: this.forceClosePopup,
            external: {
                resolve
            },
            url: this.url
        }));

        const { successUrl, failUrl } = props;

        this.messageBinding = addMessageListener(
            window,
            { finish: this.handleFinishPayment(resolve, reject, successUrl, failUrl) }
        );

        console.log(this.messageBinding);

        this.submitForm(this.paymentPage.name, paymentData);

        disableScroll();
    })

    openWindow = props => {
        const {
            publicId, version
        } = this;

        const paymentData = {
            publicId, version, ...props
        };

        this.submitForm('_blank', paymentData);
    }

    replace = props => {
        const {
            publicId, version
        } = this;

        const paymentData = {
            publicId, version, ...props
        };

        this.submitForm('_self', paymentData);
    }

    handleFinishPayment = (res, rej, successUrl, failUrl) => content => {
        if (content.result === SUCCESS_RESULT) {
            res();

            if (successUrl) {
                changeLocation(successUrl);

                return;
            }
        }

        if (content.result === FAILED_RESULT) {
            rej("test");

            if (failUrl) {
                changeLocation(failUrl);

                return;
            }
        }

        this.forceClosePopup();
    }
}

export default classProvider(PaymentPageSdk);
