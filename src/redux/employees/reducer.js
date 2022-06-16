import {
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_ERROR,
  GET_SINGLE_EMPLOYEES_SUCCESS,
  GET_SINGLE_EMPLOYEES_PENDING,
  GET_SINGLE_EMPLOYEES_ERROR,
  ADD_EMPLOYEES_SUCCESS,
  ADD_EMPLOYEES_PENDING,
  ADD_EMPLOYEES_ERROR,
  EDIT_EMPLOYEES_SUCCESS,
  EDIT_EMPLOYEES_PENDING,
  EDIT_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_ERROR,
  FILL_EMPLOYEE,
  SET_MODAL,
  UPDATE_LIST,
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

    case GET_SINGLE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        employees: {
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          email: action.payload.data.email,
          password: action.payload.data.password,
          isActive: action.payload.data.isActive
        },
        message: action.payload.message
      };

    case GET_SINGLE_EMPLOYEES_PENDING:
      return { ...state, isLoading: true, message: 'Loading...' };

    case GET_SINGLE_EMPLOYEES_ERROR:
      return { ...state, isLoading: false, error: true, message: action.payload };

    case ADD_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        employees: {
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          email: action.payload.data.email,
          password: action.payload.data.password,
          projectId: action.payload.data.projectId,
          isActive: action.payload.data.isActive
        },
        message: action.payload.message
      };

    case ADD_EMPLOYEES_PENDING:
      return { ...state, isLoading: true, message: 'Loading...' };

    case ADD_EMPLOYEES_ERROR:
      return { ...state, isLoading: false, error: true, message: action.payload };

    case EDIT_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        employees: {
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          email: action.payload.data.email,
          password: action.payload.data.password,
          projectId: action.payload.data.projectId,
          isActive: action.payload.data.isActive
        },
        message: action.payload.message
      };

    case EDIT_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };

    case EDIT_EMPLOYEES_ERROR:
      return { ...state, isLoading: false, error: true, message: action.payload.message };

    case DELETE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: 'The employee was successfully deleted',
        error: false
      };

    case DELETE_EMPLOYEES_PENDING:
      return { ...state, isLoading: true, message: 'Loading...' };

    case DELETE_EMPLOYEES_ERROR:
      return { ...state, isLoading: false, error: true, message: action.payload.message };

    case FILL_EMPLOYEE:
      return { ...state, employees: { ...state.employee, ...action.payload } };

    case SET_MODAL:
      return { ...state, showModal: action.payload };

    case RESET_MESSAGE:
      return { ...state, employees: action.payload };

    case UPDATE_LIST:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};
