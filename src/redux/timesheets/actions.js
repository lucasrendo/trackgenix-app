import {
  ADD_TIMESHEET_PENDING,
  ADD_TIMESHEET_SUCCESS,
  ADD_TIMESHEET_ERROR,
  EDIT_TIMESHEET_PENDING,
  EDIT_TIMESHEET_SUCCESS,
  EDIT_TIMESHEET_ERROR
} from './constants';

export const addTimesheetPending = () => {
  return {
    type: ADD_TIMESHEET_PENDING
  };
};

export const addTimesheetSuccess = (timesheet) => {
  return {
    type: ADD_TIMESHEET_SUCCESS,
    payload: timesheet
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

export const editTimesheetSuccess = (timesheet) => {
  return {
    type: EDIT_TIMESHEET_SUCCESS,
    payload: timesheet
  };
};

export const editTimesheetError = (error) => {
  return {
    type: EDIT_TIMESHEET_ERROR,
    payload: error
  };
};
