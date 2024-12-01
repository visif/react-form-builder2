"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _reactIntl = require("react-intl");
var _functions = require("./functions");
var _store = _interopRequireDefault(require("./stores/store"));
var _toolbarDraggableItem = _interopRequireDefault(require("./toolbar-draggable-item"));
var _toolbarGroupItem = _interopRequireDefault(require("./toolbar-group-item"));
var _UUID = _interopRequireDefault(require("./UUID"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function buildItems(items, defaultItems) {
  if (!items) {
    return defaultItems;
  }
  return items.map(function (x) {
    var found = defaultItems.find(function (y) {
      return x.element === y.element && y.key === x.key;
    });
    if (!found) {
      found = defaultItems.find(function (y) {
        return (x.element || x.key) === (y.element || y.key);
      });
    }
    if (found) {
      if (x.inherited !== false) {
        found = _objectSpread(_objectSpread({}, found), x);
      } else if (x.group_name) {
        found.group_name = x.group_name;
      }
    }
    return found || x;
  });
}
function buildGroupItems(allItems) {
  if (!Array.isArray(allItems)) {
    return null;
  }
  var items = allItems === null || allItems === void 0 ? void 0 : allItems.filter(function (x) {
    return !x.group_name;
  });
  var gItems = allItems === null || allItems === void 0 ? void 0 : allItems.filter(function (x) {
    return !!x.group_name;
  });
  var grouped = (0, _functions.groupBy)(gItems, function (x) {
    return x.group_name;
  });
  var groupKeys = gItems.map(function (x) {
    return x.group_name;
  }).filter(function (v, i, self) {
    return self.indexOf(v) === i;
  });
  return {
    items: items,
    grouped: grouped,
    groupKeys: groupKeys
  };
}
var defaultItems = function defaultItems(intl) {
  return [{
    key: 'Header',
    name: intl.formatMessage({
      id: 'header-text'
    }),
    icon: 'fas fa-heading',
    "static": true,
    content: intl.formatMessage({
      id: 'place-holder-text'
    })
  }, {
    key: 'Label',
    name: intl.formatMessage({
      id: 'label'
    }),
    "static": true,
    icon: 'fas fa-font',
    content: intl.formatMessage({
      id: 'place-holder-text'
    })
  }, {
    key: 'Paragraph',
    name: intl.formatMessage({
      id: 'paragraph'
    }),
    "static": true,
    icon: 'fas fa-paragraph',
    content: intl.formatMessage({
      id: 'place-holder-text'
    })
  }, {
    key: 'LineBreak',
    name: intl.formatMessage({
      id: 'line-break'
    }),
    "static": true,
    icon: 'fas fa-arrows-alt-h'
  }, {
    key: 'Dropdown',
    canHaveAnswer: true,
    name: intl.formatMessage({
      id: 'dropdown'
    }),
    icon: 'far fa-caret-square-down',
    label: intl.formatMessage({
      id: 'place-holder-label'
    }),
    field_name: 'dropdown_',
    options: []
  }, {
    key: 'Tags',
    canHaveAnswer: true,
    name: intl.formatMessage({
      id: 'tags'
    }),
    icon: 'fas fa-tags',
    label: intl.formatMessage({
      id: 'place-holder-label'
    }),
    field_name: 'tags_',
    options: []
  }, {
    key: 'Checkboxes',
    canHaveAnswer: true,
    canHaveInfo: true,
    name: intl.formatMessage({
      id: 'checkboxes'
    }),
    icon: 'far fa-check-square',
    label: intl.formatMessage({
      id: 'place-holder-label'
    }),
    field_name: 'checkboxes_',
    options: []
  }, {
    key: 'RadioButtons',
    canHaveAnswer: true,
    canHaveInfo: true,
    name: intl.formatMessage({
      id: 'multiple-choice'
    }),
    icon: 'far fa-dot-circle',
    label: intl.formatMessage({
      id: 'place-holder-label'
    }),
    field_name: 'radiobuttons_',
    options: []
  }, {
    key: 'TextInput',
    canHaveAnswer: true,
    name: intl.formatMessage({
      id: 'text-input'
    }),
    label: intl.formatMessage({
      id: 'place-holder-label'
    }),
    icon: 'fas fa-font',
    field_name: 'text_input_'
  }, {
    key: 'EmailInput',
    canHaveAnswer: true,
    name: intl.formatMessage({
      id: 'email-input'
    }),
    label: intl.formatMessage({
      id: 'place-holder-email'
    }),
    icon: 'fas fa-envelope',
    field_name: 'email_input_'
  }, {
    key: 'NumberInput',
    canHaveAnswer: true,
    name: intl.formatMessage({
      id: 'number-input'
    }),
    label: intl.formatMessage({
      id: 'place-holder-label'
    }),
    icon: 'fas fa-plus',
    field_name: 'number_input_'
  }, {
    key: 'PhoneNumber',
    canHaveAnswer: true,
    name: intl.formatMessage({
      id: 'phone-input'
    }),
    label: intl.formatMessage({
      id: 'place-holder-phone-number'
    }),
    icon: 'fas fa-phone',
    field_name: 'phone_input_'
  }, {
    key: 'TextArea',
    canHaveAnswer: true,
    name: intl.formatMessage({
      id: 'multi-line-input'
    }),
    label: intl.formatMessage({
      id: 'place-holder-label'
    }),
    icon: 'fas fa-text-height',
    field_name: 'text_area_'
  }, {
    key: 'DataSource',
    name: 'DataSource',
    icon: 'fa fa-database',
    field_name: 'data_source_',
    sourceType: 'name',
    formSource: '',
    formField: {},
    canHaveAnswer: true,
    label: 'Placeholder Label'
  }, {
    key: 'Table',
    name: 'Table',
    icon: 'fas fa-table',
    field_name: 'tables_',
    columns: [],
    rowLabels: [],
    rows: 3
  }, {
    key: 'FieldSet',
    canHaveAnswer: false,
    name: intl.formatMessage({
      id: 'fieldset'
    }),
    label: intl.formatMessage({
      id: 'fieldset'
    }),
    icon: 'fas fa-bars'
    // field_name: 'fieldset-element',
  }, {
    key: 'TwoColumnRow',
    canHaveAnswer: false,
    name: intl.formatMessage({
      id: 'two-columns-row'
    }),
    label: '',
    icon: 'fas fa-columns'
    // field_name: 'two_col_row_',
  }, {
    key: 'ThreeColumnRow',
    canHaveAnswer: false,
    name: intl.formatMessage({
      id: 'three-columns-row'
    }),
    label: '',
    icon: 'fas fa-columns'
    // field_name: 'three_col_row_',
  }, {
    key: 'FourColumnRow',
    element: 'MultiColumnRow',
    canHaveAnswer: false,
    name: intl.formatMessage({
      id: 'four-columns-row'
    }),
    label: '',
    icon: 'fas fa-columns',
    // field_name: 'four_col_row_',
    col_count: 4,
    class_name: 'col-md-3'
  }, {
    key: 'FiveColumnRow',
    element: 'MultiColumnRow',
    canHaveAnswer: false,
    name: intl.formatMessage({
      id: 'five-columns-row'
    }),
    label: '',
    icon: 'fas fa-columns',
    // field_name: 'five_col_row_',
    col_count: 5,
    class_name: 'col'
  }, {
    key: 'SixColumnRow',
    element: 'MultiColumnRow',
    canHaveAnswer: false,
    name: intl.formatMessage({
      id: 'six-columns-row'
    }),
    label: '',
    icon: 'fas fa-columns',
    // field_name: 'six_col_row_',
    col_count: 6,
    class_name: 'col-md-2'
  }, {
    key: 'Image',
    name: intl.formatMessage({
      id: 'image'
    }),
    label: '',
    icon: 'far fa-image',
    field_name: 'image_',
    src: ''
  }, {
    key: 'Rating',
    canHaveAnswer: true,
    name: intl.formatMessage({
      id: 'rating'
    }),
    label: intl.formatMessage({
      id: 'place-holder-label'
    }),
    icon: 'fas fa-star',
    field_name: 'rating_'
  }, {
    key: 'DatePicker',
    canDefaultToday: true,
    canReadOnly: true,
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm:ss',
    showTimeSelect: false,
    showTimeSelectOnly: false,
    showTimeInput: false,
    name: intl.formatMessage({
      id: 'date'
    }),
    icon: 'far fa-calendar-alt',
    label: intl.formatMessage({
      id: 'place-holder-label'
    }),
    field_name: 'date_picker_'
  }, {
    key: 'Signature',
    canReadOnly: true,
    name: intl.formatMessage({
      id: 'signature'
    }),
    icon: 'fas fa-pen-square',
    label: intl.formatMessage({
      id: 'signature'
    }),
    field_name: 'signature_'
  }, {
    key: 'Signature2',
    name: 'Signature',
    icon: 'fas fa-signature',
    field_name: 'signature2_',
    position: 'Placeholder Text',
    specificRole: 'specific'
  }, {
    key: 'HyperLink',
    name: intl.formatMessage({
      id: 'website'
    }),
    icon: 'fas fa-link',
    "static": true,
    content: intl.formatMessage({
      id: 'place-holder-website-link'
    }),
    href: 'http://www.example.com'
  }, {
    key: 'Download',
    name: intl.formatMessage({
      id: 'file-attachment'
    }),
    icon: 'fas fa-file',
    "static": true,
    content: intl.formatMessage({
      id: 'place-holder-file-name'
    }),
    field_name: 'download_',
    file_path: '',
    _href: ''
  }, {
    key: 'Range',
    name: intl.formatMessage({
      id: 'range'
    }),
    icon: 'fas fa-sliders-h',
    label: intl.formatMessage({
      id: 'place-holder-label'
    }),
    field_name: 'range_',
    step: 1,
    default_value: 3,
    min_value: 1,
    max_value: 5,
    min_label: intl.formatMessage({
      id: 'easy'
    }),
    max_label: intl.formatMessage({
      id: 'difficult'
    })
  }, {
    key: 'Section',
    name: 'Section',
    icon: 'fas fa-cut',
    field_name: 'section_',
    header: 'Placeholder Text'
  }, {
    key: 'Camera',
    name: intl.formatMessage({
      id: 'camera'
    }),
    icon: 'fas fa-camera',
    label: intl.formatMessage({
      id: 'place-holder-label'
    }),
    field_name: 'camera_'
  }, {
    key: 'FileUpload',
    name: intl.formatMessage({
      id: 'file-upload'
    }),
    icon: 'fas fa-file',
    label: intl.formatMessage({
      id: 'place-holder-label'
    }),
    field_name: 'file_upload_'
  }];
};
var Toolbar = function Toolbar(_ref) {
  var intl = _ref.intl,
    propsItems = _ref.items;
  var _useState = (0, _react.useState)(buildItems(propsItems, defaultItems(intl))),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 1),
    items = _useState2[0];
  var _defaultItemOptions = function _defaultItemOptions(element) {
    switch (element) {
      case 'Dropdown':
        return [{
          value: '1',
          text: intl.formatMessage({
            id: 'place-holder-option-1'
          }),
          key: "dropdown_option_".concat(_UUID["default"].uuid())
        }, {
          value: '2',
          text: intl.formatMessage({
            id: 'place-holder-option-2'
          }),
          key: "dropdown_option_".concat(_UUID["default"].uuid())
        }, {
          value: '3',
          text: intl.formatMessage({
            id: 'place-holder-option-3'
          }),
          key: "dropdown_option_".concat(_UUID["default"].uuid())
        }];
      case 'Tags':
        return [{
          value: '1',
          text: intl.formatMessage({
            id: 'place-holder-tag-1'
          }),
          key: "tags_option_".concat(_UUID["default"].uuid())
        }, {
          value: '2',
          text: intl.formatMessage({
            id: 'place-holder-tag-2'
          }),
          key: "tags_option_".concat(_UUID["default"].uuid())
        }, {
          value: '3',
          text: intl.formatMessage({
            id: 'place-holder-tag-3'
          }),
          key: "tags_option_".concat(_UUID["default"].uuid())
        }];
      case 'Checkboxes':
        return [{
          value: '1',
          text: intl.formatMessage({
            id: 'place-holder-option-1'
          }),
          key: "checkboxes_option_".concat(_UUID["default"].uuid())
        }, {
          value: '2',
          text: intl.formatMessage({
            id: 'place-holder-option-2'
          }),
          key: "checkboxes_option_".concat(_UUID["default"].uuid())
        }, {
          value: '3',
          text: intl.formatMessage({
            id: 'place-holder-option-3'
          }),
          key: "checkboxes_option_".concat(_UUID["default"].uuid())
        }];
      case 'RadioButtons':
        return [{
          value: 'place_holder_option_1',
          text: intl.formatMessage({
            id: 'place-holder-option-1'
          }),
          key: "radiobuttons_option_".concat(_UUID["default"].uuid())
        }, {
          value: 'place_holder_option_2',
          text: intl.formatMessage({
            id: 'place-holder-option-2'
          }),
          key: "radiobuttons_option_".concat(_UUID["default"].uuid())
        }, {
          value: 'place_holder_option_3',
          text: intl.formatMessage({
            id: 'place-holder-option-3'
          }),
          key: "radiobuttons_option_".concat(_UUID["default"].uuid())
        }];
      default:
        return [];
    }
  };
  var addCustomOptions = function addCustomOptions(item, elementOptions) {
    if (item.type === 'custom') {
      var customOptions = _objectSpread(_objectSpread({}, item), elementOptions);
      customOptions.custom = true;
      customOptions.component = item.component || null;
      customOptions.custom_options = item.custom_options || [];
      return customOptions;
    }
    return elementOptions;
  };
  var create = function create(item) {
    var elementKey = item.element || item.key;
    var elementOptions = addCustomOptions(item, {
      id: _UUID["default"].uuid(),
      element: elementKey,
      text: item.name,
      group_name: item.group_name,
      "static": item["static"],
      required: false,
      showDescription: item.showDescription
    });
    if (item["static"]) {
      elementOptions.bold = false;
      elementOptions.italic = false;
    }
    if (item.canHaveAnswer) {
      elementOptions.canHaveAnswer = item.canHaveAnswer;
    }
    if (item.canHaveInfo) {
      elementOptions.canHaveInfo = item.canHaveInfo;
    }
    if (item.canReadOnly) {
      elementOptions.readOnly = false;
    }
    if (item.canDefaultToday) {
      elementOptions.defaultToday = false;
    }
    if (item.content) {
      elementOptions.content = item.content;
    }
    if (item.href) {
      elementOptions.href = item.href;
    }
    if (item.inherited !== undefined) {
      elementOptions.inherited = item.inherited;
    }
    elementOptions.canHavePageBreakBefore = item.canHavePageBreakBefore !== false;
    elementOptions.canHaveAlternateForm = item.canHaveAlternateForm !== false;
    elementOptions.canHaveDisplayHorizontal = item.canHaveDisplayHorizontal !== false;
    if (elementOptions.canHaveDisplayHorizontal) {
      elementOptions.inline = item.inline;
    }
    elementOptions.canHaveOptionCorrect = item.canHaveOptionCorrect !== false;
    elementOptions.canHaveOptionValue = item.canHaveOptionValue !== false;
    elementOptions.canPopulateFromApi = item.canPopulateFromApi !== false;
    if (item.class_name) {
      elementOptions.class_name = item.class_name;
    }
    if (elementKey === 'Image') {
      elementOptions.src = item.src;
      elementOptions.width = item.src.width || 100;
      elementOptions.height = item.src.height || 100;
    }
    if (elementKey === 'DatePicker') {
      elementOptions.dateFormat = item.dateFormat;
      elementOptions.timeFormat = item.timeFormat;
      elementOptions.showTimeSelect = item.showTimeSelect;
      elementOptions.showTimeSelectOnly = item.showTimeSelectOnly;
      elementOptions.showTimeInput = item.showTimeInput;
    }
    if (elementKey === 'Download') {
      elementOptions._href = item._href;
      elementOptions.file_path = item.file_path;
    }
    if (elementKey === 'Range') {
      elementOptions.step = item.step;
      elementOptions.default_value = item.default_value;
      elementOptions.min_value = item.min_value;
      elementOptions.max_value = item.max_value;
      elementOptions.min_label = item.min_label;
      elementOptions.max_label = item.max_label;
    }
    if (item.element === 'MultiColumnRow') {
      elementOptions.col_count = item.col_count;
    }
    if (item.key === 'DataSource') {
      elementOptions.sourceType = item.sourceType;
      elementOptions.formSource = item.formSource;
      elementOptions.formField = item.formField || {};
    }
    if (item.key === 'Signature2') {
      elementOptions.position = 'Placeholder Text';
      elementOptions.specificRole = 'specific';
    }
    if (item.key === 'Section') {
      elementOptions.header = 'Placeholder Text';
    }
    if (item.defaultValue) {
      elementOptions.defaultValue = item.defaultValue;
    }
    if (item.field_name) {
      elementOptions.field_name = item.field_name + _UUID["default"].uuid();
    }
    if (item.label) {
      elementOptions.label = item.label;
    }
    if (item.options) {
      if (item.options.length > 0) {
        elementOptions.options = item.options.map(function (x) {
          return _objectSpread(_objectSpread({}, x), {}, {
            key: "custom_option_".concat(_UUID["default"].uuid())
          });
        });
      } else {
        elementOptions.options = _defaultItemOptions(elementOptions.element);
      }
    }
    if (item.key === 'Table') {
      var _item$rowLabels;
      if (item.columns.length > 0) {
        elementOptions.columns = item.columns;
      } else {
        elementOptions.columns = [{
          text: 'Column1',
          key: "table_column_".concat(_UUID["default"].uuid()),
          width: 1
        }, {
          text: 'Column2',
          key: "table_column_".concat(_UUID["default"].uuid()),
          width: 1
        }, {
          text: 'Column3',
          key: "table_column_".concat(_UUID["default"].uuid()),
          width: 1
        }];
      }
      if (((_item$rowLabels = item.rowLabels) === null || _item$rowLabels === void 0 ? void 0 : _item$rowLabels.length) > 0) {
        elementOptions.rowLabels = item.rowLabels;
      } else {
        elementOptions.rowLabels = [];
      }
      elementOptions.rows = item.rows || 3;
    }
    return elementOptions;
  };
  var _onClick = function _onClick(item) {
    _store["default"].dispatch('create', create(item));
  };
  var renderItem = function renderItem(item) {
    return /*#__PURE__*/_react["default"].createElement(_toolbarDraggableItem["default"], {
      data: item,
      key: item.key,
      onClick: function onClick() {
        return _onClick(item);
      },
      onCreate: create
    });
  };
  var _buildGroupItems = buildGroupItems(items),
    groupedItems = _buildGroupItems.items,
    grouped = _buildGroupItems.grouped,
    groupKeys = _buildGroupItems.groupKeys;

  // TODO: to reccheck this useEffect
  (0, _react.useEffect)(function () {
    // store.subscribe((state) => setItems(state));
    // const unsubscribe = store.subscribe((state) => setItems(state));
    // return () => unsubscribe && unsubscribe();
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-form-builder-toolbar float-right"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "toolbar-header",
    style: {
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      zIndex: 1
    }
  }, /*#__PURE__*/_react["default"].createElement("h4", null, intl.formatMessage({
    id: 'toolbox'
  }))), /*#__PURE__*/_react["default"].createElement("ul", null, groupedItems.map(renderItem), groupKeys.map(function (k) {
    return /*#__PURE__*/_react["default"].createElement(_toolbarGroupItem["default"], {
      key: k,
      name: k,
      group: grouped.get(k),
      renderItem: renderItem
    });
  })));
};
var _default = (0, _reactIntl.injectIntl)(Toolbar);
exports["default"] = _default;