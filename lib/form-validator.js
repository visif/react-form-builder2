"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _xss = _interopRequireDefault(require("xss"));
var _IntlMessages = _interopRequireDefault(require("./language-provider/IntlMessages"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var myxss = new _xss["default"].FilterXSS({
  whiteList: {
    u: [],
    br: [],
    b: [],
    i: [],
    ol: ['style'],
    ul: ['style'],
    li: [],
    p: ['style'],
    sub: [],
    sup: [],
    div: ['style'],
    em: [],
    strong: [],
    span: ['style']
  }
});
var FormValidator = function FormValidator(_ref) {
  var emitter = _ref.emitter;
  var _useState = (0, _react.useState)([]),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    errors = _useState2[0],
    setErrors = _useState2[1];
  (0, _react.useEffect)(function () {
    var subscription = emitter.addListener('formValidation', function (validationErrors) {
      setErrors(validationErrors);
    });
    return function () {
      subscription.remove();
    };
  }, [emitter]);
  var dismissModal = function dismissModal(e) {
    e.preventDefault();
    setErrors([]);
  };
  var errorList = errors.map(function (error, index) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: "error_".concat(index),
      dangerouslySetInnerHTML: {
        __html: myxss.process(error)
      }
    });
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, errors.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "alert alert-danger validation-error"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "clearfix"
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "fas fa-exclamation-triangle float-left"
  }), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "float-left"
  }, errorList)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "clearfix"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    className: "float-right btn btn-default btn-sm btn-danger",
    onClick: dismissModal
  }, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "dismiss"
  })))));
};
var _default = FormValidator;
exports["default"] = _default;