import React, { useState, useEffect, useRef } from 'react';
import { format, parse, parseISO } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import ComponentHeader from './component-header';
import ComponentLabel from './component-label';

const DatePicker = (props) => {
  const inputField = useRef(null);

  const updateFormat = (data, oldFormatMask) => {
    const { showTimeSelect, showTimeSelectOnly, showTimeInput } = data.data;
    const dateFormat =
      showTimeSelect && showTimeSelectOnly ? '' : data.data.dateFormat;
    const timeFormat =
      showTimeSelect || showTimeInput ? data.data.timeFormat : '';
    const formatMask = `${dateFormat} ${timeFormat}`.trim();
    const updated = formatMask !== oldFormatMask;

    return { updated, formatMask };
  };

  const updateDateTime = (data, state, formatMask) => {
    let value;
    let internalValue;
    const { defaultToday } = data.data;
    if (
      defaultToday &&
      (data.defaultValue === '' || data.defaultValue === undefined)
    ) {
      value = format(new Date(), formatMask);
      internalValue = new Date();
    } else {
      value = data.defaultValue;

      if (value === '' || value === undefined) {
        internalValue = undefined;
      } else {
        internalValue = parse(value, state.formatMask, new Date());
      }
    }
    return {
      value,
      internalValue,
      placeholder: formatMask.toLowerCase(),
      defaultToday,
      formatMask: state.formatMask,
    };
  };

  const { formatMask } = updateFormat(props, null);
  const initialState = updateDateTime(props, { formatMask }, formatMask);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const { updated, formatMask: newFormatMask } = updateFormat(
      props,
      state.formatMask
    );
    if (props.data.defaultToday !== state.defaultToday || updated) {
      const newState = updateDateTime(props, state, newFormatMask);
      setState(newState);
    }
  }, [props]);

  const handleChange = (dt) => {
    let placeholder;
    const { formatMask: stateFormatMask } = state;
    if (dt && dt.target) {
      placeholder =
        dt && dt.target && dt.target.value === ''
          ? stateFormatMask.toLowerCase()
          : '';
      const formattedDate = dt.target.value
        ? format(parseISO(dt.target.value), stateFormatMask)
        : '';
      setState({
        ...state,
        value: formattedDate,
        internalValue: formattedDate,
        placeholder,
      });
    } else {
      setState({
        ...state,
        value: dt ? format(dt, formatMask) : '',
        internalValue: dt,
        placeholder,
      });
    }
  };

  const { showTimeSelect, showTimeSelectOnly, showTimeInput } = props.data;
  const inputProps = {
    type: 'date',
    className: 'form-control',
    name: props.data.field_name,
  };
  const readOnly = props.data.readOnly || props.read_only;
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const placeholderText = state.formatMask.toLowerCase();

  if (props.mutable) {
    inputProps.defaultValue = props.defaultValue;
    inputProps.ref = inputField;
  }

  let baseClasses = 'SortableItem rfb-item';
  if (props.data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div className={baseClasses} style={{ ...props.style }}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        <div>
          {readOnly && (
            <input
              type="text"
              name={inputProps.name}
              ref={inputProps.ref}
              readOnly={readOnly}
              placeholder={state.placeholder}
              value={state.value}
              className="form-control"
            />
          )}
          {iOS && !readOnly && (
            <input
              type="date"
              name={inputProps.name}
              ref={inputProps.ref}
              onChange={handleChange}
              dateFormat="MM/DD/YYYY"
              value={state.value}
              className="form-control"
            />
          )}
          {!iOS && !readOnly && (
            <ReactDatePicker
              name={inputProps.name}
              ref={inputProps.ref}
              onChange={handleChange}
              selected={state.internalValue}
              todayButton={'Today'}
              className="form-control"
              isClearable={true}
              showTimeSelect={showTimeSelect}
              showTimeSelectOnly={showTimeSelectOnly}
              showTimeInput={showTimeInput}
              dateFormat={state.formatMask}
              portalId="root-portal"
              autoComplete="off"
              placeholderText={placeholderText}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
