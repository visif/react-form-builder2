import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import dayjs from 'dayjs';
import ComponentHeader from './component-header';
import ComponentLabel from './component-label';

const DatePicker = (props) => {
  const {
    handleChange: onChangeHandler,
    data,
    defaultValue,
    style,
    read_only: readOnly,
  } = props;

  const {
    showTimeSelect,
    showTimeSelectOnly,
    dateFormat = 'DD/MM/YYYY',
    timeFormat = 'HH:mm:ss',
    defaultToday,
    field_name: fieldName,
  } = data;

  // Determine the format based on time selection options
  const format = (() => {
    if (showTimeSelectOnly) return timeFormat;
    if (showTimeSelect) return `${dateFormat} ${timeFormat}`;
    return dateFormat;
  })();

  // Convert defaultValue to dayjs if exists
  const initialValue = (() => {
    if (defaultValue) return dayjs(defaultValue, format);
    if (defaultToday) return dayjs();
    return undefined;
  })();

  const handleChange = (date, dateString) => {
    onChangeHandler({
      target: {
        value: dateString,
      },
    });
  };

  let baseClasses = 'SortableItem rfb-item';
  if (data.pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div className={baseClasses} style={style}>
      <ComponentHeader {...props} />
      <div className="form-group">
        <ComponentLabel {...props} />
        <div>
          <AntDatePicker
            name={fieldName}
            onChange={handleChange}
            value={initialValue}
            format={format}
            showTime={showTimeSelect}
            disabled={readOnly}
            allowClear={true}
            placeholder={format.toLowerCase()}
            className="form-control"
            style={{ width: '100%' }}
            inputReadOnly={true} // Prevents keyboard input but allows picker interaction
            picker={showTimeSelectOnly ? 'time' : 'date'}
          />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
