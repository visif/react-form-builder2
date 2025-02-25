"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateFormat = exports.getCalendarType = exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _buddhistEra = _interopRequireDefault(require("dayjs/plugin/buddhistEra"));
var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));
var _componentHeader = _interopRequireDefault(require("./component-header"));
var _componentLabel = _interopRequireDefault(require("./component-label"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_dayjs.default.extend(_utc.default);
_dayjs.default.extend(_buddhistEra.default);
var keyDateFormat = 'setting_date_format';
var keyCalendarType = 'setting_calendar_type';
var dateFormatList = {
  'dd MMMM yyyy': 'DD MMMM YYYY',
  'dd-MMM-yyyy': 'DD-MMM-YYYY',
  'dd-MMM-yy': 'DD-MMM-YY',
  'yyyy-MM-dd': 'YYYY-MM-DD',
  'MM/dd/yyyy': 'MM/DD/YYYY',
  'dd/MM/yyyy': 'DD/MM/YYYY',
  'MMM dd, yyyy': 'MMM DD, YYYY'
};
var getDateFormat = function getDateFormat() {
  var key = dateFormatList[localStorage.getItem(keyDateFormat)];
  return key || 'DD MMMM YYYY';
};
exports.getDateFormat = getDateFormat;
var getCalendarType = function getCalendarType() {
  var key = localStorage.getItem(keyCalendarType);
  return key || 'EN';
};
exports.getCalendarType = getCalendarType;
var DatePicker = function DatePicker(props) {
  var inputField = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(true),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    value = _useState4[0],
    setValue = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    placeholder = _useState6[0],
    setPlaceholder = _useState6[1];
  var _useState7 = (0, _react.useState)(getDateFormat()),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    formatMask = _useState8[0],
    setFormatMask = _useState8[1];
  (0, _react.useEffect)(function () {
    var _updateFormat = updateFormat(props, null),
      newFormatMask = _updateFormat.formatMask;
    var newState = updateDateTime(props, newFormatMask);
    setValue(newState.value);
    setPlaceholder(newState.placeholder);
    setLoading(false);
  }, [props]);
  (0, _react.useEffect)(function () {
    checkForValue();
  }, []);
  var checkForValue = function checkForValue() {
    var attempt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var defaultValue = props.defaultValue;
    var maxRetries = 3;
    if (!value && defaultValue) {
      setTimeout(function () {
        if (!value) {
          var newState = updateDateTime(props, formatMask);
          setValue(newState.value);
          setLoading(false);
          if (!newState.value && attempt < maxRetries) {
            checkForValue(attempt + 1);
          }
        }
      }, 500);
    } else {
      setLoading(false);
    }
  };
  var handleChange = function handleChange(date) {
    var isoDate = date ? date.toISOString() : null;
    setValue(isoDate);
    setPlaceholder(formatMask.toLowerCase());
  };
  var updateFormat = function updateFormat(props, oldFormatMask) {
    var newFormatMask = getDateFormat();
    var updated = newFormatMask !== oldFormatMask;
    setFormatMask(newFormatMask);
    return {
      updated: updated,
      formatMask: newFormatMask
    };
  };
  var updateDateTime = function updateDateTime(props, formatMask) {
    var newValue;
    var defaultToday = props.data.defaultToday;
    if (defaultToday && !props.defaultValue) {
      newValue = (0, _dayjs.default)().toISOString();
    } else if (props.defaultValue) {
      try {
        var isMMDDYYYY = /^\d{2}\/\d{2}\/\d{4}$/.test(props.defaultValue);
        if (isMMDDYYYY) {
          newValue = (0, _dayjs.default)(props.defaultValue, 'MM/DD/YYYY').toISOString();
        } else {
          newValue = (0, _dayjs.default)(props.defaultValue).utc(true).toISOString();
        }
      } catch (error) {
        console.warn('Invalid date value:', props.defaultValue);
        newValue = null;
      }
    }
    return {
      value: newValue,
      placeholder: formatMask.toLowerCase(),
      defaultToday: defaultToday,
      formatMask: formatMask,
      defaultValue: props.defaultValue
    };
  };
  var formatDate = function formatDate(date, formatMask) {
    if (!date) return '';
    if (getCalendarType() === 'EN') {
      return (0, _dayjs.default)(date).utc(true).format(formatMask);
    } else {
      return (0, _dayjs.default)(date).utc(true).format(formatMask.replace('YYYY', 'BBBB'));
    }
  };
  var showTimeSelect = props.data.showTimeSelect;
  var userProperties = props.getActiveUserProperties && props.getActiveUserProperties();
  var savedEditor = props.editor;
  var isSameEditor = true;
  if (savedEditor && savedEditor.userId && !!userProperties) {
    isSameEditor = userProperties.userId === savedEditor.userId;
  }
  var readOnly = props.data.readOnly || props.read_only || !isSameEditor;
  var datePickerProps = {
    type: 'date',
    className: 'form-control',
    name: props.data.field_name,
    defaultValue: props.mutable ? props.defaultValue : undefined,
    ref: inputField
  };
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: baseClasses
  }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, props), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement(_componentLabel.default, props), /*#__PURE__*/_react.default.createElement("div", null, readOnly ? /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    name: datePickerProps.name,
    ref: datePickerProps.ref,
    readOnly: readOnly,
    placeholder: placeholder,
    value: value ? formatDate(value, formatMask) : '',
    disabled: !isSameEditor,
    className: "form-control"
  }) : /*#__PURE__*/_react.default.createElement(_antd.DatePicker, {
    name: datePickerProps.name,
    ref: datePickerProps.ref,
    onChange: handleChange,
    value: value ? (0, _dayjs.default)(value).utc(true) : null,
    className: "form-control bold-date-picker",
    format: function format(value) {
      return formatDate(value, formatMask);
    },
    showTime: showTimeSelect,
    disabled: !isSameEditor || loading,
    placeholder: placeholder,
    style: {
      display: 'inline-block',
      width: 'auto'
    }
  }))));
};
var _default = DatePicker;
exports.default = _default;