# Payment Page Sdk

Js библиотека для открытия формы оплаты в popup окне.

## Использование

Подключение

```
import PaymentPageSdk from '@raiffeisen-ecom/payment-sdk';
```

или 

```
<script src="https://e-commerce.raiffeisen.ru/pay/sdk/payment.styled.js"></script>
<script src="https://e-commerce.raiffeisen.ru/pay/sdk/payment.styled.min.js"></script>
```

Запуск

```
const paymentPage = new PaymentPageSdk(
    {
        amount: 10.11, // обязательное
        orderId: '8277611111532', // необязательное
        merchantUrl: 'http://google.com', // необязательное
        merchantName: 'RAIFFAISEN', // необязательное
        successUrl: 'https://raiffeisen.ru/index/success/', // необязательное
        failUrl: 'https://raiffeisen.ru/index/fail/', // необязательное
        publicId: '000001680211111-80211111', // обязательное
        phone: '71111111111', // необязательное
        extra: { qwe: 'qwe' }, // необязательное
        receipt: { qwe: 'adsf' } // необязательное
    },
    document.getElementById('mount'), // в какой элемент будет монтироваться попап, document.body используется если передан не HTMLElement
    https://e-commerce.raiffeisen.ru/pay // целевой url для payment-page, default https://e-commerce.raiffeisen.ru/pay
);

paymentPage.open(true); // открыть в новом окне
paymentPage.open(); // открыть в текущем окне
paymentPage.openPopup(); // открыть в popup
```

## Дополнительно

Стили зашиты в js файл, есть версия в которой стили вынесесены в отдельный файл. Тогда подключение выглядит так

```
import PaymentPageSdk from '@raiffeisen-ecom/payment-sdk/lib-style';
import '@raiffeisen-ecom/payment-sdk/lib-style/index.css';
```

или

```
<link rel="stylesheet" href="https://e-commerce.raiffeisen.ru/pay/sdk/payment.min.css">
<script src="https://e-commerce.raiffeisen.ru/pay/sdk/payment.min.js"></script>
```
