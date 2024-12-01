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
var _componentHeader = _interopRequireDefault(require("./component-header"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Signature2 = function Signature2(props) {
  var defaultValue = props.defaultValue,
    getActiveUserProperties = props.getActiveUserProperties,
    data = props.data,
    editor = props.editor,
    readOnly = props.read_only,
    handleChange = props.handleChange;
  var _useState = (0, _react.useState)({
      defaultValue: defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.isSigned,
      isSigned: defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.isSigned,
      signedPerson: defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.signedPerson,
      signedPersonId: defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.signedPersonId,
      isError: false
    }),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  (0, _react.useEffect)(function () {
    if ((defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.isSigned) === state.defaultValue) {
      return;
    }
    var value = {
      isSigned: defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.isSigned,
      signedPerson: defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.signedPerson,
      signedPersonId: defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.signedPersonId
    };
    handleChange({
      target: {
        value: _objectSpread({}, value)
      }
    });
    setState(_objectSpread({
      defaultValue: defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.isSigned,
      isError: false
    }, value));
  }, [defaultValue]);
  var clickToSign = function clickToSign() {
    if (typeof getActiveUserProperties !== 'function') {
      return;
    }
    var userProperties = getActiveUserProperties();
    var roleLists = (userProperties === null || userProperties === void 0 ? void 0 : userProperties.role) || [];
    roleLists = roleLists.concat([(userProperties === null || userProperties === void 0 ? void 0 : userProperties.name) || '']);
    var position = "".concat(data.position).toLocaleLowerCase().trim();
    if (data.specificRole === 'specific' && roleLists.some(function (item) {
      return "".concat(item).toLocaleLowerCase().trim() === position;
    }) || data.specificRole === 'notSpecific') {
      setState(function (current) {
        var value = {
          isSigned: !current.isSigned,
          signedPerson: !current.isSigned ? userProperties.name : '',
          signedPersonId: !current.isSigned ? userProperties.userId : ''
        };
        handleChange({
          target: {
            value: _objectSpread({}, value)
          }
        });
        return _objectSpread(_objectSpread({}, current), value);
      });
    } else {
      if (!state.isError) {
        setState(function (current) {
          return _objectSpread(_objectSpread({}, current), {}, {
            isError: true
          });
        });
        setTimeout(function () {
          setState(function (current) {
            return _objectSpread(_objectSpread({}, current), {}, {
              isError: false
            });
          });
        }, 5000);
      }
      console.log('role and name does not match');
    }
  };
  var userProperties = getActiveUserProperties === null || getActiveUserProperties === void 0 ? void 0 : getActiveUserProperties();
  var isSameEditor = editor !== null && editor !== void 0 && editor.userId && userProperties ? userProperties.userId === editor.userId : true;
  var hasRequiredLabel = data.required && !readOnly;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "SortableItem rfb-item".concat(data.pageBreakBefore ? ' alwaysbreak' : '')
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group",
    onClick: function onClick() {
      if (isSameEditor) {
        clickToSign();
      }
    },
    style: {
      cursor: 'pointer'
    }
  }, hasRequiredLabel && /*#__PURE__*/_react["default"].createElement("span", {
    className: "label-required badge badge-danger",
    style: {
      marginLeft: '60%'
    }
  }, "Required"), /*#__PURE__*/_react["default"].createElement("h5", {
    style: {
      textAlign: 'center'
    }
  }, state.isSigned ? 'Already signed' : '(Click to sign)'), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 8,
      color: state.isError ? 'red' : 'black'
    }
  }, state.isError ? 'You have no permission to sign' : '__________________'), /*#__PURE__*/_react["default"].createElement("h6", {
    style: {
      textAlign: 'center',
      minHeight: 20
    }
  }, state.isSigned && "(".concat(state.signedPerson, ")")), /*#__PURE__*/_react["default"].createElement("h6", {
    style: {
      textAlign: 'center'
    }
  }, data.position || 'Placeholder Text')));
};
var _default = Signature2;
exports["default"] = _default;