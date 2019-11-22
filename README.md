# Payment Page Sdk

Js библиотека для открытия формы оплаты в popup окне.

## Подключение

Если вы используете React, то для подключения библиотеки пропишите следующий import:

```
import PaymentPageSdk from '@raiffeisen-ecom/payment-sdk';
```

или

Для использования библиотеки только в рабочем проекте, то подключите минимифицированный скрипт:

```
<script src="https://e-commerce.raiffeisen.ru/pay/sdk/payment.styled.min.js"></script>
```

Для использования читаемого кода в своих целей, то подключите обычный скрипт:

```
<script src="https://e-commerce.raiffeisen.ru/pay/sdk/payment.styled.js"></script>
```

## Использование библиотеки

Вся работа с библиотекой происходит через обращения к классу `PaymentPageSdk`

Поля `PaymentPageSdk`:

### Запуск библиотеки

#### Минимальные условия для запуска:

Для корректной работы библиотеки нужно использовать обязательный набор параметров:

* amount (Amount) - стоимость товара;
* publicId (String) - идентификатор продавца;

Форма оплаты в виде всплывающего окна:

```
const paymentPage = new PaymentPageSdk('000001680211111-80211111');

paymentPage.openPopup({amount: 10.10})
        .then(resolve => {
                        console.log(resolve, "Спасибо");
                    })
        .catch(() => {
                        console.log("Неудача");
                    });
);
```

Открытие в новой вкладке:

```
const paymentPage = new PaymentPageSdk('000001680211111-80211111');

paymentPage.openWindow({amount: 10.10}); // открыть в новом окне
```

Открытие в той же вкладке:

```
const paymentPage = new PaymentPageSdk('000001680211111-80211111');

paymentPage.replace({amount: 10.10}); // открыть в текущем окне
```


#### Расширенные параметры для запуска:

Для использования полного функционала библиотеки используйте расширенный набор параметров:

* amount (Amount) - стоимость товара;
* publicId (String) - идентификатор продавца;
* orderId (String) - номер заказа;
* extraString (String) - любые данные, которые продавец хочет получить при вызове колбэка;
* receiptString (String) - параметр, который позволяет зарегистрировать чек покупки;
* styleString (String) - продавцу предоставляется возможность самому изменить стилизацию страницы;
* successUrl (String) - ссылка, на которую перейдёт покупатель, в случае успешной оплаты;
* failUrl (String) - ссылка, на которую перейдёт покупатель, в случае неудачной оплаты;
* comment (String) - описание товара, который приобретает покупатель.

Форма оплаты в виде всплывающего окна:

```
const paymentPage = new PaymentPageSdk('000001680211111-80211111');

paymentPage.openPopup({
                        amount: 10.10,
                        orderId: '91700',
                        extra: '{"lol": "qweqwe"},                      
                        receipt: '{"okoko":"MNMNMNM"},
                        style: {
                            "button": {
                            "backgroundColor": "#ffc800"
                        },
                        comment: 'Тирольский пирог с яблоками, грушами, ветчиной, сыром, ананасами, 50см'
                    })
        .then(resolve => {
                        console.log(resolve, "Спасибо");
                    })
        .catch(() => {
                        console.log("Неудача");
                    });
);
```

Для открытия в новой вкладке:

```
const paymentPage = new PaymentPageSdk('000001680211111-80211111');

paymentPage.openWindow({
                        amount: 10.10,
                        orderId: '91700',
                        extraString: '{"lol": "qweqwe"}',
                        receiptString: '{"okoko":"MNMNMNM"}',
                        styleString: '{
                            "button": {
                            "backgroundColor": "#ffc800"
                        }',
                        successUrl: 'http://fb.com',
                        failUrl: 'http://vc.ru',
                        comment: 'Тирольский пирог с яблоками, грушами, ветчиной, сыром, ананасами, 50см'
                    });
```

Для открытия в той же вкладке:

```
const paymentPage = new PaymentPageSdk('000001680211111-80211111');

paymentPage.replace({
                        amount: 10.10,
                        orderId: '91700',
                        extraString: '{"lol": "qweqwe"}',
                        receiptString: '{"okoko":"MNMNMNM"}',
                        styleString: '{
                            "button": {
                            "backgroundColor": "#ffc800"
                        }',
                        successUrl: 'http://fb.com',
                        failUrl: 'http://vc.ru',
                        comment: 'Тирольский пирог с яблоками, грушами, ветчиной, сыром, ананасами, 50см'
                    });
```

## Дополнительно

В React-проекте подключение будет выглядеть следующим образом:

```
import PaymentPageSdk from '@raiffeisen-ecom/payment-sdk/lib-style';
import '@raiffeisen-ecom/payment-sdk/lib-style/index.css';
```

или

Для подключения стилей напрямую:

```
<link rel="stylesheet" href="https://e-commerce.raiffeisen.ru/pay/sdk/payment.min.css">
```

Для подключения стилей, которые зашиты в js-файл:

```
<script src="https://e-commerce.raiffeisen.ru/pay/sdk/payment.min.js"></script>
```