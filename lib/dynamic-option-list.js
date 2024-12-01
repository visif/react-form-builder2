"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _IntlMessages = _interopRequireDefault(require("./language-provider/IntlMessages"));
var _UUID = _interopRequireDefault(require("./UUID"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var DynamicOptionList = function DynamicOptionList(props) {
  var _useState = (0, _react.useState)(props.element),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    element = _useState2[0],
    setElement = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    dirty = _useState4[0],
    setDirty = _useState4[1];
  (0, _react.useEffect)(function () {
    if (dirty) {
      props.updateElement.call(props.preview, element);
      setDirty(false);
    }
  }, [dirty, element, props]);
  var _setValue = function _setValue(text) {
    return text.replace(/[^A-Z0-9]+/gi, '_').toLowerCase();
  };
  var editOption = function editOption(optionIndex, e) {
    var newElement = _objectSpread({}, element);
    var val = newElement.options[optionIndex].value !== _setValue(newElement.options[optionIndex].text) ? newElement.options[optionIndex].value : _setValue(e.target.value);
    newElement.options[optionIndex].text = e.target.value;
    newElement.options[optionIndex].value = val;
    setElement(newElement);
    setDirty(true);
  };
  var editValue = function editValue(optionIndex, e) {
    var newElement = _objectSpread({}, element);
    var val = e.target.value === '' ? _setValue(newElement.options[optionIndex].text) : e.target.value;
    newElement.options[optionIndex].value = val;
    setElement(newElement);
    setDirty(true);
  };
  var editOptionCorrect = function editOptionCorrect(optionIndex) {
    var newElement = _objectSpread({}, element);
    if (Object.prototype.hasOwnProperty.call(newElement.options[optionIndex], 'correct')) {
      delete newElement.options[optionIndex].correct;
    } else {
      newElement.options[optionIndex].correct = true;
    }
    setElement(newElement);
    props.updateElement.call(props.preview, newElement);
  };
  var editOptionInfo = function editOptionInfo(optionIndex) {
    var newElement = _objectSpread({}, element);
    if (Object.prototype.hasOwnProperty.call(newElement.options[optionIndex], 'info')) {
      delete newElement.options[optionIndex].info;
    } else {
      newElement.options[optionIndex].info = true;
    }
    setElement(newElement);
    props.updateElement.call(props.preview, newElement);
  };
  var addOption = function addOption(index) {
    var newElement = _objectSpread({}, element);
    newElement.options.splice(index + 1, 0, {
      value: '',
      text: '',
      key: _UUID["default"].uuid()
    });
    setElement(newElement);
    props.updateElement.call(props.preview, newElement);
  };
  var removeOption = function removeOption(index) {
    var newElement = _objectSpread({}, element);
    newElement.options.splice(index, 1);
    setElement(newElement);
    props.updateElement.call(props.preview, newElement);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "dynamic-option-list"
  }, /*#__PURE__*/_react["default"].createElement("ul", null, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-sm-5"
  }, /*#__PURE__*/_react["default"].createElement("b", null, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "options"
  }))), props.canHaveOptionValue && /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-sm-2"
  }, /*#__PURE__*/_react["default"].createElement("b", null, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "value"
  }))), props.canHaveOptionValue && props.canHaveInfo && /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-sm-1"
  }, /*#__PURE__*/_react["default"].createElement("b", null, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "info"
  }))), props.canHaveOptionValue && props.canHaveOptionCorrect && /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-sm-1"
  }, /*#__PURE__*/_react["default"].createElement("b", null, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "correct"
  }))))), props.element.options.map(function (option, index) {
    var thisKey = "edit_".concat(option.key);
    var val = option.value !== _setValue(option.text) ? option.value : '';
    return /*#__PURE__*/_react["default"].createElement("li", {
      className: "clearfix",
      key: thisKey
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "col-sm-5"
    }, /*#__PURE__*/_react["default"].createElement("input", {
      tabIndex: index + 1,
      className: "form-control",
      style: {
        width: '100%'
      },
      type: "text",
      name: "text_".concat(index),
      placeholder: "Option text",
      value: option.text,
      onBlur: function onBlur() {
        return setDirty(true);
      },
      onChange: function onChange(e) {
        return editOption(index, e);
      }
    })), props.canHaveOptionValue && /*#__PURE__*/_react["default"].createElement("div", {
      className: "col-sm-2"
    }, /*#__PURE__*/_react["default"].createElement("input", {
      className: "form-control",
      type: "text",
      name: "value_".concat(index),
      value: val,
      onChange: function onChange(e) {
        return editValue(index, e);
      }
    })), props.canHaveOptionValue && props.canHaveInfo && /*#__PURE__*/_react["default"].createElement("div", {
      className: "col-sm-1"
    }, /*#__PURE__*/_react["default"].createElement("input", {
      className: "form-control",
      type: "checkbox",
      value: "1",
      onChange: function onChange() {
        return editOptionInfo(index);
      },
      checked: 'info' in option
    })), props.canHaveOptionValue && props.canHaveOptionCorrect && /*#__PURE__*/_react["default"].createElement("div", {
      className: "col-sm-1"
    }, /*#__PURE__*/_react["default"].createElement("input", {
      className: "form-control",
      type: "checkbox",
      value: "1",
      onChange: function onChange() {
        return editOptionCorrect(index);
      },
      checked: 'correct' in option
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "col-sm-3"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "dynamic-options-actions-buttons"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return addOption(index);
      },
      className: "btn btn-success"
    }, /*#__PURE__*/_react["default"].createElement("i", {
      className: "fas fa-plus-circle"
    })), index > 0 && /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return removeOption(index);
      },
      className: "btn btn-danger"
    }, /*#__PURE__*/_react["default"].createElement("i", {
      className: "fas fa-minus-circle"
    }))))));
  })));
};
var _default = DynamicOptionList;
exports["default"] = _default;