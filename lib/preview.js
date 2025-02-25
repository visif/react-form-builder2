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
var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));
var _formDynamicEdit = _interopRequireDefault(require("./form-dynamic-edit"));
var _componentDragLayer = _interopRequireDefault(require("./form-elements/component-drag-layer"));
var _useUndoRedo2 = _interopRequireWildcard(require("./functions/useUndoRedo"));
var _sortableFormElements = _interopRequireDefault(require("./sortable-form-elements"));
var _store = _interopRequireDefault(require("./stores/store"));
var _this = void 0;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var PlaceHolder = _sortableFormElements.default.PlaceHolder;
var Preview = function Preview(props) {
  var onLoad = props.onLoad,
    onPost = props.onPost;
  var _useState = (0, _react.useState)(props.data || []),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var _useState3 = (0, _react.useState)({}),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    setAnswerData = _useState4[1];
  var editForm = (0, _react.useRef)(null);
  var seq = 0;
  var _useUndoRedo = (0, _useUndoRedo2.default)(),
    updateState = _useUndoRedo.updateState;
  var updateElement = function updateElement(element) {
    var found = false;
    var newData = data.map(function (item) {
      if (element.id === item.id) {
        found = true;
        return element;
      }
      return item;
    });
    if (found) {
      seq = seq > 100000 ? 0 : seq + 1;
      _store.default.dispatch('updateOrder', newData);
      setData(newData);
    }
  };
  var manualEditModeOff = (0, _react.useCallback)(function () {
    var editElement = props.editElement;
    if (editElement && editElement.dirty) {
      editElement.dirty = false;
      updateElement(editElement);
    }
    props.manualEditModeOff();
  }, [props]);
  var editModeOff = (0, _react.useCallback)(function (e) {
    if (editForm.current && !editForm.current.contains(e.target)) {
      manualEditModeOff();
    }
  }, [props.editElement]);
  var onChange = function onChange(payload) {
    var _ref = payload || {
        data: [],
        action: _useUndoRedo2.ACTION.UPDATE
      },
      newData = _ref.data,
      action = _ref.action;
    var newAnswerData = {};
    newData.forEach(function (item) {
      if (item && item.readOnly && props.variables[item.variableKey]) {
        newAnswerData[item.field_name] = props.variables[item.variableKey];
      }
    });
    setData(newData);
    setAnswerData(newAnswerData);
    if (action !== _useUndoRedo2.ACTION.UNDO && action !== _useUndoRedo2.ACTION.REDO) {
      updateState(newData);
    }
  };
  (0, _react.useEffect)(function () {
    var url = props.url,
      saveUrl = props.saveUrl,
      saveAlways = props.saveAlways,
      propData = props.data;
    _store.default.setExternalHandler(onLoad, onPost);
    setData(propData || []);
    setAnswerData({});
    _store.default.subscribe(function (state) {
      return onChange(state.payload);
    });
    _store.default.dispatch('load', {
      loadUrl: url,
      saveUrl: saveUrl,
      data: propData || [],
      saveAlways: saveAlways
    });
    document.addEventListener('mousedown', editModeOff);
    return function () {
      document.removeEventListener('mousedown', editModeOff);
    };
  }, [props, editModeOff]);
  var getDataById = function getDataById(id) {
    return data.find(function (x) {
      return x && x.id === id;
    });
  };
  var onDestroy = function onDestroy(item) {
    if (item.childItems) {
      item.childItems.forEach(function (x) {
        var child = getDataById(x);
        if (child) {
          _store.default.dispatch('delete', child);
        }
      });
    }
    _store.default.dispatch('delete', item);
  };
  var swapChildren = function swapChildren(dataList, item, child, col) {
    if (child.col !== undefined && item.id !== child.parentId) {
      return false;
    }
    if (!(child.col !== undefined && child.col !== col && item.childItems[col])) {
      return false;
    }
    var oldId = item.childItems[col];
    var oldItem = getDataById(oldId);
    var oldCol = child.col;
    var updatedItem = _objectSpread({}, item);
    updatedItem.childItems[oldCol] = oldId;
    oldItem.col = oldCol;
    item.childItems[col] = child.id;
    child.col = col;
    _store.default.dispatch('updateOrder', data);
    return true;
  };
  var setAsChild = function setAsChild(item, child, col, isBusy) {
    if (swapChildren(data, item, child, col)) {
      return;
    }
    if (isBusy) {
      return;
    }
    var oldParent = getDataById(child.parentId);
    var oldCol = child.col;
    item.childItems[col] = child.id;
    child.col = col;
    child.parentId = item.id;
    child.parentIndex = data.indexOf(item);
    if (oldParent) {
      oldParent.childItems[oldCol] = null;
    }
    var list = data.filter(function (x) {
      return x && x.parentId === item.id;
    });
    var toRemove = list.filter(function (x) {
      return item.childItems.indexOf(x.id) === -1;
    });
    var newData = data;
    if (toRemove.length) {
      newData = data.filter(function (x) {
        return toRemove.indexOf(x) === -1;
      });
    }
    if (!getDataById(child.id)) {
      newData.push(child);
    }
    _store.default.dispatch('updateOrder', newData);
    setData(newData);
  };
  var removeChild = function removeChild(item, col) {
    var oldId = item.childItems[col];
    var oldItem = getDataById(oldId);
    if (oldItem) {
      var newData = data.filter(function (x) {
        return x !== oldItem;
      });
      item.childItems[col] = null;
      seq = seq > 100000 ? 0 : seq + 1;
      _store.default.dispatch('updateOrder', newData);
      setData(newData);
    }
  };
  var restoreCard = function restoreCard(item, id) {
    var parent = getDataById(item.data.parentId);
    var oldItem = getDataById(id);
    if (parent && oldItem) {
      var newIndex = data.indexOf(oldItem);
      var newData = (0, _toConsumableArray2.default)(data);
      parent.childItems[oldItem.col] = null;
      delete oldItem.parentId;
      delete item.setAsChild;
      delete item.parentIndex;
      item.index = newIndex;
      seq = seq > 100000 ? 0 : seq + 1;
      _store.default.dispatch('updateOrder', newData);
      setData(newData);
    }
  };
  var saveData = function saveData(dragCard, dragIndex, hoverIndex) {
    var newData = (0, _immutabilityHelper.default)(data, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
    });
    setData(newData);
    _store.default.dispatch('updateOrder', newData);
  };
  var insertCard = function insertCard(item, hoverIndex, id) {
    if (id) {
      restoreCard(item, id);
    } else {
      var newData = (0, _toConsumableArray2.default)(data);
      newData.splice(hoverIndex, 0, item);
      saveData(item, hoverIndex, hoverIndex);
      _store.default.dispatch('insertItem', item);
      setData(newData);
    }
  };
  var moveCard = function moveCard(dragIndex, hoverIndex) {
    var dragCard = data[dragIndex];
    saveData(dragCard, dragIndex, hoverIndex);
  };
  var cardPlaceHolder = function cardPlaceHolder(dragIndex, hoverIndex) {
    // Dummy
  };
  var getElement = function getElement(item, index) {
    if (item.custom) {
      if (!item.component || typeof item.component !== 'function') {
        item.component = props.registry.get(item.key);
      }
    }
    var SortableFormElement = _sortableFormElements.default[item.element];
    if (SortableFormElement === null) {
      return null;
    }
    return /*#__PURE__*/_react.default.createElement(SortableFormElement, {
      id: item.id,
      seq: seq,
      index: index,
      moveCard: moveCard,
      insertCard: insertCard,
      mutable: false,
      parent: props.parent,
      editModeOn: props.editModeOn,
      isDraggable: true,
      key: item.id,
      sortData: item.id,
      data: item,
      getDataById: getDataById,
      setAsChild: setAsChild,
      removeChild: removeChild,
      _onDestroy: onDestroy,
      getDataSource: function getDataSource(params) {
        if ((params === null || params === void 0 ? void 0 : params.sourceType) === 'name') {
          return [{
            id: 1,
            name: 'NameA lastNameA'
          }, {
            id: 2,
            name: 'NameB lastNameB'
          }];
        }
        if ((params === null || params === void 0 ? void 0 : params.sourceType) === 'department') {
          return [{
            id: 1,
            name: 'departmentA'
          }, {
            id: 2,
            name: 'departmentB'
          }];
        }
        if ((params === null || params === void 0 ? void 0 : params.sourceType) === 'role') {
          return [{
            id: 1,
            name: 'roleA'
          }, {
            id: 2,
            name: 'roleB'
          }];
        }
        if ((params === null || params === void 0 ? void 0 : params.sourceType) === 'form') {
          return [{
            id: 1,
            name: 'formA'
          }, {
            id: 2,
            name: 'formB'
          }];
        }
        return [];
      }
    });
  };
  var showEditForm = function showEditForm() {
    var handleUpdateElement = function handleUpdateElement(element) {
      return updateElement(element);
    };
    var formElementEditProps = {
      showCorrectColumn: props.showCorrectColumn,
      files: props.files || [],
      manualEditModeOff: manualEditModeOff,
      preview: _this,
      element: props.editElement,
      updateElement: handleUpdateElement,
      onImageUpload: props.onImageUpload
    };
    return /*#__PURE__*/_react.default.createElement(_formDynamicEdit.default, formElementEditProps);
  };
  var classes = props.className || 'col-md-6 react-form-builder-preview float-left';
  if (props.editMode) {
    classes += ' is-editing';
  }
  var filteredData = data.filter(function (x) {
    return !!x && !x.parentId;
  });
  var items = filteredData.map(function (item, index) {
    return getElement(item, index);
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes,
    style: {
      height: '100%',
      scrollbarWidth: 'none'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "preview-toolbar"
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      border: '1px solid #ddd',
      padding: 8,
      marginRight: '4px',
      backgroundColor: '#ffffff'
    },
    onClick: function onClick() {
      var event = new window.KeyboardEvent('keydown', {
        key: 'z',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
  }, /*#__PURE__*/_react.default.createElement("i", {
    class: "fas fa-history",
    style: {
      marginRight: 8
    }
  }), "Undo"), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      border: '1px solid #ddd',
      padding: 8,
      backgroundColor: '#ffffff'
    },
    onClick: function onClick() {
      var event = new window.KeyboardEvent('keydown', {
        key: 'y',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-redo",
    style: {
      marginRight: 8
    }
  }), "Redo")), /*#__PURE__*/_react.default.createElement("div", {
    className: "edit-form",
    ref: editForm
  }, props.editElement !== null && showEditForm()), /*#__PURE__*/_react.default.createElement("div", {
    className: "Sortable"
  }, items), /*#__PURE__*/_react.default.createElement(PlaceHolder, {
    id: "form-place-holder",
    show: items.length === 0,
    index: items.length,
    moveCard: cardPlaceHolder,
    insertCard: insertCard
  }), /*#__PURE__*/_react.default.createElement(_componentDragLayer.default, null));
};
var _default = Preview;
exports.default = _default;