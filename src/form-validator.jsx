import React, { useEffect, useState } from 'react'
import xss from 'xss'
import IntlMessages from './language-provider/IntlMessages'

const myxss = new xss.FilterXSS({
  whiteList: {
    u: [],
    br: [],
    b: [],
    i: [],
    ol: ['style'],
    ul: ['style'],
    li: [],
    p: ['style'],
    sub: [],
    sup: [],
    div: ['style'],
    em: [],
    strong: [],
    span: ['style'],
  },
})

const FormValidator = ({ emitter }) => {
  const [errors, setErrors] = useState([])

  useEffect(() => {
    const subscription = emitter.addListener('formValidation', (validationErrors) => {
      setErrors(validationErrors)
    })

    return () => {
      subscription.remove()
    }
  }, [emitter])

  const dismissModal = (e) => {
    e.preventDefault()
    setErrors([])
  }

  const errorList = errors.map((error, index) => (
    <li
      key={`error_${index}`}
      dangerouslySetInnerHTML={{ __html: myxss.process(error) }}
    />
  ))

  return (
    <div>
      {errors.length > 0 && (
        <div className="alert alert-danger validation-error">
          <div className="clearfix">
            <i className="fas fa-exclamation-triangle float-left"></i>
            <ul className="float-left">{errorList}</ul>
          </div>
          <div className="clearfix">
            <a
              className="float-right btn btn-default btn-sm btn-danger"
              onClick={dismissModal}
            >
              <IntlMessages id="dismiss" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormValidator
