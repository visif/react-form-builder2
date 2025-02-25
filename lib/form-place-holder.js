"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactIntl = require("react-intl");
var _propTypes = _interopRequireDefault(require("prop-types"));
var PLACE_HOLDER = 'form-place-holder';
var PLACE_HOLDER_HIDDEN = 'form-place-holder-hidden';
var PlaceHolder = function PlaceHolder(_ref) {
  var intl = _ref.intl,
    show = _ref.show,
    text = _ref.text;
  var placeHolderClass = show ? PLACE_HOLDER : PLACE_HOLDER_HIDDEN;
  // eslint-disable-next-line no-nested-ternary
  var placeHolder = show ? text === 'Dropzone' ? intl.formatMessage({
    id: 'drop-zone'
  }) : text : '';
  return /*#__PURE__*/_react.default.createElement("div", {
    className: placeHolderClass
  }, /*#__PURE__*/_react.default.createElement("div", null, placeHolder));
};
PlaceHolder.propTypes = {
  text: _propTypes.default.string,
  show: _propTypes.default.bool,
  intl: _propTypes.default.object.isRequired
};
var _default = (0, _reactIntl.injectIntl)(PlaceHolder);
exports.default = _default;