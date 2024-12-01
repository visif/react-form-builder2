"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _reactIntl = require("react-intl");
var _fbemitter = require("fbemitter");
var _fieldset = _interopRequireDefault(require("./fieldset"));
var _formElements = _interopRequireDefault(require("./form-elements"));
var _customElement = _interopRequireDefault(require("./form-elements/custom-element"));
var _formValidator = _interopRequireDefault(require("./form-validator"));
var _languageProvider = _interopRequireDefault(require("./language-provider"));
var _multiColumn = require("./multi-column");
var _FormProvider = require("./providers/FormProvider");
var _registry = _interopRequireDefault(require("./stores/registry"));
var _excluded = ["locale", "answerData"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// Constants
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var PHONE_REGEX = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;

// Utility functions
var convertAnswers = function convertAnswers(answers) {
  if (!Array.isArray(answers)) return answers || {};
  return answers.reduce(function (result, x) {
    return _objectSpread(_objectSpread({}, result), {}, (0, _defineProperty2["default"])({}, x.name, x.name.indexOf('tags_') > -1 ? x.value.map(function (y) {
      return y.value;
    }) : x.value));
  }, {});
};
var validateCorrectness = function validateCorrectness(item, value) {
  if (item.element === 'Rating') {
    return value.toString() === item.correct;
  }
  return value.toLowerCase() === item.correct.trim().toLowerCase();
};

// Custom hooks
var useFormValidation = function useFormValidation(props, emitter) {
  var validateEmail = function validateEmail(email) {
    return EMAIL_REGEX.test(email);
  };
  var validatePhone = function validatePhone(phone) {
    return PHONE_REGEX.test(phone);
  };
  return function (dataItems, values) {
    var errors = [];
    var intl = props.intl,
      validateForCorrectness = props.validateForCorrectness;
    dataItems.forEach(function (item) {
      // Required field validation
      if (item.required && !values[item.field_name]) {
        errors.push("".concat(item.label, " ").concat(intl.formatMessage({
          id: 'message.is-required'
        }), "!"));
      }

      // Email validation
      if (item.element === 'EmailInput' && values[item.field_name] && !validateEmail(values[item.field_name])) {
        errors.push("".concat(item.label, " ").concat(intl === null || intl === void 0 ? void 0 : intl.formatMessage({
          id: 'message.invalid-email'
        })));
      }

      // Phone validation
      if (item.element === 'PhoneNumber' && values[item.field_name] && !validatePhone(values[item.field_name])) {
        errors.push("".concat(item.label, " ").concat(intl === null || intl === void 0 ? void 0 : intl.formatMessage({
          id: 'message.invalid-phone-number'
        })));
      }

      // Correctness validation
      if (validateForCorrectness && item.canHaveAnswer) {
        var isCorrect = validateCorrectness(item, values[item.field_name]);
        if (!isCorrect) {
          errors.push("".concat(item.label, " ").concat(intl === null || intl === void 0 ? void 0 : intl.formatMessage({
            id: 'message.was-answered-incorrectly'
          }), "!"));
        }
      }
    });
    emitter.emit('formValidation', errors);
    return errors;
  };
};
var FormContent = function FormContent(props) {
  var _useFormStore = (0, _FormProvider.useFormStore)(),
    values = _useFormStore.values,
    setFieldValue = _useFormStore.setFieldValue,
    setMultipleValues = _useFormStore.setMultipleValues,
    toggleCheckbox = _useFormStore.toggleCheckbox;
  var emitter = (0, _react.useMemo)(function () {
    return new _fbemitter.EventEmitter();
  }, []);
  var validateForm = useFormValidation(props, emitter);
  (0, _react.useEffect)(function () {
    if (props.answer_data) {
      var convertedData = convertAnswers(props.answer_data);
      setMultipleValues(convertedData);
    }
  }, [props.answer_data, setMultipleValues]);
  var getItemValue = function getItemValue(item) {
    return {
      element: item.element,
      value: values[item.field_name] || ''
    };
  };
  var collectFormData = function collectFormData(data) {
    var formData = [];
    data.forEach(function (item) {
      if (item.field_name) {
        var itemData = {
          id: item.id,
          name: item.field_name,
          custom_name: item.custom_name || item.field_name,
          value: getItemValue(item).value
        };
        formData.push(itemData);
      }
    });
    return formData;
  };
  var handleSubmit = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(e) {
      var dataItems, errors, formData;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              dataItems = props.display_short ? props.data.filter(function (i) {
                return i.alternateForm === true;
              }) : props.data;
              if (props.skip_validations) {
                _context.next = 6;
                break;
              }
              errors = validateForm(dataItems, values);
              if (!(errors.length > 0)) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return");
            case 6:
              if (props.onSubmit) {
                formData = collectFormData(props.data);
                props.onSubmit(formData);
              }
            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function handleSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var _handleChange = function handleChange(fieldName, value, element) {
    if (element === 'Checkboxes') {
      toggleCheckbox(fieldName, value);
    } else {
      setFieldValue(fieldName, value);
    }
    if (props.onChange) {
      var formData = collectFormData(props.data);
      props.onChange(formData);
    }
  };
  var renderCustomElement = function renderCustomElement(item) {
    if (!item.component || typeof item.component !== 'function') {
      item.component = _registry["default"].get(item.key);
      if (!item.component) {
        console.error("".concat(item.element, " was not registered"));
        return null;
      }
    }
    return /*#__PURE__*/_react["default"].createElement(_customElement["default"], item);
  };
  var renderFormElement = function renderFormElement(item) {
    var _elementMap$item$elem;
    if (!item) return null;
    var commonProps = {
      mutable: true,
      key: "form_".concat(item.id),
      data: item,
      read_only: props.read_only || item.readOnly,
      defaultValue: values[item.field_name],
      handleChange: function handleChange(event) {
        _handleChange(item.field_name, event.target.value, item.element);
      },
      getDataSource: props.getDataSource,
      getActiveUserProperties: props.getActiveUserProperties
    };
    var renderContainer = function renderContainer(activeItem, Container) {
      var controls = activeItem.childItems.map(function (childId) {
        var childItem = props.data.find(function (d) {
          return d.id === childId;
        });
        return childItem ? renderFormElement(childItem) : /*#__PURE__*/_react["default"].createElement("div", null, "\xA0");
      });
      return /*#__PURE__*/_react["default"].createElement(Container, {
        mutable: true,
        key: "form_".concat(activeItem.id),
        data: activeItem,
        controls: controls
      });
    };
    var renderDefaultElement = function renderDefaultElement(activeItem, activeCommonProps) {
      var Input = _formElements["default"][activeItem.element];
      return Input ? /*#__PURE__*/_react["default"].createElement(Input, activeCommonProps) : null;
    };
    var elementMap = {
      CustomElement: function CustomElement() {
        return renderCustomElement(item);
      },
      MultiColumnRow: function MultiColumnRow() {
        return renderContainer(item, _multiColumn.MultiColumnRow);
      },
      ThreeColumnRow: function ThreeColumnRow() {
        return renderContainer(item, _multiColumn.ThreeColumnRow);
      },
      TwoColumnRow: function TwoColumnRow() {
        return renderContainer(item, _multiColumn.TwoColumnRow);
      },
      FieldSet: function FieldSet() {
        return renderContainer(item, _fieldset["default"]);
      }
      // Download: () => (
      // <Download {...commonProps} download_path={props.download_path} />
      // ),
    };
    return ((_elementMap$item$elem = elementMap[item.element]) === null || _elementMap$item$elem === void 0 ? void 0 : _elementMap$item$elem.call(elementMap)) || renderDefaultElement(item, commonProps);
  };
  var formElements = (0, _react.useMemo)(function () {
    var dataItems = (props.display_short ? props.data.filter(function (i) {
      return i.alternateForm === true;
    }) : props.data) || [];
    return dataItems.filter(function (x) {
      return !x.parentId;
    }).map(renderFormElement);
  }, [props.data, props.display_short, values]);
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_formValidator["default"], {
    emitter: emitter
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-form-builder-form"
  }, /*#__PURE__*/_react["default"].createElement("form", {
    encType: "multipart/form-data",
    action: props.form_action,
    onSubmit: handleSubmit,
    method: props.form_method
  }, props.authenticity_token && /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/_react["default"].createElement("input", {
    name: "utf8",
    type: "hidden",
    value: "\u2713"
  }), /*#__PURE__*/_react["default"].createElement("input", {
    name: "authenticity_token",
    type: "hidden",
    value: props.authenticity_token
  }), /*#__PURE__*/_react["default"].createElement("input", {
    name: "task_id",
    type: "hidden",
    value: props.task_id
  })), formElements, !props.hide_actions && /*#__PURE__*/_react["default"].createElement("div", {
    className: "btn-toolbar"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "submit",
    className: "btn btn-big",
    value: props.action_name || props.actionName || 'Submit'
  }), props.back_action && /*#__PURE__*/_react["default"].createElement("a", {
    href: props.back_action,
    className: "btn btn-default btn-cancel btn-big"
  }, props.back_name || props.backName || 'Cancel')))));
};
var ReactFormGenerator = function ReactFormGenerator(_ref2) {
  var _ref2$locale = _ref2.locale,
    locale = _ref2$locale === void 0 ? 'en' : _ref2$locale,
    answerData = _ref2.answerData,
    props = (0, _objectWithoutProperties2["default"])(_ref2, _excluded);
  var currentAppLocale = _languageProvider["default"][locale];
  return /*#__PURE__*/_react["default"].createElement(_reactIntl.IntlProvider, {
    locale: currentAppLocale.locale,
    messages: currentAppLocale.messages
  }, /*#__PURE__*/_react["default"].createElement(_FormProvider.FormProvider, {
    initialValues: convertAnswers(answerData) || {}
  }, /*#__PURE__*/_react["default"].createElement(FormContent, props)));
};
var _default = ReactFormGenerator;
exports["default"] = _default;