import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { formatDate } from '../functions/dateUtil'
import ComponentHeader from './component-header'

const Signature2 = (props) => {
  const inputField = useRef(null)
  const tableRef = useRef(null)

  const [defaultValue, setDefaultValue] = useState(
    props.defaultValue && props.defaultValue.isSigned
  )
  const [isSigned, setIsSigned] = useState(
    props.defaultValue && props.defaultValue.isSigned
  )
  const [signedPerson, setSignedPerson] = useState(
    props.defaultValue && props.defaultValue.signedPerson
  )
  const [signedPersonId, setSignedPersonId] = useState(
    props.defaultValue && props.defaultValue.signedPersonId
  )
  const [signedDateTime, setSignedDateTime] = useState(
    props.defaultValue && props.defaultValue.signedDateTime
  )
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    console.log('Signature useEffect')
    if (props.defaultValue && props.defaultValue.isSigned !== defaultValue) {
      setDefaultValue(props.defaultValue && props.defaultValue.isSigned)
      setIsSigned(props.defaultValue && props.defaultValue.isSigned)
      setIsError(false)
      setSignedPerson(props.defaultValue.signedPerson)
      setSignedPersonId(props.defaultValue && props.defaultValue.signedPersonId)
    }
  }, [props.defaultValue]) // Dependency array

  const clickToSign = () => {
    if (typeof props.getActiveUserProperties !== 'function') {
      return
    }

    const userProperties = props.getActiveUserProperties()
    let roleLists = (userProperties && userProperties.role) || []
    roleLists = roleLists.concat([(userProperties && userProperties.name) || ''])

    const position = `${props.data.position}`.toLocaleLowerCase().trim()

    if (
      props.data.specificRole === 'specific' &&
      roleLists.find((item) => `${item}`.toLocaleLowerCase().trim() === position)
    ) {
      setIsSigned((current) => {
        const newSigned = !current
        setSignedPerson(newSigned ? userProperties.name : '')
        setSignedPersonId(newSigned ? userProperties.userId : '')
        setSignedDateTime(newSigned ? dayjs().utc(true) : null)
        return newSigned
      })
    } else if (props.data.specificRole === 'notSpecific') {
      setIsSigned((current) => {
        const newSigned = !current
        setSignedPerson(newSigned ? userProperties.name : '')
        setSignedPersonId(newSigned ? userProperties.userId : '')
        setSignedDateTime(newSigned ? dayjs().utc(true) : null)
        return newSigned
      })
    } else {
      if (!isError) {
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 5000)
      }
      console.log('role and name does not match')
    }
  }

  const userProperties = props.getActiveUserProperties && props.getActiveUserProperties()
  const savedEditor = props.editor
  let isSameEditor = true
  if (savedEditor && savedEditor.userId && !!userProperties) {
    isSameEditor = userProperties.userId === savedEditor.userId
  }

  const hasRequiredLabel =
    props.data.hasOwnProperty('required') &&
    props.data.required === true &&
    !props.read_only

  return (
    <div
      ref={tableRef}
      className={`SortableItem rfb-item${
        props.data.pageBreakBefore ? ' alwaysbreak' : ''
      }`}
    >
      <ComponentHeader {...props} />
      <div
        className="form-group"
        onClick={() => {
          if (isSameEditor) {
            clickToSign()
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        {hasRequiredLabel && (
          <span
            className="label-required badge badge-danger"
            style={{
              marginLeft: '60%',
            }}
          >
            Required
          </span>
        )}
        <h5 style={{ textAlign: 'center' }}>
          {isSigned ? 'Already signed' : '(Click to sign)'}
        </h5>
        <div
          style={{
            textAlign: 'center',
            marginTop: 8,
            marginBottom: 8,
            color: isError ? 'red' : 'black',
          }}
        >
          {isError ? 'You have no permission to sign' : '__________________'}
        </div>
        <h6 style={{ textAlign: 'center', minHeight: 20 }}>
          {isSigned && `(${signedPerson})`}
        </h6>
        <h6 style={{ textAlign: 'center' }}>
          {props.data.position || 'Placeholder Text'}
        </h6>
        {signedDateTime && (
          <h6 style={{ textAlign: 'center' }}>{formatDate(signedDateTime)}</h6>
        )}
      </div>
    </div>
  )
}

export default Signature2
