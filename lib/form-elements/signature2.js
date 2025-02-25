"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _dateUtil = require("../functions/dateUtil");
var _componentHeader = _interopRequireDefault(require("./component-header"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Signature2 = function Signature2(props) {
  var inputField = (0, _react.useRef)(null);
  var tableRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(props.defaultValue && props.defaultValue.isSigned),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    defaultValue = _useState2[0],
    setDefaultValue = _useState2[1];
  var _useState3 = (0, _react.useState)(props.defaultValue && props.defaultValue.isSigned),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    isSigned = _useState4[0],
    setIsSigned = _useState4[1];
  var _useState5 = (0, _react.useState)(props.defaultValue && props.defaultValue.signedPerson),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    signedPerson = _useState6[0],
    setSignedPerson = _useState6[1];
  var _useState7 = (0, _react.useState)(props.defaultValue && props.defaultValue.signedPersonId),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    signedPersonId = _useState8[0],
    setSignedPersonId = _useState8[1];
  var _useState9 = (0, _react.useState)(props.defaultValue && props.defaultValue.signedDateTime),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    signedDateTime = _useState10[0],
    setSignedDateTime = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
    isError = _useState12[0],
    setIsError = _useState12[1];
  (0, _react.useEffect)(function () {
    console.log('Signature useEffect');
    if (props.defaultValue && props.defaultValue.isSigned !== defaultValue) {
      setDefaultValue(props.defaultValue && props.defaultValue.isSigned);
      setIsSigned(props.defaultValue && props.defaultValue.isSigned);
      setIsError(false);
      setSignedPerson(props.defaultValue.signedPerson);
      setSignedPersonId(props.defaultValue && props.defaultValue.signedPersonId);
    }
  }, [props.defaultValue]); // Dependency array

  var clickToSign = function clickToSign() {
    if (typeof props.getActiveUserProperties !== 'function') {
      return;
    }
    var userProperties = props.getActiveUserProperties();
    var roleLists = userProperties && userProperties.role || [];
    roleLists = roleLists.concat([userProperties && userProperties.name || '']);
    var position = "".concat(props.data.position).toLocaleLowerCase().trim();
    if (props.data.specificRole === 'specific' && roleLists.find(function (item) {
      return "".concat(item).toLocaleLowerCase().trim() === position;
    })) {
      setIsSigned(function (current) {
        var newSigned = !current;
        setSignedPerson(newSigned ? userProperties.name : '');
        setSignedPersonId(newSigned ? userProperties.userId : '');
        setSignedDateTime(newSigned ? (0, _dayjs.default)().utc(true) : null);
        return newSigned;
      });
    } else if (props.data.specificRole === 'notSpecific') {
      setIsSigned(function (current) {
        var newSigned = !current;
        setSignedPerson(newSigned ? userProperties.name : '');
        setSignedPersonId(newSigned ? userProperties.userId : '');
        setSignedDateTime(newSigned ? (0, _dayjs.default)().utc(true) : null);
        return newSigned;
      });
    } else {
      if (!isError) {
        setIsError(true);
        setTimeout(function () {
          setIsError(false);
        }, 5000);
      }
      console.log('role and name does not match');
    }
  };
  var userProperties = props.getActiveUserProperties && props.getActiveUserProperties();
  var savedEditor = props.editor;
  var isSameEditor = true;
  if (savedEditor && savedEditor.userId && !!userProperties) {
    isSameEditor = userProperties.userId === savedEditor.userId;
  }
  var hasRequiredLabel = props.data.hasOwnProperty('required') && props.data.required === true && !props.read_only;
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: tableRef,
    className: "SortableItem rfb-item".concat(props.data.pageBreakBefore ? ' alwaysbreak' : '')
  }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, props), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group",
    onClick: function onClick() {
      if (isSameEditor) {
        clickToSign();
      }
    },
    style: {
      cursor: 'pointer'
    }
  }, hasRequiredLabel && /*#__PURE__*/_react.default.createElement("span", {
    className: "label-required badge badge-danger",
    style: {
      marginLeft: '60%'
    }
  }, "Required"), /*#__PURE__*/_react.default.createElement("h5", {
    style: {
      textAlign: 'center'
    }
  }, isSigned ? 'Already signed' : '(Click to sign)'), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 8,
      color: isError ? 'red' : 'black'
    }
  }, isError ? 'You have no permission to sign' : '__________________'), /*#__PURE__*/_react.default.createElement("h6", {
    style: {
      textAlign: 'center',
      minHeight: 20
    }
  }, isSigned && "(".concat(signedPerson, ")")), /*#__PURE__*/_react.default.createElement("h6", {
    style: {
      textAlign: 'center'
    }
  }, props.data.position || 'Placeholder Text'), signedDateTime && /*#__PURE__*/_react.default.createElement("h6", {
    style: {
      textAlign: 'center'
    }
  }, (0, _dateUtil.formatDate)(signedDateTime))));
};
var _default = Signature2;
exports.default = _default;