import React from 'react'
import ComponentHeader from './component-header'

const Section = (props) => {
  let baseClasses = 'SortableItem rfb-item'
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak'
  }

  return (
    <div className={baseClasses} id={props.data.header}>
      <ComponentHeader {...props} />
      <h5>{props.data.header}</h5>
      <hr />
    </div>
  )
}

export default Section
