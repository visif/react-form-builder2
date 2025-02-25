"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormStore = exports.FormProvider = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// Action types
var SET_FIELD_VALUE = 'SET_FIELD_VALUE';
var SET_MULTIPLE_VALUES = 'SET_MULTIPLE_VALUES';
var RESET_FORM = 'RESET_FORM';
var TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';
var SET_CHECKBOX_VALUES = 'SET_CHECKBOX_VALUES';

// Helper functions for immutable array operations
var toggleArrayValue = function toggleArrayValue() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var value = arguments.length > 1 ? arguments[1] : undefined;
  var newArray = (0, _toConsumableArray2.default)(Array.isArray(array) ? array : []);
  var index = newArray.findIndex(function (item) {
    return (0, _typeof2.default)(item) === 'object' ? item.value === value : item === value;
  });
  if (index === -1) {
    newArray.push(value);
  } else {
    newArray.splice(index, 1);
  }
  return newArray;
};
var ensureArray = function ensureArray(value) {
  if (value === null || value === undefined) return [];
  return Array.isArray(value) ? value : [value];
};

// Reducer to handle form state updates
var formReducer = function formReducer(state, action) {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return _objectSpread(_objectSpread({}, state), {}, {
        values: _objectSpread(_objectSpread({}, state.values), {}, (0, _defineProperty2.default)({}, action.field, action.value))
      });
    case SET_MULTIPLE_VALUES:
      {
        // Handle both array and single values for each field
        var processedValues = Object.entries(action.values).reduce(function (acc, _ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];
          // If the current field already has an array value, preserve array nature
          var isCurrentArray = Array.isArray(state.values[key]);
          acc[key] = isCurrentArray ? ensureArray(value) : value;
          return acc;
        }, {});
        return _objectSpread(_objectSpread({}, state), {}, {
          values: _objectSpread(_objectSpread({}, state.values), processedValues)
        });
      }
    case TOGGLE_CHECKBOX:
      return _objectSpread(_objectSpread({}, state), {}, {
        values: _objectSpread(_objectSpread({}, state.values), {}, (0, _defineProperty2.default)({}, action.field, toggleArrayValue(state.values[action.field], action.value)))
      });
    case SET_CHECKBOX_VALUES:
      return _objectSpread(_objectSpread({}, state), {}, {
        values: _objectSpread(_objectSpread({}, state.values), {}, (0, _defineProperty2.default)({}, action.field, ensureArray(action.values)))
      });
    case RESET_FORM:
      return _objectSpread(_objectSpread({}, state), {}, {
        values: action.initialValues || {}
      });
    default:
      return state;
  }
};

// Create context with a default value
var FormContext = /*#__PURE__*/(0, _react.createContext)({
  values: {},
  setFieldValue: function setFieldValue() {},
  setMultipleValues: function setMultipleValues() {},
  toggleCheckbox: function toggleCheckbox() {},
  setCheckboxValues: function setCheckboxValues() {},
  resetForm: function resetForm() {},
  getFieldValue: function getFieldValue() {}
});

// Form provider component
var FormProvider = function FormProvider(_ref3) {
  var children = _ref3.children,
    _ref3$initialValues = _ref3.initialValues,
    initialValues = _ref3$initialValues === void 0 ? {} : _ref3$initialValues;
  var _useReducer = (0, _react.useReducer)(formReducer, {
      values: initialValues
    }),
    _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
    state = _useReducer2[0],
    dispatch = _useReducer2[1];
  var setFieldValue = (0, _react.useCallback)(function (field, value) {
    dispatch({
      type: SET_FIELD_VALUE,
      field: field,
      value: value
    });
  }, []);
  var setMultipleValues = (0, _react.useCallback)(function (values) {
    dispatch({
      type: SET_MULTIPLE_VALUES,
      values: values
    });
  }, []);
  var toggleCheckbox = (0, _react.useCallback)(function (field, value) {
    dispatch({
      type: TOGGLE_CHECKBOX,
      field: field,
      value: value
    });
  }, []);
  var setCheckboxValues = (0, _react.useCallback)(function (field, values) {
    dispatch({
      type: SET_CHECKBOX_VALUES,
      field: field,
      values: values
    });
  }, []);
  var resetForm = (0, _react.useCallback)(function (newInitialValues) {
    dispatch({
      type: RESET_FORM,
      initialValues: newInitialValues
    });
  }, []);
  var getFieldValue = (0, _react.useCallback)(function (field) {
    return state.values[field];
  }, [state.values]);
  var value = (0, _react.useMemo)(function () {
    return {
      values: state.values,
      setFieldValue: setFieldValue,
      setMultipleValues: setMultipleValues,
      toggleCheckbox: toggleCheckbox,
      setCheckboxValues: setCheckboxValues,
      resetForm: resetForm,
      getFieldValue: getFieldValue
    };
  }, [state.values, setFieldValue, setMultipleValues, toggleCheckbox, setCheckboxValues, resetForm, getFieldValue]);
  return /*#__PURE__*/_react.default.createElement(FormContext.Provider, {
    value: value
  }, children);
};

// Custom hook to use form context
exports.FormProvider = FormProvider;
var useFormStore = function useFormStore() {
  var context = (0, _react.useContext)(FormContext);
  if (!context) {
    throw new Error('useFormStore must be used within a FormProvider');
  }
  return context;
};
exports.useFormStore = useFormStore;