"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _reactDraftWysiwyg = require("react-draft-wysiwyg");
var _reactTextareaAutosize = _interopRequireDefault(require("react-textarea-autosize"));
var _draftJs = require("draft-js");
var _draftjsToHtml = _interopRequireDefault(require("draftjs-to-html"));
var _dynamicColumnList = _interopRequireDefault(require("./dynamic-column-list"));
var _dynamicOptionList = _interopRequireDefault(require("./dynamic-option-list"));
var _fixedRowList = _interopRequireDefault(require("./fixed-row-list"));
var _IntlMessages = _interopRequireDefault(require("./language-provider/IntlMessages"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var toolbar = {
  options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ['bold', 'italic', 'underline', 'superscript', 'subscript']
  }
};
var FormElementsEdit = function FormElementsEdit(props) {
  var _props$preview, _props$preview$state, _props$preview2, _props$preview2$state, _props$preview3, _props$preview3$state;
  var _useState = (0, _react.useState)(props.element),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    element = _useState2[0],
    setElement = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    dirty = _useState4[0],
    setDirty = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
    formDataSource = _useState6[0],
    setFormDataSource = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
    activeForm = _useState8[0],
    setActiveForm = _useState8[1];
  (0, _react.useEffect)(function () {
    setElement(props.element);
  }, [props.element]);
  var updateElement = function updateElement() {
    var updatedElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : element;
    if (dirty) {
      props.updateElement.call(props.preview, updatedElement);
      setDirty(false);
    }
  };
  var editElementProp = function editElementProp(elemProperty, targProperty, e) {
    var updatedElement = _objectSpread(_objectSpread({}, element), {}, (0, _defineProperty2["default"])({}, elemProperty, e.target[targProperty]));
    setElement(updatedElement);
    setDirty(true);
    if (targProperty === 'checked') {
      updateElement(updatedElement);
    }
  };
  var _onEditorStateChange = function onEditorStateChange(index, property, editorContent) {
    var html = (0, _draftjsToHtml["default"])((0, _draftJs.convertToRaw)(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/&nbsp;/g, ' ').replace(/(?:\r\n|\r|\n)/g, ' ');
    var updatedElement = _objectSpread(_objectSpread({}, element), {}, (0, _defineProperty2["default"])({}, property, html));
    setElement(updatedElement);
    setDirty(true);
  };
  var convertFromHTMLContent = function convertFromHTMLContent(content) {
    var newContent = (0, _draftJs.convertFromHTML)(content);
    if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
      return _draftJs.EditorState.createEmpty();
    }
    var contentState = _draftJs.ContentState.createFromBlockArray(newContent);
    return _draftJs.EditorState.createWithContent(contentState);
  };
  var onUploadFile = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(event) {
      var thisElement, file, imageUrl, reader, _thisElement;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!event || !event.target || !event.target.files || !props.onImageUpload)) {
                _context.next = 3;
                break;
              }
              if (!props.onImageUpload) {
                thisElement = element;
                thisElement.src = 'Please provide upload callback';
                setElement(thisElement);
              }
              return _context.abrupt("return");
            case 3:
              _context.prev = 3;
              file = event.target.files[0];
              _context.next = 7;
              return props.onImageUpload(file, element.id);
            case 7:
              imageUrl = _context.sent;
              reader = new FileReader();
              reader.onload = function readerOnLoad() {
                var img = new Image();
                img.onload = function imgOnLoad() {
                  var thisElement = element;
                  thisElement.width = img.width;
                  thisElement.height = img.height;
                  thisElement.src = imageUrl;
                  setElement(thisElement);
                  props.updateElement.call(props.preview, thisElement);
                };
                img.src = reader.result;
              };
              reader.readAsDataURL(file);
              _context.next = 19;
              break;
            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](3);
              console.error('error upload', _context.t0);
              _thisElement = element;
              _thisElement.src = 'cannot upload file';
              setElement(_thisElement);
            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 13]]);
    }));
    return function onUploadFile(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var canHaveDisplayHorizontal = element.canHaveDisplayHorizontal,
    canHaveOptionCorrect = element.canHaveOptionCorrect,
    canHaveOptionValue = element.canHaveOptionValue;
  var thisFiles = props.files.length ? props.files : [];
  if (thisFiles.length < 1 || thisFiles.length > 0 && thisFiles[0].id !== '') {
    thisFiles.unshift({
      id: '',
      file_name: ''
    });
  }
  var editorState;
  if (Object.prototype.hasOwnProperty.call(element, 'content')) {
    editorState = convertFromHTMLContent(element.content);
  }
  if (Object.prototype.hasOwnProperty.call(element, 'label')) {
    editorState = convertFromHTMLContent(element.label);
  }
  var checked_bold = element.bold || false;
  var checked_italic = element.italic || false;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "clearfix"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "float-left"
  }, element.text), /*#__PURE__*/_react["default"].createElement("i", {
    className: "float-right fas fa-times dismiss-edit",
    onClick: props.manualEditModeOff
  })), Object.prototype.hasOwnProperty.call(element, 'content') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label"
  }, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "text-to-display"
  }), ":"), /*#__PURE__*/_react["default"].createElement(_reactDraftWysiwyg.Editor, {
    toolbar: toolbar,
    defaultEditorState: editorState,
    onBlur: function onBlur() {
      return updateElement();
    },
    onEditorStateChange: function onEditorStateChange(editorContent) {
      return (
        // eslint-disable-next-line implicit-arrow-linebreak
        _onEditorStateChange(0, 'content', editorContent)
      );
    },
    stripPastedStyles: true
  })), Object.prototype.hasOwnProperty.call(element, 'file_path') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "fileSelect"
  }, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "choose-file"
  }), ":"), /*#__PURE__*/_react["default"].createElement("select", {
    id: "fileSelect",
    className: "form-control",
    defaultValue: element.file_path,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('file_path', 'value', e);
    }
  }, thisFiles.map(function (file) {
    var thisKey = "file_".concat(file.id);
    return /*#__PURE__*/_react["default"].createElement("option", {
      value: file.id,
      key: thisKey
    }, file.file_name);
  }))), Object.prototype.hasOwnProperty.call(element, 'href') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_reactTextareaAutosize["default"], {
    type: "text",
    className: "form-control",
    defaultValue: element.href,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('href', 'value', e);
    }
  })), Object.prototype.hasOwnProperty.call(element, 'src') && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "srcImage",
    type: "file",
    onChange: function onChange(e) {
      return onUploadFile(e);
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "srcInput"
  }, "Link to:"), /*#__PURE__*/_react["default"].createElement("input", {
    id: "srcInput",
    type: "text",
    className: "form-control",
    value: element.src,
    defaultValue: element.src,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('src', 'value', e);
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "custom-control custom-checkbox"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "do-center",
    className: "custom-control-input",
    type: "checkbox",
    checked: element.center || false,
    value: true,
    onChange: function onChange(e) {
      return editElementProp('center', 'checked', e);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", {
    className: "custom-control-label",
    htmlFor: "do-center"
  }, "Center?"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-sm-3"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "elementWidth"
  }, "Width:"), /*#__PURE__*/_react["default"].createElement("input", {
    id: "elementWidth",
    type: "text",
    className: "form-control",
    value: element.width,
    defaultValue: element.width,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('width', 'value', e);
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-sm-3"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "elementHeight"
  }, "Height:"), /*#__PURE__*/_react["default"].createElement("input", {
    id: "elementHeight",
    type: "text",
    className: "form-control",
    value: element.height,
    defaultValue: element.height,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('height', 'value', e);
    }
  })))), (Object.prototype.hasOwnProperty.call(element, 'label') || element.element === 'Signature2') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, element.element !== 'Signature2' && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("label", null, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "display-label"
  })), /*#__PURE__*/_react["default"].createElement(_reactDraftWysiwyg.Editor, {
    toolbar: toolbar,
    defaultEditorState: editorState,
    onBlur: function onBlur() {
      return updateElement();
    },
    onEditorStateChange: function onEditorStateChange(editorContent) {
      return _onEditorStateChange(0, 'label', editorContent);
    },
    stripPastedStyles: true
  }), /*#__PURE__*/_react["default"].createElement("br", null)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "custom-control custom-checkbox"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "is-required",
    className: "custom-control-input",
    type: "checkbox",
    checked: element.required || false,
    value: true,
    onChange: function onChange(e) {
      return editElementProp('required', 'checked', e);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", {
    className: "custom-control-label",
    htmlFor: "is-required"
  }, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "required"
  }))), Object.prototype.hasOwnProperty.call(element, 'readOnly') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "custom-control custom-checkbox"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "is-read-only",
    className: "custom-control-input",
    type: "checkbox",
    checked: element.readOnly || false,
    value: true,
    onChange: function onChange(e) {
      return editElementProp('readOnly', 'checked', e);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", {
    className: "custom-control-label",
    htmlFor: "is-read-only"
  }, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "read-only"
  }))), Object.prototype.hasOwnProperty.call(element, 'defaultToday') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "custom-control custom-checkbox"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "is-default-to-today",
    className: "custom-control-input",
    type: "checkbox",
    checked: element.defaultToday || false,
    value: true,
    onChange: function onChange(e) {
      return editElementProp('defaultToday', 'checked', e);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", {
    className: "custom-control-label",
    htmlFor: "is-default-to-today"
  }, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "default-to-today"
  }), "?")), Object.prototype.hasOwnProperty.call(element, 'showTimeSelect') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "custom-control custom-checkbox"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "show-time-select",
    className: "custom-control-input",
    type: "checkbox",
    checked: element.showTimeSelect || false,
    value: true,
    onChange: function onChange(e) {
      return editElementProp('showTimeSelect', 'checked', e);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", {
    className: "custom-control-label",
    htmlFor: "show-time-select"
  }, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "show-time-select"
  }), "?")), element.showTimeSelect && Object.prototype.hasOwnProperty.call(element, 'showTimeSelectOnly') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "custom-control custom-checkbox"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "show-time-select-only",
    className: "custom-control-input",
    type: "checkbox",
    checked: element.showTimeSelectOnly || false,
    value: true,
    onChange: function onChange(e) {
      return editElementProp('showTimeSelectOnly', 'checked', e);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", {
    className: "custom-control-label",
    htmlFor: "show-time-select-only"
  }, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "show-time-select-only"
  }), "?")), Object.prototype.hasOwnProperty.call(element, 'showTimeInput') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "custom-control custom-checkbox"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "show-time-input",
    className: "custom-control-input",
    type: "checkbox",
    checked: element.showTimeInput || false,
    value: true,
    onChange: function onChange(e) {
      return editElementProp('showTimeInput', 'checked', e);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", {
    className: "custom-control-label",
    htmlFor: "show-time-input"
  }, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "show-time-input"
  }), "?")), (element.element === 'RadioButtons' || element.element === 'Checkboxes') && canHaveDisplayHorizontal && /*#__PURE__*/_react["default"].createElement("div", {
    className: "custom-control custom-checkbox"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "display-horizontal",
    className: "custom-control-input",
    type: "checkbox",
    checked: element.inline || false,
    value: true,
    onChange: function onChange(e) {
      return editElementProp('inline', 'checked', e);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", {
    className: "custom-control-label",
    htmlFor: "display-horizontal"
  }, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
    id: "display-horizontal"
  })))), element.element === 'Signature' && element.readOnly ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "variableKey"
  }, "Variable Key:"), /*#__PURE__*/_react["default"].createElement("input", {
    id: "variableKey",
    type: "text",
    className: "form-control",
    defaultValue: element.variableKey,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('variableKey', 'value', e);
    }
  }), /*#__PURE__*/_react["default"].createElement("p", {
    className: "help-block"
  }, "This will give the element a key that can be used to replace the content with a runtime value.")) : /*#__PURE__*/_react["default"].createElement("div", null), Object.prototype.hasOwnProperty.call(element, 'step') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group-range"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "rangeStep"
  }, "Step"), /*#__PURE__*/_react["default"].createElement("input", {
    id: "rangeStep",
    type: "number",
    className: "form-control",
    defaultValue: element.step,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('step', 'value', e);
    }
  }))), Object.prototype.hasOwnProperty.call(element, 'min_value') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group-range"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "rangeMin"
  }, "Min"), /*#__PURE__*/_react["default"].createElement("input", {
    id: "rangeMin",
    type: "number",
    className: "form-control",
    defaultValue: element.min_value,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('min_value', 'value', e);
    }
  }), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    className: "form-control",
    defaultValue: element.min_label,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('min_label', 'value', e);
    }
  }))), Object.prototype.hasOwnProperty.call(element, 'max_value') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group-range"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "rangeMax"
  }, "Max"), /*#__PURE__*/_react["default"].createElement("input", {
    id: "rangeMax",
    type: "number",
    className: "form-control",
    defaultValue: element.max_value,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('max_value', 'value', e);
    }
  }), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    className: "form-control",
    defaultValue: element.max_label,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('max_label', 'value', e);
    }
  }))), Object.prototype.hasOwnProperty.call(element, 'default_value') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group-range"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "defaultSelected"
  }, "Default Selected"), /*#__PURE__*/_react["default"].createElement("input", {
    id: "defaultSelected",
    type: "number",
    className: "form-control",
    defaultValue: element.default_value,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('default_value', 'value', e);
    }
  }))), Object.prototype.hasOwnProperty.call(element, 'static') && element["static"] && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label"
  }, "Text Style"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "custom-control custom-checkbox"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "do-bold",
    className: "custom-control-input",
    type: "checkbox",
    checked: checked_bold,
    value: true,
    onChange: function onChange(e) {
      return editElementProp('bold', 'checked', e);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", {
    className: "custom-control-label",
    htmlFor: "do-bold"
  }, "Bold")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "custom-control custom-checkbox"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "do-italic",
    className: "custom-control-input",
    type: "checkbox",
    checked: checked_italic,
    value: true,
    onChange: function onChange(e) {
      return editElementProp('italic', 'checked', e);
    }
  }), /*#__PURE__*/_react["default"].createElement("label", {
    className: "custom-control-label",
    htmlFor: "do-italic"
  }, "Italic"))), element.showDescription && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "questionDescription"
  }, "Description"), /*#__PURE__*/_react["default"].createElement(_reactTextareaAutosize["default"], {
    type: "text",
    className: "form-control",
    id: "questionDescription",
    defaultValue: element.description,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('description', 'value', e);
    }
  })), props.showCorrectColumn && element.canHaveAnswer && !Object.prototype.hasOwnProperty.call(element, 'options') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "correctAnswer"
  }, "Correct Answer"), /*#__PURE__*/_react["default"].createElement("input", {
    id: "correctAnswer",
    type: "text",
    className: "form-control",
    defaultValue: element.correct,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('correct', 'value', e);
    }
  })), Object.prototype.hasOwnProperty.call(element, 'header') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "header"
  }, "Section Header"), /*#__PURE__*/_react["default"].createElement("input", {
    id: "header",
    type: "text",
    className: "form-control",
    defaultValue: element.header,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('header', 'value', e);
    }
  })), Object.prototype.hasOwnProperty.call(element, 'position') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "position"
  }, "Role / Position"), /*#__PURE__*/_react["default"].createElement("input", {
    id: "position",
    type: "text",
    className: "form-control",
    defaultValue: element.position,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('position', 'value', e);
    }
  })), Object.prototype.hasOwnProperty.call(element, 'specificRole') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label"
  }, "Pre Defined User / Role ", Boolean(element.specificRole)), /*#__PURE__*/_react["default"].createElement("select", {
    className: "form-control",
    id: "specificRole",
    defaultValue: element.specificRole,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('specificRole', 'value', e);
    }
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "specific",
    key: "specific"
  }, "Specific"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "notSpecific",
    key: "notSpecific"
  }, "Not specific"))), Object.prototype.hasOwnProperty.call(element, 'options') && /*#__PURE__*/_react["default"].createElement(_dynamicOptionList["default"], {
    showCorrectColumn: props.showCorrectColumn,
    canHaveOptionCorrect: canHaveOptionCorrect,
    canHaveOptionValue: canHaveOptionValue,
    canHaveInfo: element.canHaveInfo,
    data: (_props$preview = props.preview) === null || _props$preview === void 0 ? void 0 : (_props$preview$state = _props$preview.state) === null || _props$preview$state === void 0 ? void 0 : _props$preview$state.data,
    updateElement: props.updateElement,
    preview: props.preview,
    element: element,
    key: element.options.length
  }), Object.prototype.hasOwnProperty.call(element, 'rows') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "rowInput"
  }, "Row Count"), /*#__PURE__*/_react["default"].createElement("input", {
    id: "rowInput",
    type: "text",
    className: "form-control",
    defaultValue: element.rows,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('rows', 'value', e);
    }
  })), Object.prototype.hasOwnProperty.call(element, 'rowLabels') && /*#__PURE__*/_react["default"].createElement(_fixedRowList["default"], {
    data: (_props$preview2 = props.preview) === null || _props$preview2 === void 0 ? void 0 : (_props$preview2$state = _props$preview2.state) === null || _props$preview2$state === void 0 ? void 0 : _props$preview2$state.data,
    updateElement: props.updateElement,
    preview: props.preview,
    element: element,
    key: "table-row-labels"
  }), Object.prototype.hasOwnProperty.call(element, 'columns') && /*#__PURE__*/_react["default"].createElement(_dynamicColumnList["default"], {
    data: (_props$preview3 = props.preview) === null || _props$preview3 === void 0 ? void 0 : (_props$preview3$state = _props$preview3.state) === null || _props$preview3$state === void 0 ? void 0 : _props$preview3$state.data,
    updateElement: props.updateElement,
    preview: props.preview,
    element: element,
    key: "table-columns"
  }), Object.prototype.hasOwnProperty.call(element, 'sourceType') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "sourceType"
  }, "Source Type"), /*#__PURE__*/_react["default"].createElement("select", {
    className: "form-control",
    id: "sourceType",
    defaultValue: element.sourceType,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('sourceType', 'value', e);
    }
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "name",
    key: "name"
  }, "Name"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "department",
    key: "department"
  }, "Department"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "role",
    key: "role"
  }, "Role"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "form",
    key: "form"
  }, "Form"))), element.sourceType === 'form' && /*#__PURE__*/_react["default"].createElement("div", null, Object.prototype.hasOwnProperty.call(element, 'formSource') && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "formSource"
  }, "Form Source"), /*#__PURE__*/_react["default"].createElement("select", {
    className: "form-control",
    id: "formSource",
    value: element.formSource,
    defaultValue: element.formSource,
    onBlur: function onBlur() {
      return updateElement();
    },
    onChange: function onChange(e) {
      return editElementProp('formSource', 'value', e);
    }
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: -1,
    key: -1
  }, "\" Please select \""), formDataSource && formDataSource.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      value: item.id,
      key: item.id
    }, item.name);
  }))), element.sourceType === 'form' && /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label",
    htmlFor: "formSource"
  }, "Select Fields"), activeForm && activeForm.columns && activeForm.columns.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "custom-control custom-checkbox"
    }, /*#__PURE__*/_react["default"].createElement("input", {
      id: item.field_name,
      className: "custom-control-input",
      type: "checkbox",
      checked: Object.prototype.hasOwnProperty.call(element, "formField".concat(item.field_name)) ? element["formField".concat(item.field_name)] : false,
      value: item.field_name,
      onChange: function onChange(e) {
        return editElementProp("formField".concat(item.field_name), 'checked', e);
      }
    }), /*#__PURE__*/_react["default"].createElement("label", {
      className: "custom-control-label",
      htmlFor: item.field_name
    }, item.label || item.text || ''));
  }))));
};
var _default = FormElementsEdit;
exports["default"] = _default;