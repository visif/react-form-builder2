import React, { useEffect, useRef, useState } from 'react'
import { DatePicker as AntDatePicker } from 'antd'
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import utc from 'dayjs/plugin/utc'
import ComponentHeader from './component-header'
import ComponentLabel from './component-label'

dayjs.extend(utc)
dayjs.extend(buddhistEra)

const keyDateFormat = 'setting_date_format'
const keyCalendarType = 'setting_calendar_type'

const dateFormatList = {
  'dd MMMM yyyy': 'DD MMMM YYYY',
  'dd-MMM-yyyy': 'DD-MMM-YYYY',
  'dd-MMM-yy': 'DD-MMM-YY',
  'yyyy-MM-dd': 'YYYY-MM-DD',
  'MM/dd/yyyy': 'MM/DD/YYYY',
  'dd/MM/yyyy': 'DD/MM/YYYY',
  'MMM dd, yyyy': 'MMM DD, YYYY',
}

export const getDateFormat = () => {
  const key = dateFormatList[localStorage.getItem(keyDateFormat)]
  return key || 'DD MMMM YYYY'
}

export const getCalendarType = () => {
  var key = localStorage.getItem(keyCalendarType)
  return key || 'EN'
}

const DatePicker = (props) => {
  const inputField = useRef(null)
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState(null)
  const [placeholder, setPlaceholder] = useState('')
  const [formatMask, setFormatMask] = useState(getDateFormat())

  useEffect(() => {
    const { formatMask: newFormatMask } = updateFormat(props, null)
    const newState = updateDateTime(props, newFormatMask)
    setValue(newState.value)
    setPlaceholder(newState.placeholder)
    setLoading(false)
  }, [props])

  useEffect(() => {
    checkForValue()
  }, [])

  const checkForValue = (attempt = 0) => {
    const { defaultValue } = props
    const maxRetries = 3

    if (!value && defaultValue) {
      setTimeout(() => {
        if (!value) {
          const newState = updateDateTime(props, formatMask)
          setValue(newState.value)
          setLoading(false)
          if (!newState.value && attempt < maxRetries) {
            checkForValue(attempt + 1)
          }
        }
      }, 500)
    } else {
      setLoading(false)
    }
  }

  const handleChange = (date) => {
    const isoDate = date ? date.toISOString() : null
    setValue(isoDate)
    setPlaceholder(formatMask.toLowerCase())
  }

  const updateFormat = (props, oldFormatMask) => {
    const newFormatMask = getDateFormat()
    const updated = newFormatMask !== oldFormatMask
    setFormatMask(newFormatMask)
    return { updated, formatMask: newFormatMask }
  }

  const updateDateTime = (props, formatMask) => {
    let newValue
    const { defaultToday } = props.data

    if (defaultToday && !props.defaultValue) {
      newValue = dayjs().toISOString()
    } else if (props.defaultValue) {
      try {
        const isMMDDYYYY = /^\d{2}\/\d{2}\/\d{4}$/.test(props.defaultValue)
        if (isMMDDYYYY) {
          newValue = dayjs(props.defaultValue, 'MM/DD/YYYY').toISOString()
        } else {
          newValue = dayjs(props.defaultValue).utc(true).toISOString()
        }
      } catch (error) {
        console.warn('Invalid date value:', props.defaultValue)
        newValue = null
      }
    }

    return {
      value: newValue,
      placeholder: formatMask.toLowerCase(),
      defaultToday,
      formatMask,
      defaultValue: props.defaultValue,
    }
  }

  const formatDate = (date, formatMask) => {
    if (!date) return ''

    if (getCalendarType() === 'EN') {
      return dayjs(date).utc(true).format(formatMask)
    } else {
      return dayjs(date).utc(true).format(formatMask.replace('YYYY', 'BBBB'))
    }
  }

  const { showTimeSelect } = props.data
  const userProperties = props.getActiveUserProperties && props.getActiveUserProperties()
  const savedEditor = props.editor
  let isSameEditor = true
  if (savedEditor && savedEditor.userId && !!userProperties) {
    isSameEditor = userProperties.userId === savedEditor.userId
  }

  const readOnly = props.data.readOnly || props.read_only || !isSameEditor

  const datePickerProps = {
    type: 'date',
    className: 'form-control',
    name: props.data.field_name,
    defaultValue: props.mutable ? props.defaultValue : undefined,
    ref: inputField,
  }

  let baseClasses = 'SortableItem rfb-item'
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak'
  }

  return (
    <div className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        <div>
          {readOnly ? (
            <input
              type="text"
              name={datePickerProps.name}
              ref={datePickerProps.ref}
              readOnly={readOnly}
              placeholder={placeholder}
              value={value ? formatDate(value, formatMask) : ''}
              disabled={!isSameEditor}
              className="form-control"
            />
          ) : (
            <AntDatePicker
              name={datePickerProps.name}
              ref={datePickerProps.ref}
              onChange={handleChange}
              value={value ? dayjs(value).utc(true) : null}
              className="form-control bold-date-picker"
              format={(value) => formatDate(value, formatMask)}
              showTime={showTimeSelect}
              disabled={!isSameEditor || loading}
              placeholder={placeholder}
              style={{ display: 'inline-block', width: 'auto' }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default DatePicker
