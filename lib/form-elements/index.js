"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _reactBootstrapSlider = _interopRequireDefault(require("react-bootstrap-slider"));
var _reactSelect = _interopRequireDefault(require("react-select"));
var _reactSignatureCanvas = _interopRequireDefault(require("react-signature-canvas"));
var _buffer = require("buffer");
var _fileSaver = require("file-saver");
var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));
var _componentHeader = _interopRequireDefault(require("./component-header"));
var _componentLabel = _interopRequireDefault(require("./component-label"));
var _datasource = _interopRequireDefault(require("./datasource"));
var _datePicker = _interopRequireDefault(require("./date-picker"));
var _myxss = _interopRequireDefault(require("./myxss"));
var _section = _interopRequireDefault(require("./section"));
var _signature = _interopRequireDefault(require("./signature2"));
var _starRating = _interopRequireDefault(require("./star-rating"));
var _table = _interopRequireDefault(require("./table"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; } // eslint-disable-next-line max-classes-per-file
var FormElements = {};
var Header = function Header(props) {
  var classNames = 'static';
  if (props.data.bold) {
    classNames += ' bold';
  }
  if (props.data.italic) {
    classNames += ' italic';
  }
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("h3", {
    className: classNames,
    dangerouslySetInnerHTML: {
      __html: _myxss["default"].process(props.data.content)
    }
  }));
};
var Paragraph = function Paragraph(props) {
  var classNames = 'static';
  if (props.data.bold) {
    classNames += ' bold';
  }
  if (props.data.italic) {
    classNames += ' italic';
  }
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("p", {
    className: classNames,
    dangerouslySetInnerHTML: {
      __html: _myxss["default"].process(props.data.content)
    }
  }));
};
var Label = function Label(props) {
  var classNames = 'static';
  if (props.data.bold) {
    classNames += ' bold';
  }
  if (props.data.italic) {
    classNames += ' italic';
  }
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("label", {
    className: "".concat(classNames, " form-label"),
    dangerouslySetInnerHTML: {
      __html: _myxss["default"].process(props.data.content)
    }
  }));
};
var LineBreak = function LineBreak(props) {
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("hr", null));
};
var TextInput = function TextInput(props) {
  var inputProps = {
    type: 'text',
    className: 'form-control',
    name: props.data.field_name,
    defaultValue: props.mutable ? props.defaultValue : undefined,
    disabled: props.read_only ? 'disabled' : undefined,
    onChange: props.handleChange
  };
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), /*#__PURE__*/_react["default"].createElement("input", inputProps)));
};
var EmailInput = function EmailInput(props) {
  var inputProps = {
    type: 'text',
    className: 'form-control',
    name: props.data.field_name,
    defaultValue: props.mutable ? props.defaultValue : undefined,
    disabled: props.read_only ? 'disabled' : undefined,
    onChange: props.handleChange
  };
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), /*#__PURE__*/_react["default"].createElement("input", inputProps)));
};
var PhoneNumber = function PhoneNumber(props) {
  var inputProps = {
    type: 'tel',
    className: 'form-control',
    name: props.data.field_name,
    defaultValue: props.mutable ? props.defaultValue : undefined,
    disabled: props.read_only ? 'disabled' : undefined,
    onChange: props.handleChange
  };
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), /*#__PURE__*/_react["default"].createElement("input", inputProps)));
};
var NumberInput = function NumberInput(props) {
  var inputProps = {
    type: 'number',
    className: 'form-control',
    name: props.data.field_name,
    defaultValue: props.mutable ? props.defaultValue : undefined,
    disabled: props.read_only ? 'disabled' : undefined,
    onChange: props.handleChange
  };
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), /*#__PURE__*/_react["default"].createElement("input", inputProps)));
};
var TextArea = function TextArea(props) {
  var inputProps = {
    className: 'form-control',
    name: props.data.field_name,
    defaultValue: props.mutable ? props.defaultValue : undefined,
    disabled: props.read_only ? 'disabled' : undefined,
    onChange: props.handleChange
  };
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), /*#__PURE__*/_react["default"].createElement("textarea", inputProps)));
};
var Dropdown = function Dropdown(props) {
  var selectProps = {
    className: 'form-control',
    name: props.data.field_name,
    defaultValue: props.mutable ? props.defaultValue : undefined,
    disabled: props.read_only ? 'disabled' : undefined,
    onChange: props.handleChange
  };
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), /*#__PURE__*/_react["default"].createElement("select", selectProps, props.data.options.map(function (option) {
    var thisKey = "preview_".concat(option.key);
    return /*#__PURE__*/_react["default"].createElement("option", {
      value: option.value,
      key: thisKey
    }, option.text);
  }))));
};
var Signature = function Signature(props) {
  var _React$useState = _react["default"].useState(props.defaultValue),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    defaultValue = _React$useState2[0],
    setDefaultValue = _React$useState2[1];
  var canvas = _react["default"].useRef();
  var clear = function clear() {
    if (defaultValue) {
      setDefaultValue('');
    } else if (canvas.current) {
      canvas.current.clear();
    }
  };
  var canClear = !!defaultValue;
  var inputProps = {
    type: 'hidden',
    name: props.data.field_name,
    defaultValue: props.mutable ? defaultValue : undefined
  };
  var padProps = {
    clearOnResize: false,
    defaultValue: props.mutable ? defaultValue : undefined,
    ref: props.mutable ? canvas : undefined
  };
  canClear = !props.read_only;
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  var sourceDataURL;
  if (defaultValue && defaultValue.length > 0) {
    sourceDataURL = "data:image/png;base64,".concat(defaultValue);
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), props.read_only === true || !!sourceDataURL ? /*#__PURE__*/_react["default"].createElement("img", {
    src: sourceDataURL
  }) : /*#__PURE__*/_react["default"].createElement(_reactSignatureCanvas["default"], padProps), canClear && /*#__PURE__*/_react["default"].createElement("i", {
    className: "fas fa-times clear-signature",
    onClick: clear,
    title: "Clear Signature"
  }), /*#__PURE__*/_react["default"].createElement("input", inputProps)));
};
var Tags = function Tags(props) {
  var defaultValue = props.defaultValue,
    data = props.data,
    onHandleChange = props.handleChange;
  function getDefaultValue(initialValue, options) {
    if (defaultValue) {
      if (typeof defaultValue === 'string') {
        var vals = defaultValue.split(',').map(function (x) {
          return x.trim();
        });
        return options.filter(function (x) {
          return vals.indexOf(x.value) > -1;
        });
      }
      return options.filter(function (x) {
        return defaultValue.indexOf(x.value) > -1;
      });
    }
    return [];
  }
  var _React$useState3 = _react["default"].useState(getDefaultValue(defaultValue, data.options)),
    _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
    value = _React$useState4[0],
    setValue = _React$useState4[1];
  var handleChange = function handleChange(e) {
    onHandleChange({
      target: {
        value: e
      }
    });
    setValue(e || []);
  };
  var options = props.data.options.map(function (option) {
    option.label = option.text;
    return option;
  });
  var selectProps = {
    isMulti: true,
    name: props.data.field_name,
    onChange: handleChange,
    options: options,
    value: props.mutable ? value : options[0].text,
    isDisabled: props.mutable ? props.read_only : undefined
  };
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), /*#__PURE__*/_react["default"].createElement(_reactSelect["default"], selectProps)));
};
var Checkboxes = function Checkboxes(props) {
  var classNames = 'custom-control custom-checkbox';
  if (props.data.inline) {
    classNames += ' option-inline';
  }
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), props.data.options.map(function (option) {
    var this_key = "preview_".concat(option.key);
    var inputProps = {
      name: "option_".concat(option.key),
      type: 'checkbox',
      value: option.value,
      defaultChecked: props.mutable && props.defaultValue !== undefined && props.defaultValue.indexOf(option.key) > -1,
      disabled: props.read_only ? 'disabled' : undefined,
      onChange: props.handleChange
    };
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: classNames,
      key: this_key
    }, /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
      id: "fid_".concat(this_key),
      className: "custom-control-input"
    }, inputProps)), /*#__PURE__*/_react["default"].createElement("label", {
      className: "custom-control-label",
      htmlFor: "fid_".concat(this_key)
    }, option.text));
  })));
};
var RadioButtons = function RadioButtons(props) {
  var classNames = 'custom-control custom-radio';
  if (props.data.inline) {
    classNames += ' option-inline';
  }
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), props.data.options.map(function (option) {
    var this_key = "preview_".concat(option.key);
    var inputProps = {
      name: props.data.field_name,
      type: 'radio',
      value: option.value,
      defaultChecked: props.mutable && props.defaultValue !== undefined && (props.defaultValue.indexOf(option.key) > -1 || props.defaultValue.indexOf(option.value) > -1),
      disabled: props.read_only ? 'disabled' : undefined,
      onChange: props.handleChange
    };
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: classNames,
      key: this_key
    }, /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
      id: "fid_".concat(this_key),
      className: "custom-control-input"
    }, inputProps)), /*#__PURE__*/_react["default"].createElement("label", {
      className: "custom-control-label",
      htmlFor: "fid_".concat(this_key)
    }, option.text));
  })));
};
var Image = function Image(props) {
  var style = props.data.center ? {
    textAlign: 'center'
  } : null;
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread(_objectSpread({}, props.style), style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), props.data.src ? /*#__PURE__*/_react["default"].createElement("img", {
    src: props.data.src,
    width: props.data.width,
    height: props.data.height
  }) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "no-image"
  }, "No Image"));
};
var Rating = function Rating(props) {
  var ratingProps = {
    name: props.data.field_name,
    ratingAmount: 5,
    rating: function () {
      if (props.mutable) {
        return props.defaultValue !== undefined ? parseFloat(props.defaultValue, 10) : 0;
      }
      return undefined;
    }(),
    editing: props.mutable,
    disabled: props.read_only,
    onRatingClick: function onRatingClick(event, rating) {
      props.handleChange({
        target: {
          value: rating.rating
        }
      });
    }
  };
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), /*#__PURE__*/_react["default"].createElement(_starRating["default"], ratingProps)));
};
var HyperLink = function HyperLink(props) {
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: 'form-label'
  }, /*#__PURE__*/_react["default"].createElement("a", {
    target: "_blank",
    href: props.data.href,
    dangerouslySetInnerHTML: {
      __html: _myxss["default"].process(props.data.content)
    }
  }))));
};
var Download = function Download(props) {
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    href: "".concat(props.download_path, "?id=").concat(props.data.file_path)
  }, props.data.content)));
};
var Camera = function Camera(props) {
  var _React$useState5 = _react["default"].useState(null),
    _React$useState6 = (0, _slicedToArray2["default"])(_React$useState5, 2),
    img = _React$useState6[0],
    setImg = _React$useState6[1];
  var _React$useState7 = _react["default"].useState(null),
    _React$useState8 = (0, _slicedToArray2["default"])(_React$useState7, 2),
    previewImg = _React$useState8[0],
    setPreviewImg = _React$useState8[1];
  var displayImage = function displayImage(e) {
    var target = e.target;
    if (target.files && target.files.length) {
      setImg(target.files[0]);
      setPreviewImg(URL.createObjectURL(target.files[0]));
    }
  };
  var clearImage = function clearImage() {
    setImg(null);
    setPreviewImg(null);
  };
  var getImageSizeProps = function getImageSizeProps(_ref) {
    var width = _ref.width,
      height = _ref.height;
    var imgProps = {
      width: '100%'
    };
    if (width) {
      imgProps.width = width < window.innerWidth ? width : 0.9 * window.innerWidth;
    }
    if (height) {
      imgProps.height = height;
    }
    return imgProps;
  };
  var imageStyle = {
    objectFit: 'scale-down',
    objectPosition: props.data.center ? 'center' : 'left'
  };
  var baseClasses = 'SortableItem rfb-item';
  var name = props.data.field_name;
  var fileInputStyle = img ? {
    display: 'none'
  } : null;
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  var sourceDataURL;
  if (props.read_only === true && props.defaultValue && props.defaultValue.length > 0) {
    if (props.defaultValue.indexOf(name > -1)) {
      sourceDataURL = props.defaultValue;
    } else {
      sourceDataURL = "data:image/png;base64,".concat(props.defaultValue);
    }
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), props.read_only === true && props.defaultValue && props.defaultValue.length > 0 ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("img", (0, _extends2["default"])({
    style: imageStyle,
    src: sourceDataURL
  }, getImageSizeProps(props.data)))) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "image-upload-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: fileInputStyle
  }, /*#__PURE__*/_react["default"].createElement("input", {
    name: name,
    type: "file",
    accept: "image/*",
    capture: "camera",
    className: "image-upload",
    onChange: displayImage
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "image-upload-control"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "btn btn-default"
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "fas fa-camera"
  }), " Upload Photo"), /*#__PURE__*/_react["default"].createElement("p", null, "Select an image from your computer or device."))), img && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("img", {
    onLoad: function onLoad() {
      return URL.revokeObjectURL(previewImg);
    },
    src: previewImg,
    height: "100",
    className: "image-upload-preview"
  }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
    className: "btn btn-image-clear",
    onClick: clearImage
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "fas fa-times"
  }), " Clear Photo")))));
};
var FileUpload = function FileUpload(props) {
  var _React$useState9 = _react["default"].useState(null),
    _React$useState10 = (0, _slicedToArray2["default"])(_React$useState9, 2),
    fileUpload = _React$useState10[0],
    setFileUpload = _React$useState10[1];
  var displayFileUpload = function displayFileUpload(e) {
    var target = e.target;
    var file;
    if (target.files && target.files.length > 0) {
      file = target.files[0];
      setFileUpload(file);
    }
  };
  var clearFileUpload = function clearFileUpload() {
    setFileUpload(null);
  };
  var saveFile = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(e) {
      var sourceUrl, response, dispositionHeader, resBlob, blob, fileName, _fileName;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              sourceUrl = props.defaultValue;
              _context.next = 4;
              return (0, _isomorphicFetch["default"])(sourceUrl, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json; charset=utf-8'
                },
                responseType: 'blob'
              });
            case 4:
              response = _context.sent;
              dispositionHeader = response.headers.get('Content-Disposition');
              _context.next = 8;
              return response.blob();
            case 8:
              resBlob = _context.sent;
              blob = new _buffer.Blob([resBlob], {
                type: props.data.fileType || response.headers.get('Content-Type')
              });
              if (dispositionHeader && dispositionHeader.indexOf(';filename=') > -1) {
                fileName = dispositionHeader.split(';filename=')[1];
                (0, _fileSaver.saveAs)(blob, fileName);
              } else {
                _fileName = sourceUrl.substring(sourceUrl.lastIndexOf('/') + 1);
                (0, _fileSaver.saveAs)(response.url, _fileName);
              }
            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function saveFile(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var baseClasses = 'SortableItem rfb-item';
  var name = props.data.field_name;
  var fileInputStyle = fileUpload ? {
    display: 'none'
  } : null;
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), props.read_only === true && props.defaultValue && props.defaultValue.length > 0 ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    className: "btn btn-default",
    onClick: saveFile
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "fas fa-download"
  }), " Download File")) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "image-upload-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: fileInputStyle
  }, /*#__PURE__*/_react["default"].createElement("input", {
    name: name,
    type: "file",
    accept: props.data.fileType || '*',
    className: "image-upload",
    onChange: displayFileUpload
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "image-upload-control"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "btn btn-default"
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "fas fa-file"
  }), " Upload File"), /*#__PURE__*/_react["default"].createElement("p", null, "Select a file from your computer or device."))), fileUpload && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "file-upload-preview"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'inline-block',
      marginRight: '5px'
    }
  }, "Name: ".concat(fileUpload.name)), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'inline-block',
      marginLeft: '5px'
    }
  }, fileUpload.size.length > 6 ? "Size:  ".concat(Math.ceil(fileUpload.size / (1024 * 1024)), " mb") : "Size:  ".concat(Math.ceil(fileUpload.size / 1024), " kb"))), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
    className: "btn btn-file-upload-clear",
    onClick: clearFileUpload
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "fas fa-times"
  }), " Clear File")))));
};
var Range = function Range(props) {
  var handleChange = props.handleChange;
  var _React$useState11 = _react["default"].useState(props.defaultValue !== undefined ? parseInt(props.defaultValue, 10) : parseInt(props.data.default_value, 10)),
    _React$useState12 = (0, _slicedToArray2["default"])(_React$useState11, 2),
    value = _React$useState12[0],
    setValue = _React$useState12[1];
  var changeValue = function changeValue(e) {
    var target = e.target;
    setValue(target.value);
    handleChange(e);
  };
  var name = props.data.field_name;
  var rangeProps = {
    type: 'range',
    list: "tickmarks_".concat(name),
    min: props.data.min_value,
    max: props.data.max_value,
    step: props.data.step,
    value: value,
    change: changeValue
  };
  var datalist = [];
  for (var i = parseInt(rangeProps.min, 10); i <= parseInt(rangeProps.max, 10); i += parseInt(rangeProps.step, 10)) {
    datalist.push(i);
  }
  var oneBig = 100 / (datalist.length - 1);
  var _datalist = datalist.map(function (d, idx) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: "".concat(rangeProps.list, "_").concat(idx)
    }, d);
  });
  var visible_marks = datalist.map(function (d, idx) {
    var option_props = {};
    var w = oneBig;
    if (idx === 0 || idx === datalist.length - 1) {
      w = oneBig / 2;
    }
    option_props.key = "".concat(rangeProps.list, "_label_").concat(idx);
    option_props.style = {
      width: "".concat(w, "%")
    };
    if (idx === datalist.length - 1) {
      option_props.style = {
        width: "".concat(w, "%"),
        textAlign: 'right'
      };
    }
    return /*#__PURE__*/_react["default"].createElement("label", option_props, d);
  });
  if (props.read_only) {
    rangeProps.disabled = 'disabled';
  }
  var baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "range"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "clearfix"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "float-left"
  }, props.data.min_label), /*#__PURE__*/_react["default"].createElement("span", {
    className: "float-right"
  }, props.data.max_label)), /*#__PURE__*/_react["default"].createElement(_reactBootstrapSlider["default"], rangeProps)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "visible_marks"
  }, visible_marks), /*#__PURE__*/_react["default"].createElement("input", {
    name: name,
    value: value,
    type: "hidden"
  }), /*#__PURE__*/_react["default"].createElement("datalist", {
    id: rangeProps.list
  }, _datalist)));
};
FormElements.Header = Header;
FormElements.Paragraph = Paragraph;
FormElements.Label = Label;
FormElements.LineBreak = LineBreak;
FormElements.TextInput = TextInput;
FormElements.EmailInput = EmailInput;
FormElements.PhoneNumber = PhoneNumber;
FormElements.NumberInput = NumberInput;
FormElements.TextArea = TextArea;
FormElements.DataSource = _datasource["default"];
FormElements.Table = _table["default"];
FormElements.Dropdown = Dropdown;
FormElements.Signature = Signature;
FormElements.Checkboxes = Checkboxes;
FormElements.DatePicker = _datePicker["default"];
FormElements.RadioButtons = RadioButtons;
FormElements.Image = Image;
FormElements.Rating = Rating;
FormElements.Tags = Tags;
FormElements.HyperLink = HyperLink;
FormElements.Download = Download;
FormElements.Camera = Camera;
FormElements.FileUpload = FileUpload;
FormElements.Range = Range;
FormElements.Signature2 = _signature["default"];
FormElements.Section = _section["default"];
var _default = FormElements;
exports["default"] = _default;