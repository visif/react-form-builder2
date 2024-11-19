import React, { useEffect, useState } from 'react'
import ID from './UUID'

const FixedRowList = (props) => {
  const [element, setElement] = useState(props.element)
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    if (dirty) {
      props.updateElement.call(props.preview, element)
      setDirty(false)
    }
  }, [dirty, element, props])

  const _setValue = (text) => {
    return `${text}`.replace(/[^A-Z0-9]+/gi, '_').toLowerCase()
  }

  const editRow = (index, key, e) => {
    const updatedElement = { ...element }
    const val =
      updatedElement.rowLabels[index].value !==
      _setValue(updatedElement.rowLabels[index][key])
        ? updatedElement.rowLabels[index].value
        : _setValue(e.target.value)

    updatedElement.rowLabels[index][key] = e.target.value
    updatedElement.rowLabels[index].value = val
    setElement(updatedElement)
    setDirty(true)
  }

  const addRow = (index) => {
    const updatedElement = { ...element }
    updatedElement.rowLabels.splice(index + 1, 0, { value: '', text: '', key: ID.uuid() })
    setElement(updatedElement)
    setDirty(true)
  }

  const removeRow = (index) => {
    const updatedElement = { ...element }
    updatedElement.rowLabels.splice(index, 1)
    setElement(updatedElement)
    setDirty(true)
  }

  return (
    <div className="dynamic-option-list">
      <ul key="row-labels">
        <li>
          <div className="row"></div>
          <div className="col-sm-12">
            <b>Rows</b>
          </div>
        </li>
        <li className="clearfix" key={`li_label_x`}>
          <div className="row">
            <div className="col-sm-9">Row Label</div>
            <div className="col-sm-3">
              <div className="dynamic-options-actions-buttons">
                <button onClick={() => addRow(-1)} className="btn btn-success">
                  <i className="fas fa-plus-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
        {props.element.rowLabels.map((option, index) => {
          const this_key = `edit_${option.key}`
          const val = option.value !== _setValue(option.text) ? option.value : ''

          return (
            <li className="clearfix" key={`li_label_${this_key}`}>
              <div className="row">
                <div className="col-sm-9">
                  <input
                    tabIndex={index + 1}
                    key={`input_label_${this_key}`}
                    className="form-control"
                    style={{ width: '100%' }}
                    type="text"
                    name={`text_${index}`}
                    placeholder="Row Label"
                    value={option.text}
                    onBlur={() => setDirty(true)}
                    onChange={(e) => editRow(index, 'text', e)}
                  />
                </div>
                <div className="col-sm-3">
                  <div className="dynamic-options-actions-buttons">
                    <button onClick={() => addRow(index)} className="btn btn-success">
                      <i className="fas fa-plus-circle"></i>
                    </button>
                    <button onClick={() => removeRow(index)} className="btn btn-danger">
                      <i className="fas fa-minus-circle"></i>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default FixedRowList
