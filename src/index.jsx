import React from "react";
import { IntlProvider } from "react-intl";
import FormGenerator from "./ReactFormGenerator";
import store from "./stores/store";
import Registry from "./stores/registry";
import AppLocale from "./language-provider";
import ReactFormBuilder from "./components/ReactFormBuilder";

function ReactFormGenerator(props) {
  const language = props.locale ? props.locale : "en";
  const currentAppLocale = AppLocale[language];
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <FormGenerator {...props} />
    </IntlProvider>
  );
}

// This is the root of the form builder exporting 2 main components
// ReactFormBuilder and ReactFormGenerator
const FormBuilders = {};
FormBuilders.ReactFormBuilder = ReactFormBuilder;
FormBuilders.ReactFormGenerator = ReactFormGenerator;
FormBuilders.ElementStore = store;
FormBuilders.Registry = Registry;

export default FormBuilders;

export {
  ReactFormBuilder,
  ReactFormGenerator,
  store as ElementStore,
  Registry,
};
