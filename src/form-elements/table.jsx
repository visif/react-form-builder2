import React, { useState, useEffect } from 'react';
import ComponentHeader from './component-header';
import ComponentLabel from './component-label';

const Table = (props) => {
  const getInputValues = (
    defaultValue = [],
    columns = [],
    rows = 1,
    addingRows = 0,
    rowLabels = [],
  ) => {
    const result = [];
    const isFixedRow = rowLabels?.length > 0;
    const activeRows = (Math.max(0, isFixedRow ? rowLabels?.length : rows + addingRows)) || 1;
    Array.from(Array(Number(activeRows)).keys()).map((i) => {
      const current = [];
      columns.map((j, jIndex) => {
        let value = defaultValue[i] ? defaultValue[i][jIndex] ?? '' : '';
        if (isFixedRow && jIndex === 0) {
          value = rowLabels[i].text;
        }
        current.push(value);
      });
      result.push(current);
    });

    return result;
  };

  const rowsAdded =
    (props.defaultValue ? props.defaultValue.length : Number(props.data.rows)) -
    Number(props.data.rows);

  const [state, setState] = useState({
    rows: Number(props.data.rows),
    rowLabels: props.data.rowLabels,
    columns: props.data.columns,
    defaultValue: props.defaultValue,
    inputs: getInputValues(
      props.defaultValue,
      props.data.columns,
      Number(props.data.rows),
      rowsAdded,
      props.data.rowLabels,
    ),
    rowsAdded,
  });

  useEffect(() => {
    const newState = getDerivedStateFromProps(props, state);
    if (newState !== state) {
      setState(newState);
    }
  }, [props]);

  const getDerivedStateFromProps = (props, state) => {
    if (
      Number(props.data.rows) !== Number(state.rows) ||
      JSON.stringify(props.data.columns) !== JSON.stringify(state.columns) ||
      JSON.stringify(state.rowLabels) !== JSON.stringify(props.data.rowLabels)
    ) {
      return {
        rows: Number(props.data.rows),
        columns: props.data.columns,
        defaultValue: state.defaultValue,
        inputs: getInputValues(
          state.inputs,
          props.data.columns,
          Number(props.data.rows),
          state.rowsAdded,
          props.data.rowLabels,
        ),
        rowsAdded: state.rowsAdded,
        rowLabels: props.data.rowLabels,
      };
    }

    if (
      JSON.stringify(state.defaultValue) !== JSON.stringify(props.defaultValue)
    ) {
      const rowsAdded =
        (props.defaultValue
          ? props.defaultValue.length
          : Number(props.data.rows)) - Number(props.data.rows);
      return {
        rows: Number(props.data.rows),
        columns: props.data.columns,
        defaultValue: props.defaultValue,
        inputs: getInputValues(
          props.defaultValue,
          props.data.columns,
          Number(props.data.rows),
          rowsAdded,
          props.data.rowLabels,
        ),
        rowsAdded,
        rowLabels: props.data.rowLabels,
      };
    }

    return state;
  };

  const addRow = () => {
    setState((current) => ({
      ...current,
      rowsAdded: current.rowsAdded + 1,
      inputs: getInputValues(
        current.inputs,
        current.columns,
        current.rows,
        current.rowsAdded + 1,
      ),
    }));
  };

  const removeRow = () => {
    setState((current) => ({
      ...current,
      rowsAdded: current.rowsAdded - 1,
      inputs: getInputValues(
        current.inputs,
        current.columns,
        current.rows,
        current.rowsAdded - 1,
      ),
    }));
  };

  const renderRows = () => {
    const userProperties =
      props.getActiveUserProperties && props.getActiveUserProperties();

    const savedEditor = props.editor;
    let isSameEditor = true;
    if (savedEditor && savedEditor.userId && !!userProperties) {
      isSameEditor = userProperties.userId === savedEditor.userId;
    }

    const isFixedRow = state.rowLabels?.length > 0;
    const activeRows = (isFixedRow
      ? state.rowLabels?.length
      : state.rows + state.rowsAdded) || 0;

    return (
      <tbody>
        {Array.from(Array(Number(activeRows)).keys()).map((i) => (
          <tr key={`row${i}`}>
            {props.data?.columns?.map((j, jIndex) => {
              const isLabel = isFixedRow && jIndex === 0;

              if (isLabel) {
                return (
                  <td key={`label${i}`}>
                    <label>{state.rowLabels[i].text}</label>
                  </td>
                );
              }

              const value = state.inputs[i]
                ? state.inputs[i][jIndex] ?? ''
                : '';

              return (
                <td key={`cell${i}-${jIndex}`}>
                  <textarea
                    className="form-control"
                    style={
                      isLabel ? { border: 0, backgroundColor: 'inherit' } : {}
                    }
                    disabled={isLabel || !isSameEditor}
                    type="text"
                    value={value}
                    rows={1}
                    onChange={(event) => {
                      const { value } = event.target;
                      const array = [...state.inputs];
                      array[i][jIndex] = value;
                      setState({
                        ...state,
                        inputs: array,
                      });
                    }}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    );
  };

  const getColumnWidth = (totalWidthCount, width) => {
    const currentWidth = parseInt(width) ? Number(width) : 1;
    return `${(currentWidth / totalWidthCount) * 100}%`;
  };

  const userProperties =
    props.getActiveUserProperties && props.getActiveUserProperties();

  const savedEditor = props.editor;
  let isSameEditor = true;
  if (savedEditor && savedEditor.userId && !!userProperties) {
    isSameEditor = userProperties.userId === savedEditor.userId;
  }

  let baseClasses = 'SortableItem rfb-item';
  if (props?.data?.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }
  const totalWidthCount = (props.data?.columns || []).reduce(
    (previous, current) =>
      previous + (parseInt(current.width) ? Number(current.width) : 1),
    0,
  );
  const isFixedRow = state.rowLabels?.length > 0;

  return (
    <div className={baseClasses} key={`table-container-${props.id}`}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        <table
          className="table table-bordered"
          key={`table-${props.id}`}
        >
          <thead>
            <tr>
              {props.data?.columns?.map((col) => (
                <th
                  key={col.text}
                  scope="col"
                  style={{
                    width: getColumnWidth(totalWidthCount, col.width),
                  }}
                >
                  {col.text}
                </th>
              ))}
            </tr>
          </thead>
          {renderRows()}
        </table>
        {!isFixedRow && (
          <div style={{ textAlign: 'right' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={removeRow}
              style={{
                marginRight: 8,
                display: state.inputs.length > 0 ? 'initial' : 'none',
              }}
              disabled={!isSameEditor}
            >
              Remove Row
            </button>
            <button
              type="button"
              className="btn btn-info"
              disabled={!isSameEditor}
              onClick={addRow}
            >
              Add Row
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
