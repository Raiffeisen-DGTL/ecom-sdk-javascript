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
      comment: document.getElementById('comment').value, // описание товара
      publicId: document.getElementById('publicId').value,
      paymentMethod: document.getElementById('paymentMethod').value,
      locale: document.getElementById('locale').value
    };

    result.extra = JSON.parse(extraString);

    result.receipt = JSON.parse(receiptString);

    result.style = JSON.parse(styleString);

    return result;
  };

  const getTarget = function () {
    return document.getElementById('target').value;
  }

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
      locale: paymentData.locale
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
      comment: paymentData.comment,
      extra: paymentData.extra,
      style: paymentData.style,
      paymentMethod: paymentData.paymentMethod,
      locale: paymentData.locale
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
      comment: paymentData.comment,
      extra: paymentData.extra,
      style: paymentData.style,
      paymentMethod: paymentData.paymentMethod,
      locale: paymentData.locale
    });
  });
})();
