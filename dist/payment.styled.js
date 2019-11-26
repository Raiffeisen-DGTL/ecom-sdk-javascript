(function () {
  'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var BaseComponent =
  /*#__PURE__*/
  function () {
    function BaseComponent() {}

    var _proto = BaseComponent.prototype;

    _proto.execute = function execute(props) {
      if (props === void 0) {
        props = {};
      }

      this.props = props;
      var elem = this.render();
      this.mount = elem;
      return this.mount;
    };

    _proto.unmount = function unmount() {
      if (!this.isMount()) {
        return;
      }

      this.mount.parentNode.removeChild(this.mount);
      this.mount = null;
    };

    _proto.isMount = function isMount() {
      return this.mount instanceof HTMLElement;
    };

    return BaseComponent;
  }();

  var getClassNames = function getClassNames(element) {
    var classList = element.getAttribute('class') || '';
    return classList.split(' ').filter(Boolean);
  };

  var addClass = function addClass(element, targetClass) {
    var classNames = getClassNames(element);

    if (classNames.indexOf(targetClass) !== -1) {
      return;
    }

    classNames.push(targetClass);
    element.setAttribute('class', classNames.join(' '));
  };
  var removeClass = function removeClass(element, targetClass) {
    var classNames = getClassNames(element);

    if (classNames.indexOf(targetClass) === -1) {
      return;
    }

    classNames.splice(classNames.indexOf(targetClass), 1);
    element.setAttribute('class', classNames.join(' '));
  };

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".style_root__k59xi {\n    position: fixed;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    background-color: rgba(0, 0, 0, .7);\n    z-index: 100;\n}\n";
  var style = {"root":"style_root__k59xi"};
  styleInject(css);

  var Paranja =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(Paranja, _Component);

    function Paranja() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = Paranja.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          children = _this$props.children,
          onClick = _this$props.onClick;
      var elem = document.createElement('div');
      addClass(elem, style.root);
      elem.addEventListener('click', onClick);
      elem.appendChild(children);
      return elem;
    };

    return Paranja;
  }(BaseComponent);

  var css$1 = ".style_cover__352rz {\n    position: absolute;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n}\n\n.style_wrap__r6QoJ {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n        -ms-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    width: 480px;\n    max-width: 100%;\n    height: 637px;\n    max-height: 100%;\n}\n\n.style_cross__Dq62T {\n    right: 17px;\n    top: 13px;\n    color: rgb(102, 102, 102);\n    position: absolute;\n    font-size: 1.5rem;\n    cursor: pointer;\n    font-family: \"Arial\", sans-serif;\n    z-index: 101;\n}\n\n.style_inner__1WMoI {\n    width: 100%;\n    height: 100%;\n    position: relative;\n    background-color: white;\n}\n\n.style_iframe__2XtWY {\n    width: 100%;\n    height: 100%;\n    border: none;\n}\n\n@media (max-width: 450px) {\n    .style_wrap__r6QoJ {\n        height: 100%;\n    }\n\n    .style_inner__1WMoI {\n        -webkit-overflow-scrolling: touch;\n        overflow: auto;\n    }\n}\n";
  var style$1 = {"cover":"style_cover__352rz","wrap":"style_wrap__r6QoJ","cross":"style_cross__Dq62T","inner":"style_inner__1WMoI","iframe":"style_iframe__2XtWY"};
  styleInject(css$1);

  var PaymentPage =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(PaymentPage, _Component);

    function PaymentPage() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _Component.call.apply(_Component, [this].concat(args)) || this;

      _defineProperty(_assertThisInitialized(_this), "name", 'payment-page');

      _defineProperty(_assertThisInitialized(_this), "handleClickCross", function (e) {
        e.stopPropagation();
        var onForceClose = _this.props.onForceClose;
        onForceClose();
      });

      return _this;
    }

    var _proto = PaymentPage.prototype;

    _proto.render = function render() {
      var onClose = this.props.onClose;
      var paranja = new Paranja();
      var cover = document.createElement('div');
      addClass(cover, style$1.cover);
      var cross = document.createElement('div');
      addClass(cross, style$1.cross);
      cross.addEventListener('click', this.handleClickCross);
      cross.innerText = "\u2715";
      var wrap = document.createElement('div');
      addClass(wrap, style$1.wrap);
      var inner = document.createElement('div');
      addClass(inner, style$1.inner);
      var iframe = document.createElement('iframe');
      iframe.setAttribute('name', this.name);
      addClass(iframe, style$1.iframe);
      cover.appendChild(wrap);
      wrap.appendChild(cross);
      wrap.appendChild(inner);
      inner.appendChild(iframe);
      return paranja.execute({
        children: cover,
        onClick: onClose
      });
    };

    _createClass(PaymentPage, [{
      key: "url",
      get: function get() {
        var url = this.props.url;
        var pos = url.indexOf('?');

        if (pos === -1) {
          return url;
        }

        return url.slice(0, pos);
      }
    }]);

    return PaymentPage;
  }(BaseComponent);

  var css$2 = ".style_button__1YfrP {\n    background-color: white;\n    border-color: rgba(0, 0, 0, 0.2);\n    padding: 13px 23px;\n    text-align: center;\n    border-radius: 1px;\n    outline: 0px;\n    border-width: 1px;\n    cursor: pointer;\n    font-size: 14px;\n    height: 48px;\n    display: inline-block;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    white-space: nowrap;\n    width: 200px;\n    font-family: Helvetica, Arial, sans-serif;\n\n    -webkit-transition: background-color 0.3s ease 0s, color 0.3s ease 0s, border-color 0.3s ease 0s;\n\n    transition: background-color 0.3s ease 0s, color 0.3s ease 0s, border-color 0.3s ease 0s;\n}\n\n.style_button__1YfrP.style_active__21G-H {\n    background-color: rgb(255, 237, 0);\n    border-color: rgb(255, 237, 0);\n}\n\n.style_button__1YfrP.style_active__21G-H:hover {\n    border-color: rgb(0, 0, 0);\n    background-color: rgb(0, 0, 0);\n    color: white;\n}\n\n.style_button__1YfrP:hover {\n    border-color: rgb(0, 0, 0);\n}\n";
  var style$2 = {"button":"style_button__1YfrP","active":"style_active__21G-H"};
  styleInject(css$2);

  var Button =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(Button, _Component);

    function Button() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = Button.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          isActive = _this$props.isActive,
          onClick = _this$props.onClick,
          children = _this$props.children;
      var elem = document.createElement('button');
      elem.addEventListener('click', onClick);
      elem.innerText = children;
      addClass(elem, style$2.button);

      if (isActive) {
        addClass(elem, style$2.active);
      }

      return elem;
    };

    return Button;
  }(BaseComponent);

  var css$3 = ".style_confirm-panel__1s25- {\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n        -ms-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    position: absolute;\n    width: 100%;\n}\n\n.style_button-wrap__1Rcd5 {\n    text-align: center;\n}\n\n.style_button-wrap__1Rcd5 > button + button {\n    margin-left: 10px;\n}\n\n.style_label__wJvJQ {\n    color: white;\n    font-size: 18px;\n    margin-bottom: 40px;\n    text-align: center;\n    font-family: Helvetica, Arial, sans-serif;\n}\n\n@media (max-width: 450px) {\n    .style_button-wrap__1Rcd5 > button + button {\n        margin-left: 0;\n        margin-top: 10px;\n    }\n\n    .style_button-wrap__1Rcd5 {\n        margin: 0 40px;\n    }\n}\n";
  var style$3 = {"confirm-panel":"style_confirm-panel__1s25-","button-wrap":"style_button-wrap__1Rcd5","label":"style_label__wJvJQ"};
  styleInject(css$3);

  var Confirm =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(Confirm, _Component);

    function Confirm() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = Confirm.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          onClose = _this$props.onClose,
          onCancel = _this$props.onCancel;
      var paranja = new Paranja();
      var confirmPanel = document.createElement('div');
      addClass(confirmPanel, style$3['confirm-panel']);
      var label = document.createElement('div');
      label.innerText = 'Вы уверены, что хотите закрыть окно?';
      addClass(label, style$3.label);
      var buttonWrap = document.createElement('div');
      addClass(buttonWrap, style$3['button-wrap']);
      var closeButton = new Button();
      var cancelButton = new Button();
      confirmPanel.appendChild(label);
      confirmPanel.appendChild(buttonWrap);
      buttonWrap.appendChild(closeButton.execute({
        onClick: onClose,
        isActive: true,
        children: 'Закрыть'
      }));
      buttonWrap.appendChild(cancelButton.execute({
        onClick: onCancel,
        children: 'Отмена'
      }));
      return paranja.execute({
        children: confirmPanel
      });
    };

    return Confirm;
  }(BaseComponent);

  var classProvider = (function (TargetClass) {
    var instance = null;
    return (
      /*#__PURE__*/
      function () {
        function _class() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          instance = _construct(TargetClass, args);
        }

        var _proto = _class.prototype;

        _proto.openPopup = function openPopup() {
          var _instance;

          return (_instance = instance).openPopup.apply(_instance, arguments);
        };

        _proto.openWindow = function openWindow() {
          var _instance2;

          return (_instance2 = instance).openWindow.apply(_instance2, arguments);
        };

        _proto.replace = function replace() {
          var _instance3;

          return (_instance3 = instance).replace.apply(_instance3, arguments);
        };

        return _class;
      }()
    );
  });

  var VERSION = '1.1.6';

  var SUCCESS_RESULT = 'success';
  var FAILED_RESULT = 'failed';

  var POST_MESSAGE_EVENT_TYPE = 'message';
  var addMessageListener = function addMessageListener(elem, mapping) {
    var listener = function listener(e) {
      if (!e || !e.data) {
        return;
      }

      var data = JSON.parse(e.data);

      if (!data.event || typeof mapping[data.event] !== 'function') {
        return;
      }

      mapping[data.event](data.content);
    };

    elem.addEventListener(POST_MESSAGE_EVENT_TYPE, listener, false);
    return listener;
  };
  var removeMessageListener = function removeMessageListener(elem, listener) {
    elem.removeEventListener(POST_MESSAGE_EVENT_TYPE, listener);
  };

  var prepareUrl = (function (url) {
    if (url[url.length - 1] !== '/') {
      return url;
    }

    return url.slice(0, url.length - 1);
  });

  var changeLocation = (function (location) {
    window.location.replace(location);
  });

  /**
   * @this {Promise}
   */
  function finallyConstructor(callback) {
    var constructor = this.constructor;
    return this.then(
      function(value) {
        // @ts-ignore
        return constructor.resolve(callback()).then(function() {
          return value;
        });
      },
      function(reason) {
        // @ts-ignore
        return constructor.resolve(callback()).then(function() {
          // @ts-ignore
          return constructor.reject(reason);
        });
      }
    );
  }

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function isArray(x) {
    return Boolean(x && typeof x.length !== 'undefined');
  }

  function noop() {}

  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function() {
      fn.apply(thisArg, arguments);
    };
  }

  /**
   * @constructor
   * @param {Function} fn
   */
  function Promise$1(fn) {
    if (!(this instanceof Promise$1))
      throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    /** @type {!number} */
    this._state = 0;
    /** @type {!boolean} */
    this._handled = false;
    /** @type {Promise|undefined} */
    this._value = undefined;
    /** @type {!Array<!Function>} */
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise$1._immediateFn(function() {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self)
        throw new TypeError('A promise cannot be resolved with itself.');
      if (
        newValue &&
        (typeof newValue === 'object' || typeof newValue === 'function')
      ) {
        var then = newValue.then;
        if (newValue instanceof Promise$1) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise$1._immediateFn(function() {
        if (!self._handled) {
          Promise$1._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  /**
   * @constructor
   */
  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(
        function(value) {
          if (done) return;
          done = true;
          resolve(self, value);
        },
        function(reason) {
          if (done) return;
          done = true;
          reject(self, reason);
        }
      );
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise$1.prototype['catch'] = function(onRejected) {
    return this.then(null, onRejected);
  };

  Promise$1.prototype.then = function(onFulfilled, onRejected) {
    // @ts-ignore
    var prom = new this.constructor(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise$1.prototype['finally'] = finallyConstructor;

  Promise$1.all = function(arr) {
    return new Promise$1(function(resolve, reject) {
      if (!isArray(arr)) {
        return reject(new TypeError('Promise.all accepts an array'));
      }

      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(
                val,
                function(val) {
                  res(i, val);
                },
                reject
              );
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise$1.resolve = function(value) {
    if (value && typeof value === 'object' && value.constructor === Promise$1) {
      return value;
    }

    return new Promise$1(function(resolve) {
      resolve(value);
    });
  };

  Promise$1.reject = function(value) {
    return new Promise$1(function(resolve, reject) {
      reject(value);
    });
  };

  Promise$1.race = function(arr) {
    return new Promise$1(function(resolve, reject) {
      if (!isArray(arr)) {
        return reject(new TypeError('Promise.race accepts an array'));
      }

      for (var i = 0, len = arr.length; i < len; i++) {
        Promise$1.resolve(arr[i]).then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise$1._immediateFn =
    // @ts-ignore
    (typeof setImmediate === 'function' &&
      function(fn) {
        // @ts-ignore
        setImmediate(fn);
      }) ||
    function(fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise$1._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /** @suppress {undefinedVars} */
  var globalNS = (function() {
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    throw new Error('unable to locate global object');
  })();

  if (!('Promise' in globalNS)) {
    globalNS['Promise'] = Promise$1;
  } else if (!globalNS.Promise.prototype['finally']) {
    globalNS.Promise.prototype['finally'] = finallyConstructor;
  }

  var css$4 = ".style_body-scroll-disable__4o99q {\n    overflow: hidden;\n    position: relative;\n}";
  var style$4 = {"body-scroll-disable":"style_body-scroll-disable__4o99q"};
  styleInject(css$4);

  var disableScroll = function disableScroll() {
    addClass(document.body, style$4['body-scroll-disable']);
    var html = document.getElementsByTagName('html')[0];
    addClass(html, style$4['body-scroll-disable']);
  };
  var enableScroll = function enableScroll() {
    removeClass(document.body, style$4['body-scroll-disable']);
    var html = document.getElementsByTagName('html')[0];
    removeClass(html, style$4['body-scroll-disable']);
  };

  var prepareValue = function prepareValue(value) {
    if (value instanceof Object) {
      try {
        return JSON.stringify(value);
      } catch (e) {
        return '';
      }
    }

    return value;
  };

  var PaymentPageSdk = function PaymentPageSdk(_publicId, options) {
    var _this = this;

    if (options === void 0) {
      options = {};
    }

    _defineProperty(this, "closePopup", function (resolve) {
      return function () {
        if (_this.confirm && _this.confirm.isMount() || !_this.paymentPage || !_this.paymentPage.isMount()) {
          return;
        }

        _this.confirm = new Confirm();

        _this.mount.appendChild(_this.confirm.execute({
          onClose: _this.forceClosePopup(resolve),
          onCancel: function onCancel() {
            return _this.confirm.unmount();
          }
        }));
      };
    });

    _defineProperty(this, "forceClosePopup", function (reject) {
      return function () {
        if (_this.paymentPage) {
          _this.paymentPage.unmount();
        }

        if (_this.confirm) {
          _this.confirm.unmount();
        }

        removeMessageListener(window, _this.messageBinding);
        _this.messageBinding = null;
        enableScroll();
        typeof reject === 'function' && reject();
      };
    });

    _defineProperty(this, "submitForm", function (target, paymentData) {
      if (target === void 0) {
        target = '_self';
      }

      var form = document.createElement('form');
      form.setAttribute('action', _this.url);
      form.setAttribute('method', 'POST');
      form.setAttribute('target', target);
      Object.keys(paymentData).forEach(function (paymentDataKey) {
        var input = document.createElement('input');
        var value = prepareValue(paymentData[paymentDataKey]);
        input.setAttribute('value', value);
        input.setAttribute('name', paymentDataKey);
        form.appendChild(input);
      });

      _this.mount.appendChild(form);

      form.submit();

      _this.mount.removeChild(form);
    });

    _defineProperty(this, "openPopup", function (amount, props) {
      if (props === void 0) {
        props = {};
      }

      return new Promise(function (resolve, reject) {
        if (_this.paymentPage && _this.paymentPage.isMount() && _this.messageBinding) {
          return;
        }

        var publicId = _this.publicId,
            style = _this.style,
            version = _this.version;

        var paymentData = _extends({}, props, {
          publicId: publicId,
          style: style,
          version: version,
          amount: amount,
          successUrl: '#',
          failUrl: '#'
        });

        _this.paymentPage = new PaymentPage();

        _this.mount.appendChild(_this.paymentPage.execute({
          onClose: _this.closePopup(function () {
            return reject({
              isCrossClose: true
            });
          }),
          onForceClose: _this.forceClosePopup(function () {
            return reject({
              isCrossClose: true
            });
          }),
          url: _this.url
        }));

        var _props = props,
            successUrl = _props.successUrl,
            failUrl = _props.failUrl;
        _this.messageBinding = addMessageListener(window, {
          finish: _this.handleFinishPayment(resolve, reject, successUrl, failUrl)
        });

        _this.submitForm(_this.paymentPage.name, paymentData);

        disableScroll();
      });
    });

    _defineProperty(this, "openWindow", function (props) {
      var publicId = _this.publicId,
          version = _this.version;

      var paymentData = _extends({
        publicId: publicId,
        version: version
      }, props);

      _this.submitForm('_blank', paymentData);
    });

    _defineProperty(this, "replace", function (props) {
      var publicId = _this.publicId,
          version = _this.version;

      var paymentData = _extends({
        publicId: publicId,
        version: version
      }, props);

      _this.submitForm('_self', paymentData);
    });

    _defineProperty(this, "handleFinishPayment", function (res, rej, successUrl, failUrl) {
      return function (content) {
        if (content.result === SUCCESS_RESULT) {
          res();

          if (successUrl) {
            changeLocation(successUrl);
            return;
          }
        }

        if (content.result === FAILED_RESULT) {
          rej({
            isCrossClose: false
          });

          if (failUrl) {
            changeLocation(failUrl);
            return;
          }
        }

        _this.forceClosePopup()();
      };
    });

    if (options.targetElem instanceof HTMLElement) {
      this.mount = options.targetElem;
    } else {
      this.mount = document.body;
    }

    this.publicId = _publicId;
    this.style = options.style;
    this.version = VERSION;
    this.url = prepareUrl(options.url);
  };

  var PaymentPageSdk$1 = classProvider(PaymentPageSdk);

  window.PaymentPageSdk = PaymentPageSdk$1;

}());
