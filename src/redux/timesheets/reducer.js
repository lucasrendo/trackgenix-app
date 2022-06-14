import {
  GET_TIMESHEET_PENDING,
  GET_TIMESHEET_SUCCESS,
  GET_TIMESHEET_ERROR,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_ERROR,
  RESET_TIMESHEET,
  RESET_MESSAGE
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: false,
  message: '',
  timesheet: undefined
};

export const timesheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case GET_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        message: action.payload.message,
        timesheet: action.payload.data
      };
    case GET_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case DELETE_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case DELETE_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        message: action.payload.message,
        timesheet: action.payload.data
      };
    case DELETE_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case RESET_TIMESHEET:
      return {
        ...state,
        timesheet: undefined
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
