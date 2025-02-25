/// root file for the react form builder
import React from 'react'
import ReactDOM from 'react-dom'
import * as variables from './variables'
import DemoBar from './demobar'
import { ReactFormBuilder } from './src/index'

require('./scss/application.scss')

const url = '/api/formdata'
const saveUrl = '/api/formdata'

const root = ReactDOM.createRoot(document.getElementById('form-builder'))
root.render(
  <React.StrictMode>
    <ReactFormBuilder
      variables={variables}
      url={url}
      saveUrl={saveUrl}
      locale="en"
      saveAlways={false}
      onImageUpload={() =>
        'http://www.isocafe.com:8080/VisiforgeDC//temp/formimage/C27E1F69-7C67-4306-8A08-5A783F27F9F3.jpeg'
      }
    />
  </React.StrictMode>
)

const root2 = ReactDOM.createRoot(document.getElementById('demo-bar'))
root2.render(
  <React.StrictMode>
    <DemoBar variables={variables} />,
  </React.StrictMode>
)
