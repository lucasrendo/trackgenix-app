import { getTimeSheetsRequest, deleteTimeSheetsRequest } from './thunks';
import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEETS_PENDING,
  DELETE_TIMESHEETS_SUCCESS,
  DELETE_TIMESHEETS_ERROR
} from './constants';

const getTimeSheetsPending = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

const getTimeSheetsFulfilled = (data) => {
  return {
    type: GET_TIMESHEETS_SUCCESS,
    payload: data
  };
};

const getTimeSheetsFailed = (error) => {
  return {
    type: GET_TIMESHEETS_ERROR,
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

const deleteTimeSheetsPending = () => {
  return {
    type: DELETE_TIMESHEETS_PENDING
  };
};

const deleteTimeSheetsFulfilled = (data) => {
  return {
    type: DELETE_TIMESHEETS_SUCCESS,
    payload: data
  };
};

const deleteTimeSheetsFailed = (message) => {
  return {
    type: DELETE_TIMESHEETS_ERROR,
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
