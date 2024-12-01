"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _componentHeader = _interopRequireDefault(require("./component-header"));
var _componentLabel = _interopRequireDefault(require("./component-label"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var DataSource = function DataSource(props) {
  var _ref = props || {},
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? {} : _ref$defaultValue,
    getDataSource = _ref.getDataSource,
    handleChange = _ref.handleChange;
  var _useState = (0, _react.useState)([]),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    sourceList = _useState2[0],
    setSourceList = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    matchedList = _useState4[0],
    setMatchedList = _useState4[1];
  var _useState5 = (0, _react.useState)(defaultValue.value),
    _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
    searchText = _useState6[0],
    setSearchText = _useState6[1];
  var _useState7 = (0, _react.useState)(defaultValue.selectedItem),
    _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
    selectedItem = _useState8[0],
    setSelectedItem = _useState8[1];
  var _useState9 = (0, _react.useState)(defaultValue.selectedItem),
    _useState10 = (0, _slicedToArray2["default"])(_useState9, 2),
    defaultSelectedItem = _useState10[0],
    setDefaultSelectedItem = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = (0, _slicedToArray2["default"])(_useState11, 2),
    isShowingList = _useState12[0],
    setIsShowingList = _useState12[1];
  var _useState13 = (0, _react.useState)(props.data.sourceType),
    _useState14 = (0, _slicedToArray2["default"])(_useState13, 1),
    sourceType = _useState14[0];
  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof getDataSource === 'function')) {
                  _context.next = 6;
                  break;
                }
                _context.next = 3;
                return getDataSource(props.data);
              case 3:
                data = _context.sent;
                setSourceList(data);
                setMatchedList(data);
              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function fetchData() {
        return _ref2.apply(this, arguments);
      };
    }();
    fetchData();
  }, [getDataSource, props.data]);
  (0, _react.useEffect)(function () {
    if (props.defaultValue && JSON.stringify(props.defaultValue.selectedItem) !== JSON.stringify(defaultSelectedItem)) {
      var _defaultValue = props.defaultValue || {};
      setSearchText(_defaultValue.value);
      setSelectedItem(_defaultValue.selectedItem);
      setDefaultSelectedItem(_defaultValue.selectedItem);
    }
  }, [props.defaultValue, defaultSelectedItem]);
  var handleInputFocus = function handleInputFocus() {
    setIsShowingList(true);
  };
  var handleInputBlur = function handleInputBlur() {
    setTimeout(function () {
      setIsShowingList(false);
    }, 200);
  };
  var debounceOnChange = function debounceOnChange(value) {
    var matchData = sourceList.filter(function (item) {
      return "".concat(item.name).toLocaleLowerCase().includes("".concat(value).toLocaleLowerCase());
    });
    setSearchText(value);
    setMatchedList(matchData);
  };
  var handleOnChange = function handleOnChange(event) {
    if (event.key === 'Enter') {
      return;
    }
    debounceOnChange(event.target.value);
  };
  var userProperties = props.getActiveUserProperties && props.getActiveUserProperties();
  var savedEditor = props.editor;
  var isSameEditor = true;
  if (savedEditor && savedEditor.userId && !!userProperties) {
    isSameEditor = userProperties.userId === savedEditor.userId;
  }
  var inputProps = {
    type: 'text',
    className: 'form-control',
    name: props.data.field_name,
    value: searchText,
    disabled: !isSameEditor,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    onChange: handleOnChange
  };
  if (props.mutable) {
    inputProps.defaultValue = props.defaultValue;
  }
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], (0, _extends2["default"])({}, props, {
    style: {
      display: 'block'
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: 'relative',
      display: 'inline-block',
      width: '100%'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", inputProps)), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: 'absolute',
      zIndex: 99,
      top: '100%',
      left: 0,
      right: 0,
      height: 250,
      overflowY: 'auto',
      display: isShowingList ? 'block' : 'none'
    }
  }, (matchedList || []).map(function (item) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: item.id,
      style: {
        position: 'relative',
        display: 'block',
        padding: '0.75rem 1.25rem',
        marginBottom: -1,
        backgroundColor: '#fff',
        border: '1px solid rgba(0, 0, 0, 0.125)'
      },
      onClick: function onClick() {
        setSelectedItem(item);
        setSearchText(item.name);
        handleChange({
          target: {
            value: {
              selectedItem: item,
              searchText: item.name
            }
          }
        });
      }
    }, item.name);
  })))));
};
var _default = DataSource;
exports["default"] = _default;