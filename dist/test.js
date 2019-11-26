(function() {
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
                titlePlace: 'right'
            }
        },
        2,
        2
    );

    document.getElementById('orderId').value = Math.floor(Math.random() * 99999).toString().substr(0, 5);

    var getPaymentData = function () {
        var extraString = document.getElementById('extra').value; // параметры, которые придут пользователю (любые данные)
        var receiptString = document.getElementById('receipt').value; // нужен для того, чтобы зарегистрировать чек
        var styleString = document.getElementById('style').value; // мерч может сам настроить стилизацию

        var result = {
            amount: document.getElementById('amount').value, // цена
            orderId: document.getElementById('orderId').value, // номер заказа
            successUrl: document.getElementById('successUrl').value,
            failUrl: document.getElementById('failUrl').value,
            comment: document.getElementById('comment').value, // описание товара
            publicId: document.getElementById('publicId').value
        };

        try {
            var extra = JSON.parse(extraString);

            result.extra = extra;
        } catch (e) {

        }

        try {
            var receipt = JSON.parse(receiptString);

            result.receipt = receipt;
        } catch (e) {

        }

        try {
            var style = JSON.parse(styleString);

            result.style = style;
        } catch (e) {

        }

        return result;
    };

    var getTarget = function() {
        return document.getElementById('target').value
    }

    document.getElementById('openPopup').addEventListener('click', function() {
        var style = document.getElementById('style').value;
        var paymentData = getPaymentData();

        var paymentPage = new PaymentPageSdk(getPaymentData().publicId, {
            style, targetElem: null, url: getTarget()
        });

        var amount = paymentData.amount;
        var orderId = paymentData.orderId;
        var comment = paymentData.comment;

        paymentPage.openPopup(amount, {
            orderId: orderId, comment: comment
        })
            .then(function(result) {
                console.log('resolve', result);
            })
            .catch(function(result) {
                console.log('reject', result);
            });
    });

    document.getElementById('openSelf').addEventListener('click', function() {
        var paymentPage = new PaymentPageSdk(getPaymentData().publicId, {
            targetElem: null, url: getTarget()
        });
        var paymentData = getPaymentData();

        var amount = paymentData.amount;
        var successUrl = paymentData.successUrl;
        var failUrl = paymentData.failUrl;

        paymentPage.replace({ amount: amount, successUrl: successUrl, failUrl: failUrl });
    });

    document.getElementById('openBlank').addEventListener('click', function() {
        var paymentPage = new PaymentPageSdk(getPaymentData().publicId, {
            targetElem: null, url: getTarget()
        });
        var paymentData = getPaymentData();

        var amount = paymentData.amount;
        var successUrl = paymentData.successUrl;
        var failUrl = paymentData.failUrl;

        paymentPage.openWindow({
            amount: amount, successUrl: successUrl, failUrl: failUrl
        });
    });
})();