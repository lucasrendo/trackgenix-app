import {
  GET_TIMESHEETS_BY_EMPLOYEE_PENDING,
  GET_TIMESHEETS_BY_EMPLOYEE_SUCCESS,
  GET_TIMESHEETS_BY_EMPLOYEE_ERROR,
  RESET_MESSAGE
} from './constants';

const initialState = {
  isLoading: false,
  error: false,
  message: '',
  list: []
};

export const employeeTimesheetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_BY_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TIMESHEETS_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        message: action.payload.message,
        list: action.payload.data
      };
    case GET_TIMESHEETS_BY_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: ''
      };
    default:
      return state;
  }
};
