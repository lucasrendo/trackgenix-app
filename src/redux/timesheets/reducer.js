import {
  GET_TIMESHEET_PENDING,
  GET_TIMESHEET_SUCCESS,
  GET_TIMESHEET_ERROR,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_ERROR,
  RESET_MESSAGE,
  SET_MODAL,
  UPDATE_LIST
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: false,
  showModal: false,
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
        list: action.payload
      };
    case GET_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        showModal: true,
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
        showModal: true,
        message: action.payload
      };
    case DELETE_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        showModal: true,
        message: action.payload
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: ''
      };
    case SET_MODAL:
      return {
        ...state,
        showModal: action.payload
      };
    case UPDATE_LIST:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};
