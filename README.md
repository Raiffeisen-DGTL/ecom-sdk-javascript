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
        successUrl: 'https://raiffeisen.ru/index/success/', // необязательное
        failUrl: 'https://raiffeisen.ru/index/fail/', // необязательное
        publicId: '000001680211111-80211111', // обязательное
    },
    document.getElementById('mount'), // в какой элемент будет монтироваться попап, document.body используется если передан не HTMLElement
    https://e-commerce.raiffeisen.ru/pay // целевой url для payment-page, default https://e-commerce.raiffeisen.ru/pay
);

const { amount, orderId, comment } = {
                                        amount: 10.11, // обязательное
                                        orderId: '8277611111532', // необязательное
                                        successUrl: 'https://raiffeisen.ru/index/success/', // необязательное
                                        failUrl: 'https://raiffeisen.ru/index/fail/', // необязательное
                                        publicId: '000001680211111-80211111', // обязательное
                                        comment: 'Тирольский пирог с яблоками, грушами, ветчиной, сыром, ананасами, 50см'
                                      };

paymentPage.open(true, amount, orderId, comment); // открыть в новом окне
paymentPage.open(false, amount, orderId, comment); // открыть в текущем окне
paymentPage.openPopup(amount, orderId, comment); // открыть в popup
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
