import {
  ADD_TIMESHEET_PENDING,
  ADD_TIMESHEET_SUCCESS,
  ADD_TIMESHEET_ERROR,
  EDIT_TIMESHEET_PENDING,
  EDIT_TIMESHEET_SUCCESS,
  EDIT_TIMESHEET_ERROR,
  GET_SINGLE_TIMESHEET_PENDING,
  GET_SINGLE_TIMESHEET_SUCCESS,
  GET_SINGLE_TIMESHEET_ERROR,
  RESET_TIMESHEET,
  FILL_TIMESHEET,
  RESET_MESSAGE
} from './constants';

export const getSingleTimesheetPending = () => {
  return {
    type: GET_SINGLE_TIMESHEET_PENDING
  };
};

export const getSingleTimesheetSuccess = (data) => {
  return {
    type: GET_SINGLE_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const getSingleTimesheetError = (error) => {
  return {
    type: GET_SINGLE_TIMESHEET_ERROR,
    payload: error
  };
};

export const addTimesheetPending = () => {
  return {
    type: ADD_TIMESHEET_PENDING
  };
};

export const addTimesheetSuccess = (data) => {
  return {
    type: ADD_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const addTimesheetError = (error) => {
  return {
    type: ADD_TIMESHEET_ERROR,
    payload: error
  };
};

export const editTimesheetPending = () => {
  return {
    type: EDIT_TIMESHEET_PENDING
  };
};

export const editTimesheetSuccess = (data) => {
  return {
    type: EDIT_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const editTimesheetError = (error) => {
  return {
    type: EDIT_TIMESHEET_ERROR,
    payload: error
  };
};

export const resetTimesheet = () => {
  return {
    type: RESET_TIMESHEET
  };
};

export const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  };
};

export const fillTimesheet = (userInput) => {
  return {
    type: FILL_TIMESHEET,
    payload: userInput
  };
};
