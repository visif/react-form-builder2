import React, { useEffect } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ItemTypes from '../ItemTypes';

const style = {
  cursor: 'move',
};

const dragHandleSource = {
  beginDrag(props) {
    const { data, index, onDestroy, setAsChild, getDataById } = props;
    return {
      itemType: ItemTypes.BOX,
      index: data.parentId ? -1 : index,
      parentIndex: data.parentIndex,
      id: data.id,
      col: data.col,
      onDestroy,
      setAsChild,
      getDataById,
      data,
    };
  },
};

const DragHandle = ({ connectDragSource, connectDragPreview }) => {
  useEffect(() => {
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true,
      });
    }
  }, [connectDragPreview]);

  return connectDragSource(
    <div className="btn is-isolated" style={style}>
      <i className="is-isolated fas fa-grip-vertical"></i>
    </div>
  );
};

export default DragSource(
  ItemTypes.BOX,
  dragHandleSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })
)(DragHandle);
