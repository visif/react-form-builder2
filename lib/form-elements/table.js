"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _componentHeader = _interopRequireDefault(require("./component-header"));
var _componentLabel = _interopRequireDefault(require("./component-label"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Table = function Table(props) {
  var _props$data2, _props$data3, _state$rowLabels3, _props$data4, _props$data4$columns;
  var getInputValues = function getInputValues() {
    var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var rows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var addingRows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var rowLabels = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
    var result = [];
    var isFixedRow = (rowLabels === null || rowLabels === void 0 ? void 0 : rowLabels.length) > 0;
    var activeRows = Math.max(0, isFixedRow ? rowLabels === null || rowLabels === void 0 ? void 0 : rowLabels.length : rows + addingRows) || 1;
    Array.from(Array(Number(activeRows)).keys()).map(function (i) {
      var current = [];
      columns.map(function (j, jIndex) {
        var _defaultValue$i$jInde;
        var value = defaultValue[i] ? (_defaultValue$i$jInde = defaultValue[i][jIndex]) !== null && _defaultValue$i$jInde !== void 0 ? _defaultValue$i$jInde : '' : '';
        if (isFixedRow && jIndex === 0) {
          value = rowLabels[i].text;
        }
        current.push(value);
      });
      result.push(current);
    });
    return result;
  };
  var rowsAdded = (props.defaultValue ? props.defaultValue.length : Number(props.data.rows)) - Number(props.data.rows);
  var _useState = (0, _react.useState)({
      rows: Number(props.data.rows),
      rowLabels: props.data.rowLabels,
      columns: props.data.columns,
      defaultValue: props.defaultValue,
      inputs: getInputValues(props.defaultValue, props.data.columns, Number(props.data.rows), rowsAdded, props.data.rowLabels),
      rowsAdded: rowsAdded
    }),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  (0, _react.useEffect)(function () {
    var newState = getDerivedStateFromProps(props, state);
    if (newState !== state) {
      setState(newState);
    }
  }, [props]);
  var getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (Number(props.data.rows) !== Number(state.rows) || JSON.stringify(props.data.columns) !== JSON.stringify(state.columns) || JSON.stringify(state.rowLabels) !== JSON.stringify(props.data.rowLabels)) {
      return {
        rows: Number(props.data.rows),
        columns: props.data.columns,
        defaultValue: state.defaultValue,
        inputs: getInputValues(state.inputs, props.data.columns, Number(props.data.rows), state.rowsAdded, props.data.rowLabels),
        rowsAdded: state.rowsAdded,
        rowLabels: props.data.rowLabels
      };
    }
    if (JSON.stringify(state.defaultValue) !== JSON.stringify(props.defaultValue)) {
      var _rowsAdded = (props.defaultValue ? props.defaultValue.length : Number(props.data.rows)) - Number(props.data.rows);
      return {
        rows: Number(props.data.rows),
        columns: props.data.columns,
        defaultValue: props.defaultValue,
        inputs: getInputValues(props.defaultValue, props.data.columns, Number(props.data.rows), _rowsAdded, props.data.rowLabels),
        rowsAdded: _rowsAdded,
        rowLabels: props.data.rowLabels
      };
    }
    return state;
  };
  var addRow = function addRow() {
    setState(function (current) {
      return _objectSpread(_objectSpread({}, current), {}, {
        rowsAdded: current.rowsAdded + 1,
        inputs: getInputValues(current.inputs, current.columns, current.rows, current.rowsAdded + 1)
      });
    });
  };
  var removeRow = function removeRow() {
    setState(function (current) {
      return _objectSpread(_objectSpread({}, current), {}, {
        rowsAdded: current.rowsAdded - 1,
        inputs: getInputValues(current.inputs, current.columns, current.rows, current.rowsAdded - 1)
      });
    });
  };
  var renderRows = function renderRows() {
    var _state$rowLabels, _state$rowLabels2;
    var userProperties = props.getActiveUserProperties && props.getActiveUserProperties();
    var savedEditor = props.editor;
    var isSameEditor = true;
    if (savedEditor && savedEditor.userId && !!userProperties) {
      isSameEditor = userProperties.userId === savedEditor.userId;
    }
    var isFixedRow = ((_state$rowLabels = state.rowLabels) === null || _state$rowLabels === void 0 ? void 0 : _state$rowLabels.length) > 0;
    var activeRows = (isFixedRow ? (_state$rowLabels2 = state.rowLabels) === null || _state$rowLabels2 === void 0 ? void 0 : _state$rowLabels2.length : state.rows + state.rowsAdded) || 0;
    return /*#__PURE__*/_react.default.createElement("tbody", null, Array.from(Array(Number(activeRows)).keys()).map(function (i) {
      var _props$data, _props$data$columns;
      return /*#__PURE__*/_react.default.createElement("tr", {
        key: "row".concat(i)
      }, (_props$data = props.data) === null || _props$data === void 0 ? void 0 : (_props$data$columns = _props$data.columns) === null || _props$data$columns === void 0 ? void 0 : _props$data$columns.map(function (j, jIndex) {
        var _state$inputs$i$jInde;
        var isLabel = isFixedRow && jIndex === 0;
        if (isLabel) {
          return /*#__PURE__*/_react.default.createElement("td", {
            key: "label".concat(i)
          }, /*#__PURE__*/_react.default.createElement("label", null, state.rowLabels[i].text));
        }
        var value = state.inputs[i] ? (_state$inputs$i$jInde = state.inputs[i][jIndex]) !== null && _state$inputs$i$jInde !== void 0 ? _state$inputs$i$jInde : '' : '';
        return /*#__PURE__*/_react.default.createElement("td", {
          key: "cell".concat(i, "-").concat(jIndex)
        }, /*#__PURE__*/_react.default.createElement("textarea", {
          className: "form-control",
          style: isLabel ? {
            border: 0,
            backgroundColor: 'inherit'
          } : {},
          disabled: isLabel || !isSameEditor,
          type: "text",
          value: value,
          rows: 1,
          onChange: function onChange(event) {
            var value = event.target.value;
            var array = (0, _toConsumableArray2.default)(state.inputs);
            array[i][jIndex] = value;
            setState(_objectSpread(_objectSpread({}, state), {}, {
              inputs: array
            }));
          }
        }));
      }));
    }));
  };
  var getColumnWidth = function getColumnWidth(totalWidthCount, width) {
    var currentWidth = parseInt(width) ? Number(width) : 1;
    return "".concat(currentWidth / totalWidthCount * 100, "%");
  };
  var userProperties = props.getActiveUserProperties && props.getActiveUserProperties();
  var savedEditor = props.editor;
  var isSameEditor = true;
  if (savedEditor && savedEditor.userId && !!userProperties) {
    isSameEditor = userProperties.userId === savedEditor.userId;
  }
  var baseClasses = 'SortableItem rfb-item';
  if (props !== null && props !== void 0 && (_props$data2 = props.data) !== null && _props$data2 !== void 0 && _props$data2.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  var totalWidthCount = (((_props$data3 = props.data) === null || _props$data3 === void 0 ? void 0 : _props$data3.columns) || []).reduce(function (previous, current) {
    return previous + (parseInt(current.width) ? Number(current.width) : 1);
  }, 0);
  var isFixedRow = ((_state$rowLabels3 = state.rowLabels) === null || _state$rowLabels3 === void 0 ? void 0 : _state$rowLabels3.length) > 0;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: baseClasses,
    key: "table-container-".concat(props.id)
  }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, props), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement(_componentLabel.default, props), /*#__PURE__*/_react.default.createElement("table", {
    className: "table table-bordered",
    key: "table-".concat(props.id)
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, (_props$data4 = props.data) === null || _props$data4 === void 0 ? void 0 : (_props$data4$columns = _props$data4.columns) === null || _props$data4$columns === void 0 ? void 0 : _props$data4$columns.map(function (col) {
    return /*#__PURE__*/_react.default.createElement("th", {
      key: col.text,
      scope: "col",
      style: {
        width: getColumnWidth(totalWidthCount, col.width)
      }
    }, col.text);
  }))), renderRows()), !isFixedRow && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: removeRow,
    style: {
      marginRight: 8,
      display: state.inputs.length > 0 ? 'initial' : 'none'
    },
    disabled: !isSameEditor
  }, "Remove Row"), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "btn btn-info",
    disabled: !isSameEditor,
    onClick: addRow
  }, "Add Row"))));
};
var _default = Table;
exports.default = _default;