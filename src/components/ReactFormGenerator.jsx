import React, { useEffect, useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { EventEmitter } from 'fbemitter'
import FieldSet from '../fieldset'
import FormElements from '../form-elements'
import CustomElement from '../form-elements/custom-element'
import FormValidator from '../form-validator'
import AppLocale from '../language-provider'
import { MultiColumnRow, ThreeColumnRow, TwoColumnRow } from '../multi-column'
import { FormProvider, useFormStore } from '../providers/FormProvider'
import Registry from '../stores/registry'

// Constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX =
  /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g

// Utility functions
const convertAnswers = (answers) => {
  if (!Array.isArray(answers)) return answers || {}

  return answers.reduce(
    (result, x) => ({
      ...result,
      [x.name]: x.name.indexOf('tags_') > -1 ? x.value.map((y) => y.value) : x.value,
    }),
    {}
  )
}

const validateCorrectness = (item, value) => {
  if (item.element === 'Rating') {
    return value.toString() === item.correct
  }
  return value.toLowerCase() === item.correct.trim().toLowerCase()
}

// Custom hooks
const useFormValidation = (props, emitter) => {
  const validateEmail = (email) => EMAIL_REGEX.test(email)
  const validatePhone = (phone) => PHONE_REGEX.test(phone)

  return (dataItems, values) => {
    const errors = []
    const { intl, validateForCorrectness } = props

    dataItems.forEach((item) => {
      // Required field validation
      if (item.required && !values[item.field_name]) {
        errors.push(`${item.label} ${intl.formatMessage({ id: 'message.is-required' })}!`)
      }

      // Email validation
      if (
        item.element === 'EmailInput' &&
        values[item.field_name] &&
        !validateEmail(values[item.field_name])
      ) {
        errors.push(
          `${item.label} ${intl?.formatMessage({
            id: 'message.invalid-email',
          })}`
        )
      }

      // Phone validation
      if (
        item.element === 'PhoneNumber' &&
        values[item.field_name] &&
        !validatePhone(values[item.field_name])
      ) {
        errors.push(
          `${item.label} ${intl?.formatMessage({
            id: 'message.invalid-phone-number',
          })}`
        )
      }

      // Correctness validation
      if (validateForCorrectness && item.canHaveAnswer) {
        const isCorrect = validateCorrectness(item, values[item.field_name])
        if (!isCorrect) {
          errors.push(
            `${item.label} ${intl?.formatMessage({
              id: 'message.was-answered-incorrectly',
            })}!`
          )
        }
      }
    })

    emitter.emit('formValidation', errors)
    return errors
  }
}

const FormContent = (props) => {
  const { values, setFieldValue, setMultipleValues, toggleCheckbox } = useFormStore()
  const emitter = useMemo(() => new EventEmitter(), [])
  const validateForm = useFormValidation(props, emitter)

  useEffect(() => {
    if (props.answer_data) {
      const convertedData = convertAnswers(props.answer_data)
      setMultipleValues(convertedData)
    }
  }, [props.answer_data, setMultipleValues])

  const getItemValue = (item) => ({
    element: item.element,
    value: values[item.field_name] || '',
  })

  const getEditor = (item) => {
    if (!props.answer_data || !Array.isArray(props.answer_data)) {
      return null
    }
    const itemAns = props.answer_data.find((x) => x.name === item.field_name)
    return itemAns && itemAns.editor
  }

  const collectFormData = (data) => {
    debugger
    const formData = []
    data.forEach((item) => {
      if (item.field_name) {
        const activeUser = props.getActiveUserProperties()
        const oldEditor = getEditor(item)

        const valueItem = getItemValue(item)

        const itemData = {
          id: item.id,
          name: item.field_name,
          custom_name: item.custom_name || item.field_name,
          value: valueItem.value,
          editor: oldEditor ? oldEditor : valueItem.value ? activeUser : null,
        }
        formData.push(itemData)
      }
    })

    return formData
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataItems = props.display_short
      ? props.data.filter((i) => i.alternateForm === true)
      : props.data

    if (!props.skip_validations) {
      const errors = validateForm(dataItems, values)
      if (errors.length > 0) return
    }

    if (props.onSubmit) {
      const formData = collectFormData(props.data)
      props.onSubmit(formData)
    }
  }

  const handleChange = (fieldName, value, element) => {
    if (element === 'Checkboxes') {
      toggleCheckbox(fieldName, value)
    } else {
      setFieldValue(fieldName, value)
    }

    if (props.onChange) {
      const formData = collectFormData(props.data)
      props.onChange(formData)
    }
  }

  const renderCustomElement = (item) => {
    if (!item.component || typeof item.component !== 'function') {
      item.component = Registry.get(item.key)
      if (!item.component) {
        console.error(`${item.element} was not registered`)
        return null
      }
    }

    return <CustomElement {...item} />
  }

  const renderFormElement = (item) => {
    if (!item) return null

    const commonProps = {
      mutable: true,
      key: `form_${item.id}`,
      data: item,
      read_only: props.read_only || item.readOnly,
      defaultValue: values[item.field_name],
      handleChange: (event) => {
        handleChange(item.field_name, event.target.value, item.element)
      },
      getDataSource: props.getDataSource,
      getActiveUserProperties: props.getActiveUserProperties,
    }

    const renderContainer = (activeItem, Container) => {
      const controls = activeItem.childItems.map((childId) => {
        const childItem = props.data.find((d) => d.id === childId)
        return childItem ? renderFormElement(childItem) : <div>&nbsp;</div>
      })

      return (
        <Container
          mutable={true}
          key={`form_${activeItem.id}`}
          data={activeItem}
          controls={controls}
        />
      )
    }

    const renderDefaultElement = (activeItem, activeCommonProps) => {
      const Input = FormElements[activeItem.element]
      return Input ? <Input {...activeCommonProps} /> : null
    }

    const elementMap = {
      CustomElement: () => renderCustomElement(item),
      MultiColumnRow: () => renderContainer(item, MultiColumnRow),
      ThreeColumnRow: () => renderContainer(item, ThreeColumnRow),
      TwoColumnRow: () => renderContainer(item, TwoColumnRow),
      FieldSet: () => renderContainer(item, FieldSet),
      // Download: () => (
      // <Download {...commonProps} download_path={props.download_path} />
      // ),
    }

    return elementMap[item.element]?.() || renderDefaultElement(item, commonProps)
  }

  const formElements = useMemo(() => {
    const dataItems =
      (props.display_short
        ? props.data.filter((i) => i.alternateForm === true)
        : props.data) || []

    return dataItems.filter((x) => !x.parentId).map(renderFormElement)
  }, [props.data, props.display_short, values])

  return (
    <div>
      <FormValidator emitter={emitter} />
      <div className="react-form-builder-form">
        <form
          encType="multipart/form-data"
          action={props.form_action}
          onSubmit={handleSubmit}
          method={props.form_method}
        >
          {props.authenticity_token && (
            <div style={{ display: 'none' }}>
              <input name="utf8" type="hidden" value="&#x2713;" />
              <input
                name="authenticity_token"
                type="hidden"
                value={props.authenticity_token}
              />
              <input name="task_id" type="hidden" value={props.task_id} />
            </div>
          )}
          {formElements}
          {!props.hide_actions && (
            <div className="btn-toolbar">
              <input
                type="submit"
                className="btn btn-big"
                value={props.action_name || props.actionName || 'Submit'}
              />
              {props.back_action && (
                <a
                  href={props.back_action}
                  className="btn btn-default btn-cancel btn-big"
                >
                  {props.back_name || props.backName || 'Cancel'}
                </a>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

const ReactFormGenerator = ({ locale = 'en', answerData, ...props }) => {
  const currentAppLocale = AppLocale[locale]

  return (
    <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
      <FormProvider initialValues={convertAnswers(answerData) || {}}>
        <FormContent {...props} />
      </FormProvider>
    </IntlProvider>
  )
}

export default ReactFormGenerator
