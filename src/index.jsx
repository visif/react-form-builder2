// This is the root of the form builder exporting 2 main components
// ReactFormBuilder and ReactFormGenerator

import store from "./stores/store";
import Registry from "./stores/registry";
import ReactFormBuilder from "./components/ReactFormBuilder";
import ReactFormGenerator from "./ReactFormGenerator";

export {
  ReactFormBuilder,
  ReactFormGenerator,
  store as ElementStore,
  Registry,
};
