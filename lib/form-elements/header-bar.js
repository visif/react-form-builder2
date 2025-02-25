"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _componentDragHandle = _interopRequireDefault(require("./component-drag-handle"));
var HeaderBar = function HeaderBar(props) {
  var _props$editModeOn, _props$onDestroy;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "toolbar-header"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "badge badge-secondary"
  }, props.data.text), /*#__PURE__*/_react.default.createElement("div", {
    className: "toolbar-header-buttons"
  }, props.data.element !== 'LineBreak' && /*#__PURE__*/_react.default.createElement("div", {
    className: "btn is-isolated",
    onClick: (_props$editModeOn = props.editModeOn) === null || _props$editModeOn === void 0 ? void 0 : _props$editModeOn.bind(props.parent, props.data)
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "is-isolated fas fa-edit"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "btn is-isolated",
    onClick: (_props$onDestroy = props.onDestroy) === null || _props$onDestroy === void 0 ? void 0 : _props$onDestroy.bind(props, props.data)
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "is-isolated fas fa-trash"
  })), /*#__PURE__*/_react.default.createElement(_componentDragHandle.default, {
    data: props.data,
    index: props.index,
    onDestroy: props.onDestroy,
    setAsChild: props.setAsChild
  })));
};
var _default = HeaderBar;
exports.default = _default;