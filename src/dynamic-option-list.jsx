import React, { useEffect, useState } from 'react'
import IntlMessages from './language-provider/IntlMessages'
import ID from './UUID'

const DynamicOptionList = (props) => {
  const [element, setElement] = useState(props.element)
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    if (dirty) {
      props.updateElement.call(props.preview, element)
      setDirty(false)
    }
  }, [dirty, element, props])

  const _setValue = (text) => text.replace(/[^A-Z0-9]+/gi, '_').toLowerCase()

  const editOption = (optionIndex, e) => {
    const newElement = { ...element }
    const val =
      newElement.options[optionIndex].value !==
      _setValue(newElement.options[optionIndex].text)
        ? newElement.options[optionIndex].value
        : _setValue(e.target.value)

    newElement.options[optionIndex].text = e.target.value
    newElement.options[optionIndex].value = val
    setElement(newElement)
    setDirty(true)
  }

  const editValue = (optionIndex, e) => {
    const newElement = { ...element }
    const val =
      e.target.value === ''
        ? _setValue(newElement.options[optionIndex].text)
        : e.target.value
    newElement.options[optionIndex].value = val
    setElement(newElement)
    setDirty(true)
  }

  const editOptionCorrect = (optionIndex) => {
    const newElement = { ...element }
    if (
      Object.prototype.hasOwnProperty.call(newElement.options[optionIndex], 'correct')
    ) {
      delete newElement.options[optionIndex].correct
    } else {
      newElement.options[optionIndex].correct = true
    }
    setElement(newElement)
    props.updateElement.call(props.preview, newElement)
  }

  const addOption = (index) => {
    const newElement = { ...element }
    newElement.options.splice(index + 1, 0, {
      value: '',
      text: '',
      key: ID.uuid(),
    })
    setElement(newElement)
    props.updateElement.call(props.preview, newElement)
  }

  const removeOption = (index) => {
    const newElement = { ...element }
    newElement.options.splice(index, 1)
    setElement(newElement)
    props.updateElement.call(props.preview, newElement)
  }

  return (
    <div className="dynamic-option-list">
      <ul>
        <li>
          <div className="row">
            <div className="col-sm-6">
              <b>
                <IntlMessages id="options" />
              </b>
            </div>
            {props.canHaveOptionValue && (
              <div className="col-sm-2">
                <b>
                  <IntlMessages id="value" />
                </b>
              </div>
            )}
            {props.canHaveOptionValue && props.canHaveOptionCorrect && (
              <div className="col-sm-4">
                <b>
                  <IntlMessages id="correct" />
                </b>
              </div>
            )}
          </div>
        </li>
        {props.element.options.map((option, index) => {
          const thisKey = `edit_${option.key}`
          const val = option.value !== _setValue(option.text) ? option.value : ''
          return (
            <li className="clearfix" key={thisKey}>
              <div className="row">
                <div className="col-sm-6">
                  <input
                    tabIndex={index + 1}
                    className="form-control"
                    style={{ width: '100%' }}
                    type="text"
                    name={`text_${index}`}
                    placeholder="Option text"
                    value={option.text}
                    onBlur={() => setDirty(true)}
                    onChange={(e) => editOption(index, e)}
                  />
                </div>
                {props.canHaveOptionValue && (
                  <div className="col-sm-2">
                    <input
                      className="form-control"
                      type="text"
                      name={`value_${index}`}
                      value={val}
                      onChange={(e) => editValue(index, e)}
                    />
                  </div>
                )}
                {props.canHaveOptionValue && props.canHaveOptionCorrect && (
                  <div className="col-sm-1">
                    <input
                      className="form-control"
                      type="checkbox"
                      value="1"
                      onChange={() => editOptionCorrect(index)}
                      checked={'correct' in option}
                    />
                  </div>
                )}
                <div className="col-sm-3">
                  <div className="dynamic-options-actions-buttons">
                    <button onClick={() => addOption(index)} className="btn btn-success">
                      <i className="fas fa-plus-circle"></i>
                    </button>
                    {index > 0 && (
                      <button
                        onClick={() => removeOption(index)}
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

export default DynamicOptionList
