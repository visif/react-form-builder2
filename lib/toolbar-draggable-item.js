"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactDnd = require("react-dnd");
var _ItemTypes = _interopRequireDefault(require("./ItemTypes"));
var _UUID = _interopRequireDefault(require("./UUID"));
/**
 * <ToolbarItem />
 */

var cardSource = {
  beginDrag: function beginDrag(props) {
    return {
      id: _UUID.default.uuid(),
      index: -1,
      data: props.data,
      onCreate: props.onCreate
    };
  }
};
var ToolbarItem = function ToolbarItem(_ref) {
  var connectDragSource = _ref.connectDragSource,
    data = _ref.data,
    onClick = _ref.onClick;
  if (!connectDragSource) return null;
  return connectDragSource(/*#__PURE__*/_react.default.createElement("li", {
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: data.icon
  }), data.name));
};
var _default = (0, _reactDnd.DragSource)(_ItemTypes.default.CARD, cardSource, function (connect) {
  return {
    connectDragSource: connect.dragSource()
  };
})(ToolbarItem);
exports.default = _default;