import React, { useEffect, useState } from 'react'
import ID from './UUID'

const DynamicColumnList = (props) => {
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

  const editColumn = (index, key, e) => {
    const newElement = { ...element }
    const val =
      newElement.columns[index].value !== _setValue(newElement.columns[index][key])
        ? newElement.columns[index].value
        : _setValue(e.target.value)

    newElement.columns[index][key] = e.target.value
    newElement.columns[index].value = val
    setElement(newElement)
    setDirty(true)
  }

  const addColumn = (index) => {
    const newElement = { ...element }
    newElement.columns.splice(index + 1, 0, {
      value: '',
      text: '',
      key: ID.uuid(),
      width: 1,
    })
    props.updateElement.call(props.preview, newElement)
    setElement(newElement)
  }

  const removeColumn = (index) => {
    const newElement = { ...element }
    newElement.columns.splice(index, 1)
    props.updateElement.call(props.preview, newElement)
    setElement(newElement)
  }

  return (
    <div className="dynamic-option-list">
      <ul>
        <li>
          <div className="row">
            <div className="col-sm-12">
              <b>Columns</b>
            </div>
          </div>
        </li>
        <li className="clearfix">
          <div className="row">
            <div className="col-sm-7">Header Text</div>
            <div className="col-sm-2">Width</div>
            <div className="col-sm-3"></div>
          </div>
        </li>
        {props.element.columns.map((option, index) => {
          const this_key = `edit_${option.key}`
          const val = option.value !== _setValue(option.text) ? option.value : ''
          return (
            <li className="clearfix" key={this_key}>
              <div className="row">
                <div className="col-sm-7">
                  <input
                    tabIndex={index + 1}
                    className="form-control"
                    style={{ width: '100%' }}
                    type="text"
                    name={`text_${index}`}
                    placeholder="Option text"
                    value={option.text}
                    onBlur={() => setDirty(true)}
                    onChange={(e) => editColumn(index, 'text', e)}
                  />
                </div>
                <div className="col-sm-2">
                  <input
                    tabIndex={index + 1}
                    className="form-control"
                    style={{ width: '100%' }}
                    type="text"
                    name={`text_${index}`}
                    placeholder="Width"
                    value={option.width}
                    onBlur={() => setDirty(true)}
                    onChange={(e) => editColumn(index, 'width', e)}
                  />
                </div>
                <div className="col-sm-3">
                  <div className="dynamic-options-actions-buttons">
                    <button onClick={() => addColumn(index)} className="btn btn-success">
                      <i className="fas fa-plus-circle"></i>
                    </button>
                    {index > 0 && (
                      <button
                        onClick={() => removeColumn(index)}
                        className="btn btn-danger"
                      >
                        <i className="fas fa-minus-circle"></i>
                      </button>
                    )}
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

export default DynamicColumnList
