import React from 'react';
import DragHandle from './component-drag-handle';

const HeaderBar = (props) => (
  <div className="toolbar-header">
    <span className="badge badge-secondary">{props.data.text}</span>
    <div className="toolbar-header-buttons">
      {props.data.element !== 'LineBreak' && (
        <div
          className="btn is-isolated"
          onClick={props.editModeOn?.bind(props.parent, props.data)}
        >
          <i className="is-isolated fas fa-edit"></i>
        </div>
      )}
      <div
        className="btn is-isolated"
        onClick={props.onDestroy?.bind(props, props.data)}
      >
        <i className="is-isolated fas fa-trash"></i>
      </div>
      <DragHandle
        data={props.data}
        index={props.index}
        onDestroy={props.onDestroy}
        setAsChild={props.setAsChild}
      />
    </div>
  </div>
);

export default HeaderBar;
