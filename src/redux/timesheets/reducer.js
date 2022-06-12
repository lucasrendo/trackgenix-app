import {
  ADD_TIMESHEET_PENDING,
  ADD_TIMESHEET_SUCCESS,
  ADD_TIMESHEET_ERROR,
  EDIT_TIMESHEET_PENDING,
  EDIT_TIMESHEET_SUCCESS,
  EDIT_TIMESHEET_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: ''
};

let updatedTimesheet = [];

export const timesheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false
      };
    case ADD_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case EDIT_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((timesheet) => {
          if (timesheet._id === action.payload._id) {
            return action.payload;
          }
          return timesheet;
        })
      };
    case EDIT_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
