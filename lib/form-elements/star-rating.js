"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * @typedef {Object} StarRatingProps
 * @property {string} name - Input name attribute
 * @property {string} [caption] - Optional caption
 * @property {number} [ratingAmount=5] - Number of stars to display
 * @property {number} [rating] - Initial rating value
 * @property {Function} [onRatingClick] - Callback when rating is clicked
 * @property {boolean} [disabled=false] - Whether the rating is disabled
 * @property {boolean} [editing=false] - Whether the rating is in edit mode
 * @property {string} [size] - Size variant of the rating
 * @property {number} [step=0.5] - Step increment for rating values
 */

var StarRating = function StarRating(_ref) {
  var name = _ref.name,
    caption = _ref.caption,
    _ref$ratingAmount = _ref.ratingAmount,
    ratingAmount = _ref$ratingAmount === void 0 ? 5 : _ref$ratingAmount,
    initialRating = _ref.rating,
    _ref$onRatingClick = _ref.onRatingClick,
    onRatingClick = _ref$onRatingClick === void 0 ? function () {} : _ref$onRatingClick,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$editing = _ref.editing,
    initialEditing = _ref$editing === void 0 ? false : _ref$editing,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'large' : _ref$size,
    _ref$step = _ref.step,
    step = _ref$step === void 0 ? 0.5 : _ref$step;
  var min = 0;
  var max = ratingAmount;
  var rootRef = (0, _react.useRef)(null);
  var containerRef = (0, _react.useRef)(null);
  var getStars = function getStars() {
    return '★'.repeat(ratingAmount);
  };
  var getWidthFromValue = function getWidthFromValue(val) {
    if (val <= min || min === max) return 0;
    if (val >= max) return 100;
    return val / (max - min) * 100;
  };
  var getStarRatingPosition = function getStarRatingPosition(val) {
    return "".concat(getWidthFromValue(val), "%");
  };
  var initialCache = {
    pos: initialRating ? getStarRatingPosition(initialRating) : 0,
    rating: initialRating
  };
  var _useState = (0, _react.useState)({
      ratingCache: initialCache,
      editing: initialEditing || !initialRating,
      rating: initialCache.rating,
      pos: initialCache.pos,
      glyph: getStars()
    }),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  var getPosition = function getPosition(e) {
    return e.pageX - rootRef.current.getBoundingClientRect().left;
  };
  var applyPrecision = function applyPrecision(val, precision) {
    return parseFloat(val.toFixed(precision));
  };
  var getDecimalPlaces = function getDecimalPlaces(num) {
    var match = "".concat(num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  };
  var getValueFromPosition = function getValueFromPosition(pos) {
    var precision = getDecimalPlaces(step);
    var maxWidth = containerRef.current.offsetWidth;
    var diff = max - min;
    var factor = diff * pos / (maxWidth * step);
    factor = Math.ceil(factor);
    var val = applyPrecision(parseFloat(min + factor * step), precision);
    val = Math.max(Math.min(val, max), min);
    return val;
  };
  var calculate = function calculate(pos) {
    var val = getValueFromPosition(pos);
    var width = "".concat(getWidthFromValue(val), "%");
    return {
      width: width,
      val: val
    };
  };
  var handleMouseLeave = function handleMouseLeave() {
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        pos: prev.ratingCache.pos,
        rating: prev.ratingCache.rating
      });
    });
  };
  var handleMouseMove = function handleMouseMove(e) {
    var pos = getPosition(e);
    var _calculate = calculate(pos),
      width = _calculate.width,
      val = _calculate.val;
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        pos: width,
        rating: val
      });
    });
  };
  var handleClick = function handleClick(e) {
    if (disabled) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    var newCache = {
      pos: state.pos,
      rating: state.rating,
      caption: caption,
      name: name
    };
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        ratingCache: newCache
      });
    });
    onRatingClick(e, newCache);
    return true;
  };
  var containerClass = ['rating-container', 'rating-gly-star', disabled && 'rating-disabled', size && "react-star-rating__size--".concat(size), state.editing && 'rating-editing'].filter(Boolean).join(' ');
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "star-rating-wrapper"
  }, /*#__PURE__*/_react.default.createElement("style", null, "\n          .star-rating-wrapper {\n            display: inline-block;\n            position: relative;\n          }\n          \n          .react-star-rating {\n            display: inline-block;\n            position: relative;\n          }\n          \n          .rating-container {\n            position: relative;\n            vertical-align: middle;\n            display: inline-block;\n            color: #e3e3e3;\n            overflow: hidden;\n            font-size: 24px;\n          }\n          \n          .rating-container:before {\n            content: attr(data-content);\n          }\n          \n          .rating-container .rating-stars {\n            position: absolute;\n            left: 0;\n            top: 0;\n            white-space: nowrap;\n            overflow: hidden;\n            color: #ffd700;\n            transition: width 0.2s ease-in-out;\n          }\n          \n          .rating-container .rating-stars:before {\n            content: attr(data-content);\n          }\n          \n          .rating-container.rating-disabled {\n            cursor: not-allowed;\n            opacity: 0.5;\n          }\n          \n          /* Size Variants */\n          .react-star-rating__size--tiny {\n            font-size: 16px;\n          }\n          \n          .react-star-rating__size--small {\n            font-size: 20px;\n          }\n          \n          .react-star-rating__size--medium {\n            font-size: 24px;\n          }\n          \n          .react-star-rating__size--large {\n            font-size: 32px;\n          }\n          \n          .react-star-rating__size--huge {\n            font-size: 40px;\n          }\n          \n          /* Hover effect only when editing */\n          .rating-editing .rating-container {\n            cursor: pointer;\n          }\n          \n          .rating-editing .rating-container:hover {\n            color: #d5d5d5;\n          }\n          \n          .rating-editing .rating-container:hover .rating-stars {\n            color: #ffcd00;\n          }\n          \n          /* Animation */\n          @keyframes pulse {\n            0% {\n              transform: scale(1);\n            }\n            50% {\n              transform: scale(1.05);\n            }\n            100% {\n              transform: scale(1);\n            }\n          }\n          \n          .rating-container .rating-stars.rating-active {\n            animation: pulse 0.2s ease-in-out;\n          }\n        "), /*#__PURE__*/_react.default.createElement("span", {
    className: "react-star-rating"
  }, /*#__PURE__*/_react.default.createElement("span", {
    ref: rootRef,
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    ref: containerRef,
    className: containerClass,
    "data-content": state.glyph
  }, state.editing && {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "rating-stars",
    "data-content": state.glyph,
    style: {
      width: state.pos
    }
  })), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    name: name,
    value: state.ratingCache.rating,
    style: {
      display: 'none',
      width: 65
    },
    min: min,
    max: max,
    readOnly: true
  }))));
};
var _default = StarRating;
exports.default = _default;