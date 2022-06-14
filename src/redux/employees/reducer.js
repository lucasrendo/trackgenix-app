import {
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_ERROR,
  GET_UNIQUE_EMPLOYEES_SUCCESS,
  GET_UNIQUE_EMPLOYEES_PENDING,
  GET_UNIQUE_EMPLOYEES_ERROR,
  CREATE_EMPLOYEES_SUCCESS,
  CREATE_EMPLOYEES_PENDING,
  CREATE_EMPLOYEES_ERROR,
  EDIT_EMPLOYEES_SUCCESS,
  EDIT_EMPLOYEES_PENDING,
  EDIT_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_ERROR,
  FILL_EMPLOYEE,
  FORMAT_EMPLOYEE_OBJECTS,
  RESET_MESSAGE
} from './constants';

const initialState = {
  isLoading: false,
  error: false,
  message: '',
  employee: undefined,
  list: []
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.payload
      };

    case GET_EMPLOYEES_PENDING:
      return { ...state, isLoading: true };

    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };

    case GET_UNIQUE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        employee: {
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          email: action.payload.data.email,
          password: action.payload.data.password,
          projectId: action.payload.data.assignedProjects,
          isActive: action.payload.data.isActive
        }
      };

    case GET_UNIQUE_EMPLOYEES_PENDING:
      return { ...state, isLoading: true };

    case GET_UNIQUE_EMPLOYEES_ERROR:
      return { ...state, isLoading: false, error: true, message: action.payload };

    case CREATE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        employees: action.payload.data,
        message: action.payload.message
      };

    case CREATE_EMPLOYEES_PENDING:
      return { ...state, isLoading: true };

    case CREATE_EMPLOYEES_ERROR:
      return { ...state, isLoading: false, error: true, message: action.payload };

    case EDIT_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        employees: action.payload.data,
        message: action.payload.message
      };

    case EDIT_EMPLOYEES_PENDING:
      return { ...state, isLoading: true };

    case EDIT_EMPLOYEES_ERROR:
      return { ...state, isLoading: false, error: true, message: action.payload };

    case DELETE_EMPLOYEES_SUCCESS:
      return {};

    case DELETE_EMPLOYEES_PENDING:
      return { ...state, isLoading: true };

    case DELETE_EMPLOYEES_ERROR:
      return { ...state, isLoading: false, error: true, message: action.payload };

    case FILL_EMPLOYEE:
      return { ...state, employee: { ...state.employee, ...action.payload } };

    case FORMAT_EMPLOYEE_OBJECTS:
      return {};

    case RESET_MESSAGE:
      return { ...state, message: '' };

    default:
      return state;
  }
};
