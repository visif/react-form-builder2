"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _componentHeader = _interopRequireDefault(require("./component-header"));
var _componentLabel = _interopRequireDefault(require("./component-label"));
var DatePicker = function DatePicker(props) {
  var onChangeHandler = props.handleChange,
    data = props.data,
    defaultValue = props.defaultValue,
    style = props.style,
    readOnly = props.read_only;
  var showTimeSelect = data.showTimeSelect,
    showTimeSelectOnly = data.showTimeSelectOnly,
    _data$dateFormat = data.dateFormat,
    dateFormat = _data$dateFormat === void 0 ? 'DD/MM/YYYY' : _data$dateFormat,
    _data$timeFormat = data.timeFormat,
    timeFormat = _data$timeFormat === void 0 ? 'HH:mm:ss' : _data$timeFormat,
    defaultToday = data.defaultToday,
    fieldName = data.field_name;

  // Determine the format based on time selection options
  var format = function () {
    if (showTimeSelectOnly) return timeFormat;
    if (showTimeSelect) return "".concat(dateFormat, " ").concat(timeFormat);
    return dateFormat;
  }();

  // Convert defaultValue to dayjs if exists
  var initialValue = function () {
    if (defaultValue) return (0, _dayjs["default"])(defaultValue, format);
    if (defaultToday) return (0, _dayjs["default"])();
    return undefined;
  }();
  var handleChange = function handleChange(date, dateString) {
    onChangeHandler({
      target: {
        value: dateString
      }
    });
  };
  var baseClasses = 'SortableItem rfb-item';
  if (data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: baseClasses,
    style: style
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.DatePicker, {
    name: fieldName,
    onChange: handleChange,
    value: initialValue,
    format: format,
    showTime: showTimeSelect,
    disabled: readOnly,
    allowClear: true,
    placeholder: format.toLowerCase(),
    className: "form-control",
    style: {
      width: '100%'
    },
    inputReadOnly: true // Prevents keyboard input but allows picker interaction
    ,
    picker: showTimeSelectOnly ? 'time' : 'date'
  }))));
};
var _default = DatePicker;
exports["default"] = _default;