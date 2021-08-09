# ```Raiffeisen Payment Page Sdk```

JS библиотека для работы с [формой оплаты Райффайзенбанка](https://pay.raif.ru/pay/demo.html).
[Конфигуратор](https://pay.raif.ru/pay/configurator/) формы оплаты Райффайзенбанка.

#  `Документация`

* [Подключение библиотеки](#подключение-библиотеки)
    * [Скриптом](#скриптом)
    * [Подключение модуля](#подключение-модуля)
* [Использование библиотеки](#использование-библиотеки)
    * [Простые сценарии](#простые-сценарии)
        * [Форма оплаты во всплывающем окне](#форма-оплаты-во-всплывающем-окне)
        * [Форма оплаты в новой вкладке](#форма-оплаты-в-новой-вкладке)
        * [Форма оплаты в той же вкладке](#форма-оплаты-в-той-же-вкладке)
    * [Расширенные сценарии](#расширенные-сценарии)
        * [Пример открытия во всплывающем окне с необязательными параметрами](#пример-открытия-во-всплывающем-окне-с-необязательными-параметрами)
        * [Пример открытия в новой вкладке с необязательными параметрами](#пример-открытия-в-новой-вкладке-с-необязательными-параметрами)
        * [Пример открытия в той же вкладке с необязательными параметрами](#пример-открытия-в-той-же-вкладке-с-необязательными-параметрами)
* [Дополнительно](#дополнительно)
    * [Подключение библиотеки скриптом](#подключение-библиотеки-скриптом)
    * [Раздельное подключение стилей отдельным файлом](#раздельное-подключение-стилей-отдельным-файлом)

## `Подключение библиотеки`

#### Скриптом

Для рабочего проекта подключите скрипт:

```
<script src="https://e-commerce.raiffeisen.ru/pay/sdk/v2/payment.styled.min.js"></script>
```

или

#### Подключение модуля

```
import PaymentPageSdk from '@raiffeisen-ecom/payment-sdk';
```

Иные варианты подключения расположены в разделе [дополнительно](#дополнительно)

## `Использование библиотеки`

Работа происходит через обращения к классу `PaymentPageSdk`.

В параметрах конструктора нужно указать обязательный параметр `publicId`
и необязательный, в случае, если нужно выбрать определенный сервер для работы
(test/production) - `url`

`test`
```js
    const paymentPage = new PaymentPageSdk('000001680200002-80200002', {
        url: 'https://test.ecom.raiffeisen.ru/pay'
    });
```

`prod`

```js
    const paymentPage = new PaymentPageSdk('000001780049001-80049001');
```


### `Простые сценарии`

Обязательные парамеры:

* publicId (String) - идентификатор продавца;
* amount (Amount) - стоимость товара;

#### Форма оплаты во всплывающем окне

Для отслеживания успешности оплаты метод openPopup возвращает Promise,
позволяющий подписаться на успешную оплату или закрытие окна.

```js
paymentPage.openPopup({amount: 10.10})
        .then(function(resolve) {
                        //console.log(resolve, "Спасибо");
                    })
        .catch(function() {
                        //console.log("Неудача");
                    });
```

#### Форма оплаты в новой вкладке

```js
paymentPage.openWindow({amount: 10.10});
```

#### Форма оплаты в той же вкладке

```js
paymentPage.replace({amount: 10.10});
```

### `Расширенные сценарии`

**Обязательные параметры:**

* publicId (String) - идентификатор продавца;
* amount (Amount) - стоимость товара;

**Необязательные параметры:**

* orderId (String) - номер заказа (в строке разрешены символы английского алфавита, цифры, а также два специальных символа: "-", "_" ([0-9a-zA-Z\-\_]+));
* successUrl (String) - ссылка, на которую перейдёт покупатель, в случае успешной оплаты.
Поддерживается только для openWindow или replace;
* failUrl (String) - ссылка, на которую перейдёт покупатель, в случае неудачной оплаты.
Поддерживается только для openWindow или replace;
* extra (Object) - любые данные, которые можно получить при вызове колбэка;
* comment (String) - описание товара, который приобретает покупатель.
* paymentMethod (['ONLY_SBP', 'ONLY_ACQUIRING
']) - способ оплаты, отображающий соответствующую форму. Если параметр не передан отображается и acquiring, и СБП.
* locale (['ru', 'en']) - Выбор языка формы, по умолчанию `ru`.

Дополнительно можно стилизовать страницу, это достигается путём добавления параметра `style`:

* style (Object)
    * button - кнопка
        * backgroundColor - цвет фона
        * textColor - цвет текста
        * hoverTextColor - цвет текста при наведении
        * hoverBackgroundColor - цвет фона при наведении
        * borderRadius - радиус
    * header - шапка формы
        * logo - ссылка на логотип
        * titlePlace - расположение

В зависимости от titlePlace зависит размер логотипа:

* titlePlace: 'RIGHT' => узкий логотип: 60x40;
* titlePlace: 'BOTTOM' => широкий логотип: 340x40.

**Для фискализации чеков на форме оплаты:**

* receiptNumber (String
) `maxLength: 128
` - уникальный номер чека, который создается на стороне мерчанта. Выполняет роль сквозного идентификатора. Формат A
-Za-z0-9_-;
* client (Object) - данные о покупателе;
    * email (String) - электронный адрес покупателя для отправки чека;
    * name (String) `maxLength: 256` - ФИО покупателя;
* items (Object[]) - позиции чека (не более 100 объектов);
    * name (String) `maxLength: 128` - наименование товара, работы, услуги, иного предмета расчета;
    * price (Number) - цена за единицу товара, работы, услуги, иного предмета расчета в рублях (8
     символов на целую часть, 2 - на дробную);
    * quantity (Number) - количество/вес (5 символов на целую часть, 3 - на дробную);
    * amount (Number) `maxLength: 256` - сумма в рублях (8 символов на целую часть, 2 - на дробную);
    * measurementUnit (String) `maxLength: 16` - единица измерения товара, работы, услуги, иного предмета расчета;
    * nomenclatureCode (String) `maxLength: 150` - код товара;
    * vat (Object) -  Данные о налоге на позицию чека;
        * type (String) - ставка НДС ['none', 'vat0', 'vat10', 'vat110', 'vat20', 'vat120'];
        * amount (Number) - Сумма налога на позицию чека в рублях (8 символов на целую часть, 2
         - на дробную);
* total (Number) - Итоговая сумма чека (8 символов на целую часть, 2 - на дробную);

```js
paymentPage.openPopup({
  "publicId": "000001680200002-80200002",
  "orderId": "orderTest",
  "amount": 1000.5,
  "receiptNumber": 3000827351831,
  "client": {
    "email": "customer@domain.ru",
    "name": "Иванов Иван Иванович"
  },
  "items": [
    {
      "name": "Шоколадные конфеты",
      "price": 1000,
      "quantity": 1.2,
      "amount": 1200,
      "measurementUnit": "кг",
      "nomenclatureCode": 1704909900,
      "vat": {
        "type": "vat20",
        "amount": 200
      }
    }
  ],
  "total": 1200
})
```

#### Пример открытия во всплывающем окне с необязательными параметрами

```
paymentPage.openPopup({
                        amount: 10.10,
                        orderId: '91700',
                        extra: {
                            email: 'test@test.ru',
                            login: 'testLogin',
                            phone: '79191234567'
                        },
                        style: {
                            button: {
                                backgroundColor: '#ffc800',
                                textColor: '#542595',
                                hoverTextColor: '#ffc800',
                                hoverBackgroundColor: '#542595',
                                borderRadius: '3px'
                            },
                            header: {
                                logo: 'https://www.raiffeisen.ru/common/new/images/logo-raif.svg',
                                titlePlace: 'RIGHT'
                            }
                        },
                        comment: 'Тирольский пирог с яблоками, грушами, ветчиной, сыром, ананасами, 50см'
                    })
        .then(function(resolve) {
                        //console.log(resolve, "Спасибо");
                    })
        .catch(function() {
                        //console.log("Неудача");
                    });
);
```

#### Пример открытия в новой вкладке с необязательными параметрами

В openWindow передаются необязательные параметры для возврата пользователя на страницу,
в зависимости от результата оплаты: successUrl и failUrl.

```
paymentPage.openWindow({
                        amount: 10.10,
                        orderId: '91700',
                        successUrl: 'https://www.raiffeisen.ru',
                        failUrl: 'https://e-commerce.raiffeisen.ru/pay/demo.html',
                        extra: {
                            email: 'test@test.ru',
                            login: 'testLogin',
                            phone: '79191234567'
                        },
                        style: {
                            button: {
                                backgroundColor: '#ffc800',
                                textColor: '#542595',
                                hoverTextColor: '#ffc800',
                                hoverBackgroundColor: '#542595',
                                borderRadius: '3px'
                            },
                            header: {
                                logo: 'https://www.raiffeisen.ru/common/new/images/logo-raif.svg',
                                titlePlace: 'RIGHT'
                            }
                        },
                        comment: 'Тирольский пирог с яблоками, грушами, ветчиной, сыром, ананасами, 50см'
                    });
```

#### Пример открытия в той же вкладке с необязательными параметрами

То же самое, что и [открытие в новой вкладке](#пример-открытия-в-новой-вкладке-с-необязательными-параметрами),
только необходимо использовать метод `paymentPage.replace()`

## `Дополнительно`

### Подключение библиотеки скриптом

Не минифицированный скрипт со стилями внутри:

```
<script src="https://e-commerce.raiffeisen.ru/pay/sdk/v2/payment.styled.js"></script>
```

### Раздельное подключение стилей отдельным файлом

#### Скриптом

Подключение стилей:

```
<link rel="stylesheet" href="https://e-commerce.raiffeisen.ru/pay/sdk/v2/payment.min.css">
```

Подключение библиотеки:

```
<script src="https://e-commerce.raiffeisen.ru/pay/sdk/v2/payment.min.js"></script>
```

#### Подключение модуля

Подключение стилей:

```
import '@raiffeisen-ecom/payment-sdk/lib-style/index.css';
```

Подключение библиотеки:

```
import PaymentPageSdk from '@raiffeisen-ecom/payment-sdk/lib-style';
```
