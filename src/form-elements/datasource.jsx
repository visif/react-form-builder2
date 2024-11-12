import React, { useEffect, useState } from 'react'
import ComponentHeader from './component-header'
import ComponentLabel from './component-label'

const DataSource = (props) => {
  const { defaultValue = {}, getDataSource, handleChange } = props || {}

  const [sourceList, setSourceList] = useState([])
  const [matchedList, setMatchedList] = useState([])
  const [searchText, setSearchText] = useState(defaultValue.value)
  const [selectedItem, setSelectedItem] = useState(defaultValue.selectedItem)
  const [defaultSelectedItem, setDefaultSelectedItem] = useState(
    defaultValue.selectedItem
  )
  const [isShowingList, setIsShowingList] = useState(false)
  const [sourceType] = useState(props.data.sourceType)

  useEffect(() => {
    const fetchData = async () => {
      if (typeof getDataSource === 'function') {
        const data = await getDataSource(props.data)
        setSourceList(data)
        setMatchedList(data)
      }
    }
    fetchData()
  }, [getDataSource, props.data])

  useEffect(() => {
    if (
      props.defaultValue &&
      JSON.stringify(props.defaultValue.selectedItem) !==
        JSON.stringify(defaultSelectedItem)
    ) {
      const _defaultValue = props.defaultValue || {}
      setSearchText(_defaultValue.value)
      setSelectedItem(_defaultValue.selectedItem)
      setDefaultSelectedItem(_defaultValue.selectedItem)
    }
  }, [props.defaultValue, defaultSelectedItem])

  const handleInputFocus = () => {
    setIsShowingList(true)
  }

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsShowingList(false)
    }, 200)
  }

  const debounceOnChange = (value) => {
    const matchData = sourceList.filter((item) => {
      return `${item.name}`.toLocaleLowerCase().includes(`${value}`.toLocaleLowerCase())
    })
    setSearchText(value)
    setMatchedList(matchData)
  }

  const handleOnChange = (event) => {
    if (event.key === 'Enter') {
      return
    }
    debounceOnChange(event.target.value)
  }

  const userProperties = props.getActiveUserProperties && props.getActiveUserProperties()

  const savedEditor = props.editor
  let isSameEditor = true
  if (savedEditor && savedEditor.userId && !!userProperties) {
    isSameEditor = userProperties.userId === savedEditor.userId
  }

  const inputProps = {
    type: 'text',
    className: 'form-control',
    name: props.data.field_name,
    value: searchText,
    disabled: !isSameEditor,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    onChange: handleOnChange,
  }

  if (props.mutable) {
    inputProps.defaultValue = props.defaultValue
  }

  let baseClasses = 'SortableItem rfb-item'
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak'
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} style={{ display: 'block' }} />
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '100%',
          }}
        >
          <div>
            <input {...inputProps} />
          </div>
          <div
            style={{
              position: 'absolute',
              zIndex: 99,
              top: '100%',
              left: 0,
              right: 0,
              height: 250,
              overflowY: 'auto',
              display: isShowingList ? 'block' : 'none',
            }}
          >
            {(matchedList || []).map((item) => (
              <div
                key={item.id}
                style={{
                  position: 'relative',
                  display: 'block',
                  padding: '0.75rem 1.25rem',
                  marginBottom: -1,
                  backgroundColor: '#fff',
                  border: '1px solid rgba(0, 0, 0, 0.125)',
                }}
                onClick={() => {
                  setSelectedItem(item)
                  setSearchText(item.name)
                  handleChange({
                    target: {
                      value: {
                        selectedItem: item,
                        searchText: item.name,
                      },
                    },
                  })
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataSource
