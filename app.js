/// root file for the react form builder

import React from "react";
import ReactDOM from "react-dom";
import DemoBar from "./demobar";
import { ReactFormBuilder } from "./src/index";
import * as variables from "./variables";

require("./scss/application.scss");

const url = "/api/formdata";
const saveUrl = "/api/formdata";

// const items = [{
//     key: 'Header',
//   }, {
//     key: 'TextInput',
//   }, {
//     key: 'TextArea',
//   }, {
//     key: 'RadioButtons',
//   }, {
//     key: 'Checkboxes',
//   }, {
//     key: 'Image',
//   },
//   {
//     key: 'FieldSet',
//     label:"Field Set",
//     name:"Field Set",

//   },
//   {
//     group_name: 'Multi Column Row',
//     key: 'TwoColumnRow'
//   },
//   {
//     group_name: 'Multi Column Row',
//     key: 'ThreeColumnRow'
//   },
//   {
//     group_name: 'Multi Column Row',
//     key: 'FourColumnRow',
//     element: 'MultiColumnRow',
//   },
//   {
//     group_name: 'Multi Column Row',
//     key: 'FiveColumnRow',
//     element: 'MultiColumnRow',
//   },
//   {
//     group_name: 'Multi Column Row',
//     key: 'SixColumnRow',
//     element: 'MultiColumnRow',
//   },
//   {
//     group_name: 'Custom Element',
//     key: 'TestComponent',
//     element: 'CustomElement',
//     component: TestComponent,
//     type: 'custom',
//     field_name: 'test_component',
//     name: 'Something You Want',
//     icon: 'fa fa-cog',
//     static: true,
//     props: { test: 'test_comp' },
//     label: 'Label Test',
//   },
//   {
//     group_name: 'Custom Element',
//     key: 'MyInput',
//     element: 'CustomElement',
//     component: MyInput,
//     type: 'custom',
//     forwardRef: true,
//     bare: true,
//     field_name: 'my_input_',
//     name: 'My Input',
//     icon: 'fa fa-cog',
//     props: { test: 'test_input' },
//     label: 'Label Input',
//   },
// ];

const root = ReactDOM.createRoot(document.getElementById("form-builder"));
root.render(
  <React.StrictMode>
    <ReactFormBuilder
      variables={variables}
      url={url}
      saveUrl={saveUrl}
      locale="en"
      saveAlways={false}
      // toolbarItems={items}
    />
  </React.StrictMode>
);

const root2 = ReactDOM.createRoot(document.getElementById("demo-bar"));
root2.render(
  <React.StrictMode>
    <DemoBar variables={variables} />,
  </React.StrictMode>
);
