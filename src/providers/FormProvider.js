import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';

// Create context for the form state
const FormContext = createContext();

// Action types
const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
const RESET_FORM = 'RESET_FORM';
const SET_MULTIPLE_VALUES = 'SET_MULTIPLE_VALUES';

// Reducer to handle form state updates
const formReducer = (state, action) => {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      };
    case SET_MULTIPLE_VALUES:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.values,
        },
      };
    case RESET_FORM:
      return {
        ...state,
        values: action.initialValues || {},
      };
    default:
      return state;
  }
};

// Form provider component
export const FormProvider = ({ children, initialValues = {} }) => {
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
  });

  const setFieldValue = useCallback((field, value) => {
    dispatch({ type: SET_FIELD_VALUE, field, value });
  }, []);

  const setMultipleValues = useCallback((values) => {
    dispatch({ type: SET_MULTIPLE_VALUES, values });
  }, []);

  const resetForm = useCallback((newInitialValues) => {
    dispatch({ type: RESET_FORM, initialValues: newInitialValues });
  }, []);

  const value = {
    values: state.values,
    setFieldValue,
    setMultipleValues,
    resetForm,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

// Custom hook to use form context
export const useFormStore = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormStore must be used within a FormProvider');
  }
  return context;
};
