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
var _UUID = _interopRequireDefault(require("./UUID"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var FixedRowList = function FixedRowList(props) {
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
    return "".concat(text).replace(/[^A-Z0-9]+/gi, '_').toLowerCase();
  };
  var editRow = function editRow(index, key, e) {
    var updatedElement = _objectSpread({}, element);
    var val = updatedElement.rowLabels[index].value !== _setValue(updatedElement.rowLabels[index][key]) ? updatedElement.rowLabels[index].value : _setValue(e.target.value);
    updatedElement.rowLabels[index][key] = e.target.value;
    updatedElement.rowLabels[index].value = val;
    setElement(updatedElement);
    setDirty(true);
  };
  var addRow = function addRow(index) {
    var updatedElement = _objectSpread({}, element);
    updatedElement.rowLabels.splice(index + 1, 0, {
      value: '',
      text: '',
      key: _UUID["default"].uuid()
    });
    setElement(updatedElement);
    setDirty(true);
  };
  var removeRow = function removeRow(index) {
    var updatedElement = _objectSpread({}, element);
    updatedElement.rowLabels.splice(index, 1);
    setElement(updatedElement);
    setDirty(true);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "dynamic-option-list"
  }, /*#__PURE__*/_react["default"].createElement("ul", {
    key: "row-labels"
  }, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-sm-12"
  }, /*#__PURE__*/_react["default"].createElement("b", null, "Rows"))), /*#__PURE__*/_react["default"].createElement("li", {
    className: "clearfix",
    key: "li_label_x"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-sm-9"
  }, "Row Label"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-sm-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "dynamic-options-actions-buttons"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return addRow(-1);
    },
    className: "btn btn-success"
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "fas fa-plus-circle"
  })))))), props.element.rowLabels.map(function (option, index) {
    var this_key = "edit_".concat(option.key);
    var val = option.value !== _setValue(option.text) ? option.value : '';
    return /*#__PURE__*/_react["default"].createElement("li", {
      className: "clearfix",
      key: "li_label_".concat(this_key)
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "row"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "col-sm-9"
    }, /*#__PURE__*/_react["default"].createElement("input", {
      tabIndex: index + 1,
      key: "input_label_".concat(this_key),
      className: "form-control",
      style: {
        width: '100%'
      },
      type: "text",
      name: "text_".concat(index),
      placeholder: "Row Label",
      value: option.text,
      onBlur: function onBlur() {
        return setDirty(true);
      },
      onChange: function onChange(e) {
        return editRow(index, 'text', e);
      }
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "col-sm-3"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "dynamic-options-actions-buttons"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return addRow(index);
      },
      className: "btn btn-success"
    }, /*#__PURE__*/_react["default"].createElement("i", {
      className: "fas fa-plus-circle"
    })), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return removeRow(index);
      },
      className: "btn btn-danger"
    }, /*#__PURE__*/_react["default"].createElement("i", {
      className: "fas fa-minus-circle"
    }))))));
  })));
};
var _default = FixedRowList;
exports["default"] = _default;