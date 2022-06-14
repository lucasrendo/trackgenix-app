import { getTimeSheets, getSingleTimeSheets, deleteTimeSheets } from './actions';
import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_FULFILLED,
  GET_TIMESHEETS_FAILED,
  GET_SINGLE_TIMESHEETS_PENDING,
  GET_SINGLE_TIMESHEETS_FULFILLED,
  GET_SINGLE_TIMESHEETS_FAILED,
  DELETE_TIMESHEETS_PENDING,
  DELETE_TIMESHEETS_FULFILLED,
  DELETE_TIMESHEETS_FAILED
} from './constants';

const initialState = {
  isLoading: false,
  error: '',
  message: '',
  task: {},
  list: []
};

export const timesheetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_PENDING:
      return { ...state, isLoading: true };
    case GET_TIMESHEETS_FULFILLED:
      return {
        ...state,
        isLoading: false
      };
    case GET_TIMESHEETS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case GET_SINGLE_TIMESHEETS_PENDING:
      return { ...state, isLoading: true };
    case GET_SINGLE_TIMESHEETS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        timesheets: action.payload
      };
    case GET_SINGLE_TIMESHEETS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_TIMESHEETS_PENDING:
      return { ...state, isLoading: true };
    case DELETE_TIMESHEETS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        timesheets: action.payload
      };
    case DELETE_TIMESHEETS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
  }
};
