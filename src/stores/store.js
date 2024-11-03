import Store from 'beedle';
import { get, post } from './requests';

let _saveUrl;
let _onPost;
let _onLoad;

const store = new Store({
  actions: {
    setData(context, data, saveData, action) {
      context.commit('setData', { data, action });
      if (saveData) this.save(data, action);
    },

    load(context, { loadUrl, saveUrl, data, saveAlways, action }) {
      _saveUrl = saveUrl;
      const saveA = saveAlways || saveAlways === undefined;
      context.commit('setSaveAlways', saveA);
      if (_onLoad) {
        _onLoad().then((x) => {
          if (data && data.length > 0 && x.length === 0) {
            data.forEach((y) => x.push(y));
          }
          this.setData(context, x, false, action);
        });
      } else if (loadUrl) {
        get(loadUrl).then((x) => {
          if (data && data.length > 0 && x.length === 0) {
            data.forEach((y) => x.push(y));
          }
          this.setData(context, x, false, action);
        });
      } else {
        this.setData(context, data, false, action);
      }
    },

    update(context, { data, action }) {
      this.setData(context, data, false, action);
    },

    create(context, element) {
      const {
        payload: { data, saveAlways },
      } = context.state;
      data.push(element);
      this.setData(context, data, saveAlways);
    },

    delete(context, element) {
      const {
        payload: { data, saveAlways },
      } = context.state;
      data.splice(data.indexOf(element), 1);
      this.setData(context, data, saveAlways);
    },

    deleteLastItem(context) {
      const { lastItem } = context.state;
      if (lastItem) {
        this.delete(context, lastItem);
        context.commit('setLastItem', null);
      }
    },

    resetLastItem(context) {
      const { lastItem } = context.state.payload;
      if (lastItem) {
        context.commit('setLastItem', null);
      }
    },

    post(context) {
      const {
        payload: { data },
      } = context.state;
      this.setData(context, data, true);
    },

    updateOrder(context, elements) {
      const { saveAlways } = context.state.payload;
      const newData = elements.filter((x) => x && !x.parentId);
      elements.filter((x) => x && x.parentId).forEach((x) => newData.push(x));
      this.setData(context, newData, saveAlways);
    },

    insertItem(context, item) {
      context.commit('setLastItem', item.isContainer ? null : item);
    },

    save(data, action) {
      if (_onPost) {
        _onPost({ task_data: data, action });
      } else if (_saveUrl) {
        post(_saveUrl, { task_data: data, action });
      }
    },
  },

  mutations: {
    setData(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.payload = payload;
      return state;
    },
    setSaveAlways(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.saveAlways = payload;
      return state;
    },
    setLastItem(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.payload.lastItem = payload;
      return state;
    },
  },

  initialState: {
    payload: {
      data: [],
      action: undefined,
      saveAlways: true,
      lastItem: null,
    },
  },
});

store.setExternalHandler = (onLoad, onPost) => {
  _onLoad = onLoad;
  _onPost = onPost;
};

export default store;
