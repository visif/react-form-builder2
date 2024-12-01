"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TwoColumnRow = exports.ThreeColumnRow = exports.MultiColumnRow = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _componentLabel = _interopRequireDefault(require("../form-elements/component-label"));
var _ItemTypes = _interopRequireDefault(require("../ItemTypes"));
var _dustbin = _interopRequireDefault(require("./dustbin"));
var _excluded = ["data", "className"],
  _excluded2 = ["data", "className"],
  _excluded3 = ["data", "className"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var accepts = [_ItemTypes["default"].BOX, _ItemTypes["default"].CARD];
var MultiColumnRowBase = function MultiColumnRowBase(props) {
  var controls = props.controls,
    data = props.data,
    editModeOn = props.editModeOn,
    getDataById = props.getDataById,
    setAsChild = props.setAsChild,
    removeChild = props.removeChild,
    seq = props.seq,
    className = props.className,
    index = props.index;
  var childItems = data.childItems,
    pageBreakBefore = data.pageBreakBefore;
  var baseClasses = 'SortableItem rfb-item';
  if (pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, childItems.map(function (x, i) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: "".concat(i, "_").concat(x || '_'),
      className: className
    }, controls ? controls[i] : /*#__PURE__*/_react["default"].createElement(_dustbin["default"], {
      style: {
        width: '100%'
      },
      data: data,
      accepts: accepts,
      items: childItems,
      col: i,
      parentIndex: index,
      editModeOn: editModeOn,
      _onDestroy: function _onDestroy() {
        return removeChild(data, i);
      },
      getDataById: getDataById,
      setAsChild: setAsChild,
      seq: seq
    }));
  }))));
};
var TwoColumnRow = function TwoColumnRow(_ref) {
  var data = _ref.data,
    className = _ref.className,
    rest = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  var columnClassName = className || 'col-md-6';
  if (!data.childItems) {
    // eslint-disable-next-line no-param-reassign
    data.childItems = [null, null];
    data.isContainer = true;
  }
  return /*#__PURE__*/_react["default"].createElement(MultiColumnRowBase, (0, _extends2["default"])({}, rest, {
    className: columnClassName,
    data: data
  }));
};
exports.TwoColumnRow = TwoColumnRow;
var ThreeColumnRow = function ThreeColumnRow(_ref2) {
  var data = _ref2.data,
    className = _ref2.className,
    rest = (0, _objectWithoutProperties2["default"])(_ref2, _excluded2);
  var columnClassName = className || 'col-md-4';
  if (!data.childItems) {
    // eslint-disable-next-line no-param-reassign
    data.childItems = [null, null, null];
    data.isContainer = true;
  }
  return /*#__PURE__*/_react["default"].createElement(MultiColumnRowBase, (0, _extends2["default"])({}, rest, {
    className: columnClassName,
    data: data
  }));
};
exports.ThreeColumnRow = ThreeColumnRow;
var MultiColumnRow = function MultiColumnRow(_ref3) {
  var data = _ref3.data,
    className = _ref3.className,
    rest = (0, _objectWithoutProperties2["default"])(_ref3, _excluded3);
  var colCount = data.col_count || 4;
  var columnClassName = className || (colCount === 4 ? 'col-md-3' : 'col');
  if (!data.childItems) {
    // eslint-disable-next-line no-param-reassign
    data.childItems = Array.from({
      length: colCount
    }, function () {
      return null;
    });
    data.isContainer = true;
  }
  return /*#__PURE__*/_react["default"].createElement(MultiColumnRowBase, (0, _extends2["default"])({}, rest, {
    className: columnClassName,
    data: data
  }));
};
exports.MultiColumnRow = MultiColumnRow;