import React, { useCallback, useEffect, useRef, useState } from 'react'
import update from 'immutability-helper'
import FormElementsEdit from './form-dynamic-edit'
import CustomDragLayer from './form-elements/component-drag-layer'
import useUndoRedo, { ACTION } from './functions/useUndoRedo'
import SortableFormElements from './sortable-form-elements'
import store from './stores/store'

const { PlaceHolder } = SortableFormElements

const Preview = (props) => {
  const { onLoad, onPost } = props

  const [data, setData] = useState(props.data || [])
  const [, setAnswerData] = useState({})
  const editForm = useRef(null)
  let seq = 0

  const { updateState } = useUndoRedo()

  const updateElement = (element) => {
    let found = false
    const newData = data.map((item) => {
      if (element.id === item.id) {
        found = true
        return element
      }
      return item
    })

    if (found) {
      seq = seq > 100000 ? 0 : seq + 1
      store.dispatch('updateOrder', newData)
      setData(newData)
    }
  }

  const manualEditModeOff = useCallback(() => {
    const { editElement } = props
    if (editElement && editElement.dirty) {
      editElement.dirty = false
      updateElement(editElement)
    }
    props.manualEditModeOff()
  }, [props])

  const editModeOff = useCallback(
    (e) => {
      if (editForm.current && !editForm.current.contains(e.target)) {
        manualEditModeOff()
      }
    },
    [props.editElement]
  )

  const onChange = (payload) => {
    const { data: newData, action } = payload || {
      data: [],
      action: ACTION.UPDATE,
    }

    const newAnswerData = {}

    newData.forEach((item) => {
      if (item && item.readOnly && props.variables[item.variableKey]) {
        newAnswerData[item.field_name] = props.variables[item.variableKey]
      }
    })

    setData(newData)
    setAnswerData(newAnswerData)

    if (action !== ACTION.UNDO && action !== ACTION.REDO) {
      updateState(newData)
    }
  }

  useEffect(() => {
    const { url, saveUrl, saveAlways, data: propData } = props

    store.setExternalHandler(onLoad, onPost)

    setData(propData || [])
    setAnswerData({})

    store.subscribe((state) => onChange(state.payload))
    store.dispatch('load', {
      loadUrl: url,
      saveUrl,
      data: propData || [],
      saveAlways,
    })

    document.addEventListener('mousedown', editModeOff)
    return () => {
      document.removeEventListener('mousedown', editModeOff)
    }
  }, [props, editModeOff])

  const getDataById = (id) => data.find((x) => x && x.id === id)

  const onDestroy = (item) => {
    if (item.childItems) {
      item.childItems.forEach((x) => {
        const child = getDataById(x)
        if (child) {
          store.dispatch('delete', child)
        }
      })
    }
    store.dispatch('delete', item)
  }

  const swapChildren = (dataList, item, child, col) => {
    if (child.col !== undefined && item.id !== child.parentId) {
      return false
    }
    if (!(child.col !== undefined && child.col !== col && item.childItems[col])) {
      return false
    }
    const oldId = item.childItems[col]
    const oldItem = getDataById(oldId)
    const oldCol = child.col
    const updatedItem = { ...item }
    updatedItem.childItems[oldCol] = oldId
    oldItem.col = oldCol
    item.childItems[col] = child.id
    child.col = col
    store.dispatch('updateOrder', data)
    return true
  }

  const setAsChild = (item, child, col, isBusy) => {
    if (swapChildren(data, item, child, col)) {
      return
    }
    if (isBusy) {
      return
    }
    const oldParent = getDataById(child.parentId)
    const oldCol = child.col
    item.childItems[col] = child.id
    child.col = col
    child.parentId = item.id
    child.parentIndex = data.indexOf(item)
    if (oldParent) {
      oldParent.childItems[oldCol] = null
    }
    const list = data.filter((x) => x && x.parentId === item.id)
    const toRemove = list.filter((x) => item.childItems.indexOf(x.id) === -1)
    let newData = data
    if (toRemove.length) {
      newData = data.filter((x) => toRemove.indexOf(x) === -1)
    }
    if (!getDataById(child.id)) {
      newData.push(child)
    }
    store.dispatch('updateOrder', newData)
    setData(newData)
  }

  const removeChild = (item, col) => {
    const oldId = item.childItems[col]
    const oldItem = getDataById(oldId)
    if (oldItem) {
      const newData = data.filter((x) => x !== oldItem)
      item.childItems[col] = null
      seq = seq > 100000 ? 0 : seq + 1
      store.dispatch('updateOrder', newData)
      setData(newData)
    }
  }

  const restoreCard = (item, id) => {
    const parent = getDataById(item.data.parentId)
    const oldItem = getDataById(id)
    if (parent && oldItem) {
      const newIndex = data.indexOf(oldItem)
      const newData = [...data]
      parent.childItems[oldItem.col] = null
      delete oldItem.parentId
      delete item.setAsChild
      delete item.parentIndex
      item.index = newIndex
      seq = seq > 100000 ? 0 : seq + 1
      store.dispatch('updateOrder', newData)
      setData(newData)
    }
  }

  const saveData = (dragCard, dragIndex, hoverIndex) => {
    const newData = update(data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    })
    setData(newData)
    store.dispatch('updateOrder', newData)
  }

  const insertCard = (item, hoverIndex, id) => {
    if (id) {
      restoreCard(item, id)
    } else {
      const newData = [...data]
      newData.splice(hoverIndex, 0, item)
      saveData(item, hoverIndex, hoverIndex)
      store.dispatch('insertItem', item)
      setData(newData)
    }
  }

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = data[dragIndex]
    saveData(dragCard, dragIndex, hoverIndex)
  }

  const cardPlaceHolder = (dragIndex, hoverIndex) => {
    // Dummy
  }

  const getElement = (item, index) => {
    if (item.custom) {
      if (!item.component || typeof item.component !== 'function') {
        item.component = props.registry.get(item.key)
      }
    }
    const SortableFormElement = SortableFormElements[item.element]

    if (SortableFormElement === null) {
      return null
    }
    return (
      <SortableFormElement
        id={item.id}
        seq={seq}
        index={index}
        moveCard={moveCard}
        insertCard={insertCard}
        mutable={false}
        parent={props.parent}
        editModeOn={props.editModeOn}
        isDraggable={true}
        key={item.id}
        sortData={item.id}
        data={item}
        getDataById={getDataById}
        setAsChild={setAsChild}
        removeChild={removeChild}
        _onDestroy={onDestroy}
        getDataSource={(params) => {
          if (params?.sourceType === 'name') {
            return [
              { id: 1, name: 'NameA lastNameA' },
              { id: 2, name: 'NameB lastNameB' },
            ]
          }
          if (params?.sourceType === 'department') {
            return [
              { id: 1, name: 'departmentA' },
              { id: 2, name: 'departmentB' },
            ]
          }
          if (params?.sourceType === 'role') {
            return [
              { id: 1, name: 'roleA' },
              { id: 2, name: 'roleB' },
            ]
          }
          if (params?.sourceType === 'form') {
            return [
              { id: 1, name: 'formA' },
              { id: 2, name: 'formB' },
            ]
          }
          return []
        }}
      />
    )
  }

  const showEditForm = () => {
    const handleUpdateElement = (element) => updateElement(element)

    const formElementEditProps = {
      showCorrectColumn: props.showCorrectColumn,
      files: props.files || [],
      manualEditModeOff,
      preview: this,
      element: props.editElement,
      updateElement: handleUpdateElement,
      onImageUpload: props.onImageUpload,
    }

    return <FormElementsEdit {...formElementEditProps} />
  }

  let classes = props.className || 'col-md-6 react-form-builder-preview float-left'
  if (props.editMode) {
    classes += ' is-editing'
  }
  const filteredData = data.filter((x) => !!x && !x.parentId)
  const items = filteredData.map((item, index) => getElement(item, index))

  return (
    <div className={classes} style={{ height: '100%', scrollbarWidth: 'none' }}>
      <div className="preview-toolbar">
        <span
          style={{
            border: '1px solid #ddd',
            padding: 8,
            marginRight: '4px',
            backgroundColor: '#ffffff',
          }}
          onClick={() => {
            const event = new window.KeyboardEvent('keydown', {
              key: 'z',
              ctrlKey: true,
            })
            document.dispatchEvent(event)
          }}
        >
          <i className="fas fa-history" style={{ marginRight: 8 }} />
          Undo
        </span>
        <span
          style={{
            border: '1px solid #ddd',
            padding: 8,
            backgroundColor: '#ffffff',
          }}
          onClick={() => {
            const event = new window.KeyboardEvent('keydown', {
              key: 'y',
              ctrlKey: true,
            })
            document.dispatchEvent(event)
          }}
        >
          <i className="fas fa-redo" style={{ marginRight: 8 }} />
          Redo
        </span>
      </div>
      <div className="edit-form" ref={editForm}>
        {props.editElement !== null && showEditForm()}
      </div>
      <div className="Sortable">{items}</div>
      <PlaceHolder
        id="form-place-holder"
        show={items.length === 0}
        index={items.length}
        moveCard={cardPlaceHolder}
        insertCard={insertCard}
      />
      <CustomDragLayer />
    </div>
  )
}

export default Preview
