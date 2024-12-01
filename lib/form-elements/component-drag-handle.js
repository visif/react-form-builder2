"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDnd = require("react-dnd");
var _reactDndHtml5Backend = require("react-dnd-html5-backend");
var _ItemTypes = _interopRequireDefault(require("../ItemTypes"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var style = {
  cursor: 'move'
};
var dragHandleSource = {
  beginDrag: function beginDrag(props) {
    var data = props.data,
      index = props.index,
      onDestroy = props.onDestroy,
      setAsChild = props.setAsChild,
      getDataById = props.getDataById;
    return {
      itemType: _ItemTypes["default"].BOX,
      index: data.parentId ? -1 : index,
      parentIndex: data.parentIndex,
      id: data.id,
      col: data.col,
      onDestroy: onDestroy,
      setAsChild: setAsChild,
      getDataById: getDataById,
      data: data
    };
  }
};
var DragHandle = function DragHandle(_ref) {
  var connectDragSource = _ref.connectDragSource,
    connectDragPreview = _ref.connectDragPreview;
  (0, _react.useEffect)(function () {
    if (connectDragPreview) {
      connectDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {
        captureDraggingState: true
      });
    }
  }, [connectDragPreview]);
  return connectDragSource(/*#__PURE__*/_react["default"].createElement("div", {
    className: "btn is-isolated",
    style: style
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "is-isolated fas fa-grip-vertical"
  })));
};
var _default = (0, _reactDnd.DragSource)(_ItemTypes["default"].BOX, dragHandleSource, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
})(DragHandle);
exports["default"] = _default;