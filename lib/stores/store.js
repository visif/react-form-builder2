"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _beedle = _interopRequireDefault(require("beedle"));
var _requests = require("./requests");
var _saveUrl;
var _onPost;
var _onLoad;
var store = new _beedle["default"]({
  actions: {
    setData: function setData(context, data, saveData, action) {
      context.commit('setData', {
        data: data,
        action: action
      });
      if (saveData) this.save(data, action);
    },
    load: function load(context, _ref) {
      var _this = this;
      var loadUrl = _ref.loadUrl,
        saveUrl = _ref.saveUrl,
        data = _ref.data,
        saveAlways = _ref.saveAlways,
        action = _ref.action;
      _saveUrl = saveUrl;
      var saveA = saveAlways || saveAlways === undefined;
      context.commit('setSaveAlways', saveA);
      if (_onLoad) {
        _onLoad().then(function (x) {
          if (data && data.length > 0 && x.length === 0) {
            data.forEach(function (y) {
              return x.push(y);
            });
          }
          _this.setData(context, x, false, action);
        });
      } else if (loadUrl) {
        (0, _requests.get)(loadUrl).then(function (x) {
          if (data && data.length > 0 && x.length === 0) {
            data.forEach(function (y) {
              return x.push(y);
            });
          }
          _this.setData(context, x, false, action);
        });
      } else {
        this.setData(context, data, false, action);
      }
    },
    update: function update(context, _ref2) {
      var data = _ref2.data,
        action = _ref2.action;
      this.setData(context, data, false, action);
    },
    create: function create(context, element) {
      var _context$state$payloa = context.state.payload,
        data = _context$state$payloa.data,
        saveAlways = _context$state$payloa.saveAlways;
      data.push(element);
      this.setData(context, data, saveAlways);
    },
    "delete": function _delete(context, element) {
      var _context$state$payloa2 = context.state.payload,
        data = _context$state$payloa2.data,
        saveAlways = _context$state$payloa2.saveAlways;
      data.splice(data.indexOf(element), 1);
      this.setData(context, data, saveAlways);
    },
    deleteLastItem: function deleteLastItem(context) {
      var lastItem = context.state.lastItem;
      if (lastItem) {
        this["delete"](context, lastItem);
        context.commit('setLastItem', null);
      }
    },
    resetLastItem: function resetLastItem(context) {
      var lastItem = context.state.payload.lastItem;
      if (lastItem) {
        context.commit('setLastItem', null);
      }
    },
    post: function post(context) {
      var data = context.state.payload.data;
      this.setData(context, data, true);
    },
    updateOrder: function updateOrder(context, elements) {
      var saveAlways = context.state.payload.saveAlways;
      var newData = elements.filter(function (x) {
        return x && !x.parentId;
      });
      elements.filter(function (x) {
        return x && x.parentId;
      }).forEach(function (x) {
        return newData.push(x);
      });
      this.setData(context, newData, saveAlways);
    },
    insertItem: function insertItem(context, item) {
      context.commit('setLastItem', item.isContainer ? null : item);
    },
    save: function save(data, action) {
      if (_onPost) {
        _onPost({
          task_data: data,
          action: action
        });
      } else if (_saveUrl) {
        (0, _requests.post)(_saveUrl, {
          task_data: data,
          action: action
        });
      }
    }
  },
  mutations: {
    setData: function setData(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.payload = payload;
      return state;
    },
    setSaveAlways: function setSaveAlways(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.saveAlways = payload;
      return state;
    },
    setLastItem: function setLastItem(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.payload.lastItem = payload;
      return state;
    }
  },
  initialState: {
    payload: {
      data: [],
      action: undefined,
      saveAlways: true,
      lastItem: null
    }
  }
});
store.setExternalHandler = function (onLoad, onPost) {
  _onLoad = onLoad;
  _onPost = onPost;
};
var _default = store;
exports["default"] = _default;