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
const paymentPage = new PaymentPageSdk( '000001680211111-80211111');

paymentPage.openWindow(10.11); // открыть в новом окне
paymentPage.replace(10.11); // открыть в текущем окне
paymentPage.openPopup(10.11, {orderId: '8277611111532', 
                              comment: 'Тирольский пирог с яблоками, грушами, ветчиной, сыром, ананасами, 50см'} /* необязательное */
); // открыть в popup

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
