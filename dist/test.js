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
        var extraString = document.getElementById('extra').value;
        var receiptString = document.getElementById('receipt').value;
        var styleString = document.getElementById('style').value;

        var result = {
            amount: document.getElementById('amount').value,
            orderId: document.getElementById('orderId').value,
            successUrl: document.getElementById('successUrl').value,
            failUrl: document.getElementById('failUrl').value,
            publicId: document.getElementById('publicId').value,
            comment: document.getElementById('comment').value
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
        var paymentPage = new PaymentPageSdk( getPaymentData().publicId, getPaymentData().failUrl,
            getPaymentData().successUrl, null, getTarget());

        const {
            amount, orderId, comment
        } = getPaymentData();

        paymentPage.openPopup({
            amount, orderId, comment
        });
    });

    document.getElementById('openSelf').addEventListener('click', function() {
        var paymentPage = new PaymentPageSdk(getPaymentData().publicId, getPaymentData().failUrl,
            getPaymentData().successUrl, null, getTarget());

        const {
            amount, orderId, successUrl, failUrl, comment
        } = getPaymentData();

        paymentPage.open(false, {
            amount, orderId, successUrl, failUrl, comment
        });
    });

    document.getElementById('openBlank').addEventListener('click', function() {
        var paymentPage = new PaymentPageSdk(getPaymentData().publicId, getPaymentData().failUrl,
            getPaymentData().successUrl, null, getTarget());

        const {
            amount, orderId, successUrl, failUrl, comment
        } = getPaymentData();

        paymentPage.open(true, {
            amount, orderId, successUrl, failUrl, comment
        });
    });
})();
