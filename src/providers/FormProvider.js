import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from 'react';

// Action types
const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
const SET_MULTIPLE_VALUES = 'SET_MULTIPLE_VALUES';
const RESET_FORM = 'RESET_FORM';
const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';
const SET_CHECKBOX_VALUES = 'SET_CHECKBOX_VALUES';

// Helper functions for immutable array operations
const toggleArrayValue = (array = [], value) => {
  const newArray = [...(Array.isArray(array) ? array : [])];
  const index = newArray.findIndex((item) =>
    typeof item === 'object' ? item.value === value : item === value
  );

  if (index === -1) {
    newArray.push(value);
  } else {
    newArray.splice(index, 1);
  }

  return newArray;
};

const ensureArray = (value) => {
  if (value === null || value === undefined) return [];
  return Array.isArray(value) ? value : [value];
};

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

    case SET_MULTIPLE_VALUES: {
      // Handle both array and single values for each field
      const processedValues = Object.entries(action.values).reduce(
        (acc, [key, value]) => {
          // If the current field already has an array value, preserve array nature
          const isCurrentArray = Array.isArray(state.values[key]);
          acc[key] = isCurrentArray ? ensureArray(value) : value;
          return acc;
        },
        {}
      );

      return {
        ...state,
        values: {
          ...state.values,
          ...processedValues,
        },
      };
    }

    case TOGGLE_CHECKBOX:
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: toggleArrayValue(
            state.values[action.field],
            action.value
          ),
        },
      };

    case SET_CHECKBOX_VALUES:
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: ensureArray(action.values),
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

// Create context with a default value
const FormContext = createContext({
  values: {},
  setFieldValue: () => {},
  setMultipleValues: () => {},
  toggleCheckbox: () => {},
  setCheckboxValues: () => {},
  resetForm: () => {},
  getFieldValue: () => {},
});

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

  const toggleCheckbox = useCallback((field, value) => {
    dispatch({ type: TOGGLE_CHECKBOX, field, value });
  }, []);

  const setCheckboxValues = useCallback((field, values) => {
    dispatch({ type: SET_CHECKBOX_VALUES, field, values });
  }, []);

  const resetForm = useCallback((newInitialValues) => {
    dispatch({ type: RESET_FORM, initialValues: newInitialValues });
  }, []);

  const getFieldValue = useCallback(
    (field) => {
      return state.values[field];
    },
    [state.values]
  );

  const value = useMemo(
    () => ({
      values: state.values,
      setFieldValue,
      setMultipleValues,
      toggleCheckbox,
      setCheckboxValues,
      resetForm,
      getFieldValue,
    }),
    [
      state.values,
      setFieldValue,
      setMultipleValues,
      toggleCheckbox,
      setCheckboxValues,
      resetForm,
      getFieldValue,
    ]
  );

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
