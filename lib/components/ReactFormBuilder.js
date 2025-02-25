"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _reactDnd = require("react-dnd");
var _reactDndHtml5Backend = require("react-dnd-html5-backend");
var _reactIntl = require("react-intl");
var _languageProvider = _interopRequireDefault(require("../language-provider"));
var _preview = _interopRequireDefault(require("../preview"));
var _registry = _interopRequireDefault(require("../stores/registry"));
var _toolbar = _interopRequireDefault(require("../toolbar"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ReactFormBuilder = function ReactFormBuilder(props) {
  var locale = props.locale;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    editMode = _useState2[0],
    setEditMode = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    editElement = _useState4[0],
    setEditElement = _useState4[1];
  var editModeOn = function editModeOn(data, e) {
    e.preventDefault();
    e.stopPropagation();
    if (editMode) {
      setEditMode(false);
      setEditElement(null);
    } else {
      setEditMode(true);
      setEditElement(data);
    }
  };
  var manualEditModeOff = function manualEditModeOff() {
    if (editMode) {
      setEditMode(false);
      setEditElement(null);
    }
  };
  var toolbarProps = {
    showDescription: props.show_description,
    items: props.toolbarItems
  };
  var currentAppLocale = _languageProvider.default[locale || 'en'];
  return /*#__PURE__*/_react.default.createElement(_reactDnd.DndProvider, {
    backend: _reactDndHtml5Backend.HTML5Backend,
    context: window
  }, /*#__PURE__*/_react.default.createElement(_reactIntl.IntlProvider, {
    locale: currentAppLocale.locale,
    messages: currentAppLocale.messages
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "react-form-builder clearfix"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_preview.default, {
    files: props.files,
    manualEditModeOff: manualEditModeOff,
    showCorrectColumn: props.showCorrectColumn,
    parent: null // Note: 'this' reference removed
    ,
    data: props.data,
    url: props.url,
    saveUrl: props.saveUrl,
    onLoad: props.onLoad,
    onPost: props.onPost,
    editModeOn: editModeOn,
    editMode: editMode,
    variables: props.variables,
    registry: _registry.default,
    editElement: editElement,
    renderEditForm: props.renderEditForm,
    saveAlways: props.saveAlways,
    getDataSource: props.getDataSource,
    getActiveUserProperties: props.getActiveUserProperties,
    onImageUpload: props.onImageUpload
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-md-6",
    style: {
      maxHeight: 'calc(100vh - 10px)',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/_react.default.createElement(_toolbar.default, (0, _extends2.default)({}, toolbarProps, {
    customItems: props.customToolbarItems
  })))))));
};
var _default = ReactFormBuilder;
exports.default = _default;