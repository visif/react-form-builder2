import React, { useEffect } from 'react'
import { Parser } from 'hot-formula-parser'
import ComponentHeader from './component-header'
import ComponentLabel from './component-label'

const FormulaInput = (props) => {
  const { defaultValue, data, variables, emitter, style, onValueChage } = props
  const fieldName = data?.field_name

  // Calculate initial value
  useEffect(() => {
    if (data?.formula && variables) {
      const parser = new Parser()
      Object.entries(variables).forEach(([key, value]) => {
        const parsedValue = parseFloat(value)
        if (!Number.isNaN(parsedValue)) {
          parser.setVariable(key, parsedValue)
        }
      })
      const newValue = parser.parse(data.formula)?.result || ''
      onValueChage(fieldName, newValue)
    }
  }, [data?.formula, variables, fieldName, onValueChage])

  // Handle variable changes
  const handleVariableChange = (params) => {
    const formula = data?.formula
    if (!formula) {
      return
    }

    const parser = new Parser()
    const parsedValue = parseFloat(params.value)
    let newVariables = { ...variables }

    if (!Number.isNaN(parsedValue)) {
      newVariables = { ...variables, [params.propKey]: parsedValue }
      Object.entries(newVariables).forEach(([key, value]) => {
        if (!Number.isNaN(value)) {
          parser.setVariable(key, value)
        }
      })
    }
    const newValue = parser.parse(formula)?.result || ''
    onValueChage(fieldName, newValue)
  }

  // Set up event listener
  useEffect(() => {
    const subscription = emitter?.addListener('variableChange', handleVariableChange)
    return () => subscription?.remove()
  }, [emitter, variables, data?.formula])

  const inputProps = {
    type: 'text',
    className: 'form-control',
    name: fieldName,
    value: defaultValue,
    disabled: true,
  }

  let baseClasses = 'SortableItem rfb-item'
  if (data?.pageBreakBefore) {
    baseClasses += ' alwaysbreak'
  }

  return (
    <div style={style} className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        <input {...inputProps} />
      </div>
    </div>
  )
}

export default FormulaInput
