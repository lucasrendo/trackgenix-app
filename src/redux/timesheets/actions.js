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

export const getTimesheetPending = () => {
  return {
    type: GET_TIMESHEET_PENDING
  };
};

export const getTimesheetSuccess = (data) => {
  return {
    type: GET_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const getTimesheetError = (error) => {
  return {
    type: GET_TIMESHEET_ERROR,
    payload: error
  };
};

export const deleteTimesheetPending = () => {
  return {
    type: DELETE_TIMESHEET_PENDING
  };
};

export const deleteTimesheetSuccess = (data) => {
  return {
    type: DELETE_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const deleteTimesheetError = (error) => {
  return {
    type: DELETE_TIMESHEET_ERROR,
    payload: error
  };
};

export const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  };
};

export const setModal = (state) => {
  return {
    type: SET_MODAL,
    payload: state
  };
};

export const updateList = (newList) => {
  return {
    type: UPDATE_LIST,
    payload: newList
  };
};
