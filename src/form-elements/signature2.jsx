import React, { useState, useEffect } from 'react';
import ComponentHeader from './component-header';

const Signature2 = (props) => {
  const {
    defaultValue, getActiveUserProperties, data, editor, read_only: readOnly, handleChange,
  } = props;

  const [state, setState] = useState({
    defaultValue: defaultValue?.isSigned,
    isSigned: defaultValue?.isSigned,
    signedPerson: defaultValue?.signedPerson,
    signedPersonId: defaultValue?.signedPersonId,
    isError: false,
  });

  useEffect(() => {
    if (defaultValue?.isSigned === state.defaultValue) {
      return;
    }

    const value = {
      isSigned: defaultValue?.isSigned,
      signedPerson: defaultValue?.signedPerson,
      signedPersonId: defaultValue?.signedPersonId,
    };

    handleChange({
      target: {
        value: { ...value },
      },
    });

    setState({
      defaultValue: defaultValue?.isSigned,
      isError: false,
      ...value,
    });
  }, [defaultValue]);

  const clickToSign = () => {
    if (typeof getActiveUserProperties !== 'function') {
      return;
    }

    const userProperties = getActiveUserProperties();
    let roleLists = userProperties?.role || [];
    roleLists = roleLists.concat([userProperties?.name || '']);

    const position = `${data.position}`.toLocaleLowerCase().trim();

    if (
      (data.specificRole === 'specific' &&
        roleLists.some((item) => `${item}`.toLocaleLowerCase().trim() === position)) ||
      data.specificRole === 'notSpecific'
    ) {
      setState((current) => {
        const value = {
          isSigned: !current.isSigned,
          signedPerson: !current.isSigned ? userProperties.name : '',
          signedPersonId: !current.isSigned ? userProperties.userId : '',
        };

        handleChange({
          target: {
            value: { ...value },
          },
        });

        return {
          ...current,
          ...value,
        };
      });
    } else {
      if (!state.isError) {
        setState((current) => ({
          ...current,
          isError: true,
        }));

        setTimeout(() => {
          setState((current) => ({
            ...current,
            isError: false,
          }));
        }, 5000);
      }
      console.log('role and name does not match');
    }
  };

  const userProperties = getActiveUserProperties?.();
  const isSameEditor = editor?.userId && userProperties ? userProperties.userId === editor.userId : true;
  const hasRequiredLabel = data.required && !readOnly;

  return (
    <div className={`SortableItem rfb-item${data.pageBreakBefore ? ' alwaysbreak' : ''}`}>
      <ComponentHeader {...props} />
      <div
        className="form-group"
        onClick={() => {
          if (isSameEditor) {
            clickToSign();
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        {hasRequiredLabel && (
          <span
            className="label-required badge badge-danger"
            style={{ marginLeft: '60%' }}
          >
            Required
          </span>
        )}
        <h5 style={{ textAlign: 'center' }}>
          {state.isSigned ? 'Already signed' : '(Click to sign)'}
        </h5>
        <div
          style={{
            textAlign: 'center',
            marginTop: 8,
            marginBottom: 8,
            color: state.isError ? 'red' : 'black',
          }}
        >
          {state.isError ? 'You have no permission to sign' : '__________________'}
        </div>
        <h6 style={{ textAlign: 'center', minHeight: 20 }}>
          {state.isSigned && `(${state.signedPerson})`}
        </h6>
        <h6 style={{ textAlign: 'center' }}>
          {data.position || 'Placeholder Text'}
        </h6>
      </div>
    </div>
  );
};

export default Signature2;
