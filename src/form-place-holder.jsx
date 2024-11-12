import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

const PLACE_HOLDER = 'form-place-holder'
const PLACE_HOLDER_HIDDEN = 'form-place-holder-hidden'

const PlaceHolder = ({ intl, show, text }) => {
  const placeHolderClass = show ? PLACE_HOLDER : PLACE_HOLDER_HIDDEN
  // eslint-disable-next-line no-nested-ternary
  const placeHolder = show
    ? text === 'Dropzone'
      ? intl.formatMessage({ id: 'drop-zone' })
      : text
    : ''

  return (
    <div className={placeHolderClass}>
      <div>{placeHolder}</div>
    </div>
  )
}

PlaceHolder.propTypes = {
  text: PropTypes.string,
  show: PropTypes.bool,
  intl: PropTypes.object.isRequired,
}

export default injectIntl(PlaceHolder)
