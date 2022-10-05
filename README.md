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
* amount (Amount) - стоимость товара, для копеек доступно два знака после точки;

#### Форма оплаты во всплывающем окне

Для отслеживания успешности оплаты метод openPopup возвращает Promise,
позволяющий подписаться на успешную оплату или закрытие окна.

```js
paymentPage.openPopup({amount: 10.10})
        .then(function() {
            // console.log("Спасибо");
        })
        .catch(function() {
            // console.log("Неудача");
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

* [Без чека](#без-чека)
* [С чеком (ФФД 1.05)](#с-чеком-ффд-1-05)
* [С чеком (ФФД 1.2)](#с-чеком-ффд-1-2)

### Без чека
**Обязательные параметры:**

* publicId (String) - идентификатор продавца;
* amount (Amount) - стоимость товара, для копеек доступно два знака после точки;

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
* expirationDate (String) - Срок жизни заказа. YYYY-MM-DD ТHH24:MM:SS±HH:MM

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

### С чеком (ФФД 1.05)

> Если вы хотите фискализировать чеки через форму оплаты по ФФД 1.05, необходимо дополнительно передавать параметры чека:

* receipt (Object)
  * receiptNumber (String) `maxLength: 99
` – уникальный номер чека. Формат `A-Za-z0-9_-`;
  * customer (Object) – данные о покупателе;
    * email (String) `maxLength: 64` - электронный адрес покупателя для отправки чека;
    * name (String) `maxLength: 256` - ФИО покупателя;
  * items (Object[]) `required` – позиции чека (не более 100 объектов);
    * name (String) `required` `maxLength: 128` - наименование товара, работы, услуги, иного предмета расчета;
    * price (Number) `required` – цена за единицу товара, работы, услуги, иного предмета расчета в рублях (8 символов на целую часть, 2 - на дробную);
    * quantity (Number) `required` – количество/вес (5 символов на целую часть, 3 - на дробную);
    * amount (Number) `required` – итоговая сумма в рублях (8 символов на целую часть, 2 - на дробную);
    * paymentObject (String) – признак предмета расчёта ['COMMODITY', 'EXCISE', 'JOB', 'SERVICE', 'PAYMENT', 'ANOTHER']. Для авансовых чеков и чеков частичной предоплаты должен заполняться значением PAYMENT. Если параметр не передан, то заполняется значением COMMODITY по умолчанию;
    * paymentMode (String) – способ расчета ['FULL_PREPAYMENT', 'FULL_PAYMENT', 'ADVANCE', 'PREPAYMENT']. Если параметр не передан, по умолчанию устанавливается значение FULL_PREPAYMENT.
      * FULL_PREPAYMENT – 100% предоплата до момента передачи предмета расчета
      * FULL_PAYMENT – полная оплата в момент передачи предмета расчета
      * ADVANCE – аванс
      * PREPAYMENT – частичная предоплата до момента передачи предмета расчета;
    * measurementUnit (String) `maxLength: 16` – единица измерения товара, работы, услуги, иного предмета расчета;
    * nomenclatureCode (String) `maxLength: 150` – номенклатурный код товара в 16-ричном представлении с пробелами или в формате GS1 DataMatrix. Например, "00 00 00 00 12 00 AB 00" или "010463003407001221CMK45BrhN0WLf";
    * vatType (String) `required` – ставка НДС ['NONE', 'VAT0', 'VAT10', 'VAT110', 'VAT20', 'VAT120'];
    * agentType (String) – признак агента по предмету расчета. Заполняется только для операций через агента ['BANK_PAYING_AGENT', 'BANK_PAYING_SUBAGENT', 'PAYING_AGENT', 'PAYING_SUBAGENT', 'ATTORNEY' , 'COMMISSION_AGENT', 'ANOTHER'];
    * supplierInfo (Object) – данные о поставщике. Обязательно к заполнению, если заполнен параметр agentType;
      * phone (String) – телефон поставщика. Заполняется по формату "+79991234567", после кода +7 должно быть указано 10 цифр;
      * name (String) – наименование поставщика;
      * inn (String) `required` `maxLength: 12` – ИНН поставщика. Может содержать только цифры в количестве 10 или 12 символов;
  * payments (Object[]) – данные об оплате, только для чеков с зачетом аванса или частичной предоплаты. Если payments не передан, то по умолчанию заполняется безналичным видом оплаты и ее суммой, которая равна сумме чека;
    * type (String) `required` – вид оплаты ['E_PAYMENT', 'PREPAID'].
      * E_PAYMENT – безналичная оплата
      * PREPAID – предварительная оплата (зачет аванса и/или предыдущих платежей);
    * amount (Number) `required` – сумма оплаты

### С чеком (ФФД 1.2)

> Если вы хотите фискализировать чеки через форму оплаты по ФФД 1.2, необходимо дополнительно передавать параметры чека:

* receipt (Object)
    * receiptNumber (String) `maxLength: 99` – уникальный номер чека. Формат `A-Za-z0-9_-`;
    * customer (Object) – данные о покупателе;
        * email (String) `maxLength: 64` – электронный адрес покупателя для отправки чека;
        * extra (Object) – дополнительная информация о покупателе. Заполняется как объект свободного наполнения;
    * items (Object[]) `required` – позиции чека (не более 100 объектов);
        * name (String) `required` `maxLength: 128` - наименование товара, работы, услуги, иного предмета расчета;
        * price (Number) `required` – цена за единицу товара, работы, услуги, иного предмета расчета в рублях (8 символов на целую часть, 2 - на дробную);
        * quantity (Number) `required` – количество/вес (5 символов на целую часть, 3 - на дробную);
        * amount (Number) `required` – итоговая сумма в рублях (8 символов на целую часть, 2 - на дробную);
        * paymentObject (String) – признак предмета расчёта ['COMMODITY', 'COMMODITY_MARKING_NO_CODE', 'COMMODITY_MARKING_WITH_CODE', 'EXCISE', 'EXCISE_MARKING_NO_CODE', 'EXCISE_MARKING_WITH_CODE', 'JOB', 'SERVICE', 'PAYMENT', 'ANOTHER']. Для авансовых чеков и чеков частичной предоплаты должен заполняться значением PAYMENT. Если параметр не передан, то заполняется значением COMMODITY по умолчанию;
        * paymentMode (String) – способ расчета ['FULL_PREPAYMENT', 'FULL_PAYMENT', 'ADVANCE', 'PREPAYMENT']. Если параметр не передан, по умолчанию устанавливается значение FULL_PREPAYMENT.
            * FULL_PREPAYMENT – 100% предоплата до момента передачи предмета расчета
            * FULL_PAYMENT – полная оплата в момент передачи предмета расчета
            * ADVANCE – аванс
            * PREPAYMENT – частичная предоплата до момента передачи предмета расчета;
        * measurementUnit (String) – единица измерения товара, работы, услуги, иного предмета расчета ['PIECE', 'GRAM', 'KILOGRAM', 'TON', 'CENTIMETER', 'DECIMETER', 'METER', 'SQUARE_CENTIMETER', 'SQUARE_DECIMETER', 'SQUARE_METER', 'MILLILITER', 'LITER', 'CUBIC_METER', 'KILOWATT_HOUR', 'GIGACALORIE', 'DAY', 'HOUR', 'MINUTE', 'SECOND', 'KILOBYTE', 'MEGABYTE', 'GIGABYTE', 'TERABYTE', 'OTHER']. Если передано значение вне списка выше, то в ОФД автоматически будет передано OTHER;
        * vatType (String) `required` – ставка НДС ['NONE', 'VAT0', 'VAT10', 'VAT110', 'VAT20', 'VAT120'];
        * agentType (String) – признак агента по предмету расчета. Заполняется только для операций через агента ['BANK_PAYING_AGENT', 'BANK_PAYING_SUBAGENT', 'PAYING_AGENT', 'PAYING_SUBAGENT', 'ATTORNEY' , 'COMMISSION_AGENT', 'ANOTHER'];
        * supplierInfo (Object) – данные о поставщике. Обязательно к заполнению, если заполнен параметр agentType;
            * phone (String) – телефон поставщика. Заполняется по формату "+79991234567", после кода +7 должно быть указано 10 цифр;
            * name (String) – наименование поставщика;
            * inn (String) `required` `maxLength: 12` – ИНН поставщика. Может содержать только цифры в количестве 10 или 12 символов;
        * marking (Object) – данные маркировки. Обязательно для маркированного товара, который имеет код маркировки;
          * quantity (Object) – дробное количество маркированного товара. Обязательно для дробного маркированного товара, который имеет код маркировки. Тогда параметр measurementUnit должен иметь значение PIECE;
            * numerator (Number) – числитель дробной части
            * denominator (Number) – знаменатель дробной части
          * code (Object) `required` – код маркировки
            * format (String) `required` – формат кода маркировки ['UNKNOWN', 'EAN8', 'EAN13', 'ITF14', 'GS1M', 'SHORT', 'FUR', 'EGAIS20', 'EGAIS30']
            * value (String) `required` – код маркировки в соответствии с форматом;
    * payments (Object[]) – данные об оплате, только для чеков с зачетом аванса или частичной предоплаты. Если payments не передан, то по умолчанию заполняется безналичным видом оплаты и ее суммой, которая равна сумме чека;
        * type (String) `required` – вид оплаты ['E_PAYMENT', 'PREPAID'].
            * E_PAYMENT – безналичная оплата
            * PREPAID – предварительная оплата (зачет аванса и/или предыдущих платежей);
        * amount (Number) `required` – сумма оплаты


#### Пример открытия платежной формы с передачей данных чека (для ФФД 1.05 и ФФД 1.2)

```js
paymentPage.openPopup({
  "publicId": "000001680200002-80200002",
  "orderId": "orderTest",
  "amount": 1200,
  "receipt": {
      "receiptNumber": "3000827351831",
      "customer": {
          "email": "customer@domain.ru"
      },
      "items": [
          {
              "name": "Шоколадный торт",
              "price": 1200,
              "quantity": 1,
              "paymentObject": "COMMODITY",
              "paymentMode": "FULL_PAYMENT",
              "amount": 1200,
              "vatType": "VAT20"
          }
      ]
  }
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
        .then(function() {
                        //console.log("Спасибо");
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
