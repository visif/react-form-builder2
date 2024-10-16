import React from 'react';
import ComponentHeader from '../form-elements/component-header';
import ComponentLabel from '../form-elements/component-label';
import Dustbin from './dustbin';
import ItemTypes from '../ItemTypes';

const accepts = [ItemTypes.BOX, ItemTypes.CARD];

const MultiColumnRowBase = (props) => {
  const {
    controls,
    data,
    editModeOn,
    getDataById,
    setAsChild,
    removeChild,
    seq,
    className,
    index,
  } = props;
  const { childItems, pageBreakBefore } = data;
  let baseClasses = 'SortableItem rfb-item';
  if (pageBreakBefore) {
    baseClasses += ' alwaysbreak';
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} />
      <div>
        <ComponentLabel {...props} />
        <div className="row">
          {childItems.map((x, i) => (
            <div key={`${i}_${x || '_'}`} className={className}>
              {controls ? (
                controls[i]
              ) : (
                <Dustbin
                  style={{ width: '100%' }}
                  data={data}
                  accepts={accepts}
                  items={childItems}
                  col={i}
                  parentIndex={index}
                  editModeOn={editModeOn}
                  _onDestroy={() => removeChild(data, i)}
                  getDataById={getDataById}
                  setAsChild={setAsChild}
                  seq={seq}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TwoColumnRow = ({ data, className, ...rest }) => {
  const columnClassName = className || 'col-md-6';
  if (!data.childItems) {
    // eslint-disable-next-line no-param-reassign
    data.childItems = [null, null];
    data.isContainer = true;
  }
  return (
    <MultiColumnRowBase {...rest} className={columnClassName} data={data} />
  );
};

const ThreeColumnRow = ({ data, className, ...rest }) => {
  const columnClassName = className || 'col-md-4';
  if (!data.childItems) {
    // eslint-disable-next-line no-param-reassign
    data.childItems = [null, null, null];
    data.isContainer = true;
  }
  return (
    <MultiColumnRowBase {...rest} className={columnClassName} data={data} />
  );
};

const MultiColumnRow = ({ data, className, ...rest }) => {
  const colCount = data.col_count || 4;
  const columnClassName = className || (colCount === 4 ? 'col-md-3' : 'col');
  if (!data.childItems) {
    // eslint-disable-next-line no-param-reassign
    data.childItems = Array.from({ length: colCount }, () => null);
    data.isContainer = true;
  }
  return (
    <MultiColumnRowBase {...rest} className={columnClassName} data={data} />
  );
};

export { TwoColumnRow, ThreeColumnRow, MultiColumnRow };
