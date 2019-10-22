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
        orderId: '8277611111532asdf', // необязательное
        merchantUrl: 'http://google.com', // необязательное
        merchantName: 'CASTORAMA', // необязательное
        successUrl: 'https://castorama-ecom-staging.oggy.co/raiffeisen/index/success/', // необязательное
        failUrl: 'https://castorama-ecom-staging.oggy.co/raiffeisen/index/fail/', // необязательное
        publicId: '000001680200002-80200002', // обязательное
        phone: '79833001077', // необязательное
        extra: { qwe: 'qwe' }, // необязательное
        receipt: { qwe: 'adsf' } // необязательное
    },
    document.getElementById('mount'), // в какой элемент бует монтироваться попап, document.body используется если передан не HTMLElement
    https://e-commerce.raiffeisen.ru/pay // целевой url для payment-page, default https://e-commerce.raiffeisen.ru/pay
);

paymentPage.open(true); // открыть в новом оке
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
