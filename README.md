# ```Raiffeisen Payment Page Sdk```

JS библиотека для работы с [формой оплаты Райффайзенбанка](https://e-commerce.raiffeisen.ru/pay/demo.html).

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

Работа происходит через обращения к классу `PaymentPageSdk`

### `Простые сценарии`

Обязательные парамеры:

* publicId (String) - идентификатор продавца;
* amount (Amount) - стоимость товара;

#### Форма оплаты во всплывающем окне

Для отслеживания успешности оплаты метод openPopup возвращает Promise, 
позволяющий подписаться на успешную оплату или закрытие окна.

```
const paymentPage = new PaymentPageSdk('000001680211111-80211111'); //publicId

paymentPage.openPopup({amount: 10.10})
        .then(function(resolve) {
                        //console.log(resolve, "Спасибо");
                    })
        .catch(function() {
                        //console.log("Неудача");
                    });
);
```

#### Форма оплаты в новой вкладке
 
```
const paymentPage = new PaymentPageSdk('000001680211111-80211111'); //publicId

paymentPage.openWindow({amount: 10.10});
```

#### Форма оплаты в той же вкладке

```
const paymentPage = new PaymentPageSdk('000001680211111-80211111'); //publicId

paymentPage.replace({amount: 10.10});
```

### `Расширенные сценарии`

Обязательные параметры:

* publicId (String) - идентификатор продавца;
* amount (Amount) - стоимость товара;

Необязательные параметры:

* orderId (String) - номер заказа (в строке разрешены символы английского алфавита, а также два специальных символа: "-", "_" ([0-9a-zA-Zа-яА-Я\-\_]+));
* extra (Object) - любые данные, которые можно получить при вызове колбэка;
* successUrl (String) - ссылка, на которую перейдёт покупатель, в случае успешной оплаты. 
Поддерживается только для openWindow или replace; 
* failUrl (String) - ссылка, на которую перейдёт покупатель, в случае неудачной оплаты.
Поддерживается только для openWindow или replace;
* comment (String) - описание товара, который приобретает покупатель.

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

* titlePlace: 'right' => узкий логотип: 60x40;
* titlePlace: 'bottom' => широкий логотип: 340x40.

#### Пример открытия во всплывающем окне с необязательными параметрами

```
const paymentPage = new PaymentPageSdk('000001680211111-80211111'); //publicId
 
paymentPage.openPopup({
                        amount: 10.10,
                        orderId: '91700',
                        extra: {
                            url: 'https://e-commerce.raiffeisen.ru/pay'
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
                                titlePlace: 'right'
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
const paymentPage = new PaymentPageSdk('000001680211111-80211111'); //publicId

paymentPage.openWindow({
                        amount: 10.10,
                        orderId: '91700',
                        extra: {
                            url: 'https://e-commerce.raiffeisen.ru/pay'
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
                                titlePlace: 'right'
                            }                    
                        },
                        successUrl: 'https://www.raiffeisen.ru',
                        failUrl: 'https://e-commerce.raiffeisen.ru/pay/demo.html',
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
