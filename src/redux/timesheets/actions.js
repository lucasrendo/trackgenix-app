import {
  getTimeSheetsRequest,
  getSingleTimeSheetsRequest,
  deleteTimeSheetsRequest
} from './thunks';
import {
  GET_TIMESHEETS,
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_FULFILLED,
  GET_TIMESHEETS_FAILED,
  GET_SINGLE_TIMESHEETS,
  GET_SINGLE_TIMESHEETS_PENDING,
  GET_SINGLE_TIMESHEETS_FULFILLED,
  GET_SINGLE_TIMESHEETS_FAILED,
  DELETE_TIMESHEETS,
  DELETE_TIMESHEETS_PENDING,
  DELETE_TIMESHEETS_FULFILLED,
  DELETE_TIMESHEETS_FAILED
} from './constants';

const getTimeSheetsPending = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

const getTimeSheetsFulfilled = (data) => {
  return {
    type: GET_TIMESHEETS_FULFILLED,
    payload: data
  };
};

const getTimeSheetsFailed = (error) => {
  return {
    type: GET_TIMESHEETS_FAILED,
    payload: error
  };
};

export const getTimeSheets = () => {
  return async (dispatch) => {
    dispatch(getTimeSheetsPending());
    const data = await getTimeSheetsRequest();

    if (!data.error) dispatch(getTimeSheetsFulfilled(data));
    else dispatch(getTimeSheetsFailed(data.message));
  };
};

const getSingleTimeSheetsPending = () => {
  return {
    type: GET_SINGLE_TIMESHEETS_PENDING
  };
};

const getSingleTimeSheetsFulfilled = (data) => {
  return {
    type: GET_SINGLE_TIMESHEETS_FULFILLED,
    payload: data
  };
};

const getSingleTimeSheetsFailed = (message) => {
  return {
    type: GET_SINGLE_TIMESHEETS_FAILED,
    payload: message
  };
};

export const getSingleTimeSheets = () => {
  return async (dispatch) => {
    dispatch(getSingleTimeSheetsPending());
    const data = await getSingleTimeSheetsRequest();

    if (!data.error) dispatch(getSingleTimeSheetsFulfilled(data));
    else dispatch(getSingleTimeSheetsFailed(data.message));
  };
};

const deleteTimeSheetsPending = () => {
  return {
    type: DELETE_TIMESHEETS_PENDING
  };
};

const deleteTimeSheetsFulfilled = (data) => {
  return {
    type: DELETE_TIMESHEETS_FULFILLED,
    payload: data
  };
};

const deleteTimeSheetsFailed = (message) => {
  return {
    type: DELETE_TIMESHEETS_FAILED,
    payload: message
  };
};

export const deleteTimeSheets = () => {
  return async (dispatch) => {
    dispatch(deleteTimeSheetsPending());
    const data = await deleteTimeSheetsRequest();

    if (!data.error) dispatch(deleteTimeSheetsFulfilled(data));
    else dispatch(deleteTimeSheetsFailed(data.message));
  };
};
