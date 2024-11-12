/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import TextAreaAutosize from 'react-textarea-autosize'
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import DynamicOptionList from './dynamic-option-list'
import IntlMessages from './language-provider/IntlMessages'

const toolbar = {
  options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ['bold', 'italic', 'underline', 'superscript', 'subscript'],
  },
}

const FormElementsEdit = (props) => {
  const [element, setElement] = useState(props.element)
  const [dirty, setDirty] = useState(false)
  const [formDataSource, setFormDataSource] = useState([])

  useEffect(() => {
    setElement(props.element)
  }, [props.element])

  const updateElement = (updatedElement = element) => {
    if (dirty) {
      props.updateElement.call(props.preview, updatedElement)
      setDirty(false)
    }
  }

  const editElementProp = (elemProperty, targProperty, e) => {
    const updatedElement = {
      ...element,
      [elemProperty]: e.target[targProperty],
    }
    setElement(updatedElement)
    setDirty(true)

    if (targProperty === 'checked') {
      updateElement(updatedElement)
    }
  }

  const onEditorStateChange = (index, property, editorContent) => {
    const html = draftToHtml(convertToRaw(editorContent.getCurrentContent()))
      .replace(/<p>/g, '')
      .replace(/<\/p>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/(?:\r\n|\r|\n)/g, ' ')

    const updatedElement = { ...element, [property]: html }
    setElement(updatedElement)
    setDirty(true)
  }

  const convertFromHTMLContent = (content) => {
    const newContent = convertFromHTML(content)
    if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
      return EditorState.createEmpty()
    }
    const contentState = ContentState.createFromBlockArray(newContent)
    return EditorState.createWithContent(contentState)
  }

  const onUploadFile = async (event) => {
    if (!event || !event.target || !event.target.files || !props.onImageUpload) {
      if (!props.onImageUpload) {
        const thisElement = element
        thisElement.src = 'Please provide upload callback'
        setElement(thisElement)
      }

      return
    }

    try {
      const file = event.target.files[0]
      const imageUrl = await props.onImageUpload(file, props.element.id)

      const reader = new FileReader()
      reader.onload = function readerOnLoad() {
        const img = new Image()
        img.onload = function imgOnLoad() {
          const thisElement = element
          thisElement.width = img.width
          thisElement.height = img.height
          thisElement.src = imageUrl
          setElement(thisElement)
          props.updateElement.call(props.preview, thisElement)
        }
        img.src = reader.result
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('error upload', error)
      const thisElement = element
      thisElement.src = 'cannot upload file'
      setElement(thisElement)
    }
  }

  const { canHaveDisplayHorizontal, canHaveOptionCorrect, canHaveOptionValue } =
    props.element

  const thisFiles = props.files.length ? props.files : []
  if (thisFiles.length < 1 || (thisFiles.length > 0 && thisFiles[0].id !== '')) {
    thisFiles.unshift({ id: '', file_name: '' })
  }

  let editorState
  if (Object.prototype.hasOwnProperty.call(props.element, 'content')) {
    editorState = convertFromHTMLContent(props.element.content)
  }
  if (Object.prototype.hasOwnProperty.call(props.element, 'label')) {
    editorState = convertFromHTMLContent(props.element.label)
  }

  return (
    <div>
      <div className="clearfix">
        <h4 className="float-left">{props.element.text}</h4>
        <i
          className="float-right fas fa-times dismiss-edit"
          onClick={props.manualEditModeOff}
        ></i>
      </div>
      {Object.prototype.hasOwnProperty.call(props.element, 'content') && (
        <div className="form-group">
          <label className="control-label">
            <IntlMessages id="text-to-display" />:
          </label>

          <Editor
            toolbar={toolbar}
            defaultEditorState={editorState}
            onBlur={() => updateElement()}
            onEditorStateChange={(editorContent) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              onEditorStateChange(0, 'content', editorContent)
            }
            stripPastedStyles={true}
          />
        </div>
      )}
      {Object.prototype.hasOwnProperty.call(props.element, 'file_path') && (
        <div className="form-group">
          <label className="control-label" htmlFor="fileSelect">
            <IntlMessages id="choose-file" />:
          </label>
          <select
            id="fileSelect"
            className="form-control"
            defaultValue={props.element.file_path}
            onBlur={() => updateElement()}
            onChange={(e) => editElementProp('file_path', 'value', e)}
          >
            {thisFiles.map((file) => {
              const thisKey = `file_${file.id}`
              return (
                <option value={file.id} key={thisKey}>
                  {file.file_name}
                </option>
              )
            })}
          </select>
        </div>
      )}
      {Object.prototype.hasOwnProperty.call(props.element, 'href') && (
        <div className="form-group">
          <TextAreaAutosize
            type="text"
            className="form-control"
            defaultValue={props.element.href}
            onBlur={() => updateElement()}
            onChange={(e) => editElementProp('href', 'value', e)}
          />
        </div>
      )}
      {Object.prototype.hasOwnProperty.call(props.element, 'src') && (
        <div>
          <div className="form-group">
            <input id="srcImage" type="file" onChange={(e) => onUploadFile(e)} />
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="srcInput">
              Link to:
            </label>
            <input
              id="srcInput"
              type="text"
              className="form-control"
              value={props.element.src}
              defaultValue={props.element.src}
              onBlur={() => updateElement()}
              onChange={(e) => editElementProp('src', 'value', e)}
            />
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                id="do-center"
                className="custom-control-input"
                type="checkbox"
                checked={props.element.center || false}
                value={true}
                onChange={(e) => editElementProp('center', 'checked', e)}
              />
              <label className="custom-control-label" htmlFor="do-center">
                Center?
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <label className="control-label" htmlFor="elementWidth">
                Width:
              </label>
              <input
                id="elementWidth"
                type="text"
                className="form-control"
                value={props.element.width}
                defaultValue={props.element.width}
                onBlur={() => updateElement()}
                onChange={(e) => editElementProp('width', 'value', e)}
              />
            </div>
            <div className="col-sm-3">
              <label className="control-label" htmlFor="elementHeight">
                Height:
              </label>
              <input
                id="elementHeight"
                type="text"
                className="form-control"
                value={props.element.height}
                defaultValue={props.element.height}
                onBlur={() => updateElement()}
                onChange={(e) => editElementProp('height', 'value', e)}
              />
            </div>
          </div>
        </div>
      )}
      {Object.prototype.hasOwnProperty.call(props.element, 'label') && (
        <div className="form-group">
          <label>
            <IntlMessages id="display-label" />
          </label>
          <Editor
            toolbar={toolbar}
            defaultEditorState={editorState}
            onBlur={() => updateElement()}
            onEditorStateChange={(editorContent) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              onEditorStateChange(0, 'label', editorContent)
            }
            stripPastedStyles={true}
          />
          <br />
          <div className="custom-control custom-checkbox">
            <input
              id="is-required"
              className="custom-control-input"
              type="checkbox"
              checked={props.element.required || false}
              value={true}
              onChange={(e) => editElementProp('required', 'checked', e)}
            />
            <label className="custom-control-label" htmlFor="is-required">
              <IntlMessages id="required" />
            </label>
          </div>
          {Object.prototype.hasOwnProperty.call(props.element, 'readOnly') && (
            <div className="custom-control custom-checkbox">
              <input
                id="is-read-only"
                className="custom-control-input"
                type="checkbox"
                checked={props.element.readOnly || false}
                value={true}
                onChange={(e) => editElementProp('readOnly', 'checked', e)}
              />
              <label className="custom-control-label" htmlFor="is-read-only">
                <IntlMessages id="read-only" />
              </label>
            </div>
          )}
          {Object.prototype.hasOwnProperty.call(props.element, 'defaultToday') && (
            <div className="custom-control custom-checkbox">
              <input
                id="is-default-to-today"
                className="custom-control-input"
                type="checkbox"
                checked={props.element.defaultToday || false}
                value={true}
                onChange={(e) => editElementProp('defaultToday', 'checked', e)}
              />
              <label className="custom-control-label" htmlFor="is-default-to-today">
                <IntlMessages id="default-to-today" />?
              </label>
            </div>
          )}
          {Object.prototype.hasOwnProperty.call(props.element, 'showTimeSelect') && (
            <div className="custom-control custom-checkbox">
              <input
                id="show-time-select"
                className="custom-control-input"
                type="checkbox"
                checked={props.element.showTimeSelect || false}
                value={true}
                onChange={(e) => editElementProp('showTimeSelect', 'checked', e)}
              />
              <label className="custom-control-label" htmlFor="show-time-select">
                <IntlMessages id="show-time-select" />?
              </label>
            </div>
          )}
          {props.element.showTimeSelect &&
            Object.prototype.hasOwnProperty.call(props.element, 'showTimeSelectOnly') && (
              <div className="custom-control custom-checkbox">
                <input
                  id="show-time-select-only"
                  className="custom-control-input"
                  type="checkbox"
                  checked={props.element.showTimeSelectOnly || false}
                  value={true}
                  onChange={(e) => editElementProp('showTimeSelectOnly', 'checked', e)}
                />
                <label className="custom-control-label" htmlFor="show-time-select-only">
                  <IntlMessages id="show-time-select-only" />?
                </label>
              </div>
            )}
          {Object.prototype.hasOwnProperty.call(props.element, 'showTimeInput') && (
            <div className="custom-control custom-checkbox">
              <input
                id="show-time-input"
                className="custom-control-input"
                type="checkbox"
                checked={props.element.showTimeInput || false}
                value={true}
                onChange={(e) => editElementProp('showTimeInput', 'checked', e)}
              />
              <label className="custom-control-label" htmlFor="show-time-input">
                <IntlMessages id="show-time-input" />?
              </label>
            </div>
          )}
          {(element.element === 'RadioButtons' || element.element === 'Checkboxes') &&
            canHaveDisplayHorizontal && (
              <div className="custom-control custom-checkbox">
                <input
                  id="display-horizontal"
                  className="custom-control-input"
                  type="checkbox"
                  checked={props.element.inline || false}
                  value={true}
                  onChange={(e) => editElementProp('inline', 'checked', e)}
                />
                <label className="custom-control-label" htmlFor="display-horizontal">
                  <IntlMessages id="display-horizontal" />
                </label>
              </div>
            )}
        </div>
      )}
      {Object.prototype.hasOwnProperty.call(props.element, 'position') && (
        <div className="form-group">
          <label className="control-label" htmlFor="position">
            Role / Position
          </label>
          <input
            id="position"
            type="text"
            className="form-control"
            defaultValue={props.element.position}
            onBlur={() => updateElement()}
            onChange={(e) => editElementProp('position', 'value', e)}
          />
        </div>
      )}
      {Object.prototype.hasOwnProperty.call(props.element, 'specificRole') && (
        <div className="form-group">
          <label className="control-label">
            Pre Defined User / Role {Boolean(props.element.specificRole)}
          </label>
          <select
            className="form-control"
            id="specificRole"
            defaultValue={props.element.specificRole}
            onBlur={() => updateElement()}
            onChange={(e) => editElementProp('specificRole', 'value', e)}
          >
            <option value="specific" key="specific">
              Specific
            </option>
            <option value="notSpecific" key="notSpecific">
              Not specific
            </option>
          </select>
        </div>
      )}
      {Object.prototype.hasOwnProperty.call(props.element, 'options') && (
        <DynamicOptionList
          showCorrectColumn={props.showCorrectColumn}
          canHaveOptionCorrect={canHaveOptionCorrect}
          canHaveOptionValue={canHaveOptionValue}
          data={props.preview?.state?.data}
          updateElement={props.updateElement}
          preview={props.preview}
          element={props.element}
          key={props.element.options.length}
        />
      )}
      {Object.prototype.hasOwnProperty.call(props.element, 'sourceType') && (
        <div className="form-group">
          <label className="control-label" htmlFor="sourceType">
            Source Type
          </label>
          <select
            className="form-control"
            id="sourceType"
            defaultValue={props.element.sourceType}
            onBlur={() => updateElement()}
            onChange={(e) => editElementProp('sourceType', 'value', e)}
          >
            <option value="name" key="name">
              Name
            </option>
            <option value="department" key="department">
              Department
            </option>
            <option value="role" key="role">
              Role
            </option>
            <option value="form" key="form">
              Form
            </option>
          </select>
        </div>
      )}
      {props.element.sourceType === 'form' && (
        <div>
          {Object.prototype.hasOwnProperty.call(props.element, 'formSource') && (
            <div className="form-group">
              <label className="control-label" htmlFor="formSource">
                Form Source
              </label>
              <select
                className="form-control"
                id="formSource"
                value={this.props.element.formSource}
                defaultValue={this.props.element.formSource}
                onBlur={() => updateElement()}
                onChange={(e) => editElementProp('formSource', 'value', e)}
              >
                <option value={-1} key={-1}>
                  " Please select "
                </option>
                {formDataSource &&
                  formDataSource.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {this.props.element.sourceType === 'form' && (
            <div className="form-group">
              <label className="control-label" htmlFor="formSource">
                Select Fields
              </label>
              {this.state.activeForm &&
                this.state.activeForm.columns &&
                this.state.activeForm.columns.map((item) => (
                  <div className="custom-control custom-checkbox">
                    <input
                      id={item.field_name}
                      className="custom-control-input"
                      type="checkbox"
                      checked={
                        Object.prototype.hasOwnProperty.call(
                          props.element,
                          `formField${item.field_name}`
                        )
                          ? props.element[`formField${item.field_name}`]
                          : false
                      }
                      value={item.field_name}
                      onChange={(e) =>
                        editElementProp(`formField${item.field_name}`, 'checked', e)
                      }
                    />
                    <label className="custom-control-label" htmlFor={item.field_name}>
                      {item.label || item.text || ''}
                    </label>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

FormElementsEdit.defaultProps = { className: 'edit-element-fields' }

export default FormElementsEdit
