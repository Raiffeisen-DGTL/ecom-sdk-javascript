(function () {
    document.getElementById('extra').value = JSON.stringify(
        {
            lol: 'qweqwe',
            kek: 'asdfasdf'
        },
        2,
        2
    );

    document.getElementById('style').value = JSON.stringify(
        {
            button: {
                backgroundColor: '#ffc800',
                textColor: '#542595',
                hoverTextColor: '#ffc800',
                hoverBackgroundColor: '#542595',
                borderRadius: '3px'
            },
            header: {
                logo: 'http://t1.gstatic.com/images?q=tbn:ANd9GcRHyucFf66c6YZGyErymx67X_VSzI_WX5xsLwJbJ9wyJxY3Cz1P',
                titlePlace: 'RIGHT'
            }
        },
        2,
        2
    );

    document.getElementById('receipt').value = JSON.stringify(
        {
            customer: {
                email: 'test@test.ru',
                name: 'Петров Иван Олегович'
            },
            receiptNumber: '1234',
            items: [{
                name: 'Наименование товара',
                price: 10.11,
                quantity: 2,
                amount: 20.22,
                paymentObject: 'commodity',
                vatType: 'vat20'
            }]
        },
        2,
        2
    );

    const today = new Date();
    today.setDate(today.getDate() + 3);
    const todayISOString = today.toISOString();
    document.getElementById('expirationDate').value = `${todayISOString.slice(0, todayISOString.length - 1)}+03:00`;

    document.getElementById('orderId').value = Math.floor(Math.random() * 99999).toString().substr(0, 5);

    const getPaymentData = function () {
        const extraString = document.getElementById('extra').value; // параметры, которые придут пользователю (любые данные)
        const receiptString = document.getElementById('receipt').value; // нужен для того, чтобы зарегистрировать чек
        const styleString = document.getElementById('style').value; // мерч может сам настроить стилизацию

        const result = {
            amount: document.getElementById('amount').value, // цена
            orderId: document.getElementById('orderId').value, // номер заказа
            successUrl: document.getElementById('successUrl').value,
            failUrl: document.getElementById('failUrl').value,
            successSbpUrl: document.getElementById('successSbpUrl').value,
            comment: document.getElementById('comment').value, // описание товара
            publicId: document.getElementById('publicId').value,
            paymentMethod: document.getElementById('paymentMethod').value,
            locale: document.getElementById('locale').value,
            expirationDate: document.getElementById('expirationDate').value
        };

        result.extra = extraString ? JSON.parse(extraString) : '';

        result.receipt = receiptString ? JSON.parse(receiptString) : '';

        result.style = styleString ? JSON.parse(styleString) : '';

        return result;
    };

    const getTarget = function () {
        return document.getElementById('target').value;
    };

    document.getElementById('openPopup').addEventListener('click', function () {
        const paymentData = getPaymentData();

        const paymentPage = new PaymentPageSdk(getPaymentData().publicId, {
            targetElem: null, url: getTarget()
        });

        paymentPage.openPopup({
            amount: paymentData.amount,
            orderId: paymentData.orderId,
            comment: paymentData.comment,
            extra: paymentData.extra,
            style: paymentData.style,
            paymentMethod: paymentData.paymentMethod,
            locale: paymentData.locale,
            receipt: paymentData.receipt,
            expirationDate: paymentData.expirationDate,
            successSbpUrl: paymentData.successSbpUrl
        })
            .then(function (result) {
                console.log('resolve', result);
            })
            .catch(function (result) {
                console.log('reject', result);
            });
    });

    document.getElementById('openSelf').addEventListener('click', function () {
        const paymentData = getPaymentData();

        const paymentPage = new PaymentPageSdk(getPaymentData().publicId, {
            targetElem: null, url: getTarget()
        });

        paymentPage.replace({
            amount: paymentData.amount,
            orderId: paymentData.orderId,
            successUrl: paymentData.successUrl,
            failUrl: paymentData.failUrl,
            successSbpUrl: paymentData.successSbpUrl,
            comment: paymentData.comment,
            extra: paymentData.extra,
            style: paymentData.style,
            paymentMethod: paymentData.paymentMethod,
            locale: paymentData.locale,
            receipt: paymentData.receipt,
            expirationDate: paymentData.expirationDate
        });
    });

    document.getElementById('openBlank').addEventListener('click', function () {
        const paymentData = getPaymentData();

        const paymentPage = new PaymentPageSdk(getPaymentData().publicId, {
            url: getTarget()
        });

        paymentPage.openWindow({
            amount: paymentData.amount,
            orderId: paymentData.orderId,
            successUrl: paymentData.successUrl,
            failUrl: paymentData.failUrl,
            successSbpUrl: paymentData.successSbpUrl,
            comment: paymentData.comment,
            extra: paymentData.extra,
            style: paymentData.style,
            paymentMethod: paymentData.paymentMethod,
            locale: paymentData.locale,
            receipt: paymentData.receipt,
            expirationDate: paymentData.expirationDate
        });
    });
})();
