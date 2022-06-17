import {
  getTimesheetPending,
  getTimesheetSuccess,
  getTimesheetError,
  deleteTimesheetPending,
  deleteTimesheetSuccess,
  deleteTimesheetError,
  addTimesheetError,
  addTimesheetPending,
  addTimesheetSuccess,
  editTimesheetError,
  editTimesheetPending,
  editTimesheetSuccess,
  getSingleTimesheetError,
  getSingleTimesheetPending,
  getSingleTimesheetSuccess,
  resetMessage,
  resetTimesheet
} from './actions';

const resource = '/timesheets';
const url = `${process.env.REACT_APP_API_URL}/timesheets`;

export const getTimesheet = () => {
  return async (dispatch) => {
    try {
      dispatch(getTimesheetPending());
      const response = await fetch(url);
      const data = await response.json();

      if (!data.error) dispatch(getTimesheetSuccess(data.data));
      else dispatch(getTimesheetError(data.message));
    } catch (error) {
      dispatch(getTimesheetError(error));
    }
  };
};

export const deleteTimesheet = (id) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
      };
      dispatch(deleteTimesheetPending());
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${resource}/${id}`,
        requestConfig
      );
      const data = await response.json();
      dispatch(deleteTimesheetSuccess(data.message));
    } catch (error) {
      dispatch(deleteTimesheetError(error.message));
    }
  };
};

export const getSingleTimesheet = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleTimesheetPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`);
      const data = await response.json();
      if (!data.error) {
        dispatch(getSingleTimesheetSuccess(data));
      } else {
        dispatch(getSingleTimesheetError(data.message));
      }
    } catch (error) {
      dispatch(getSingleTimesheetError(error));
    }
  };
};

export const addTimesheet = (timesheet) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(timesheet)
      };
      dispatch(addTimesheetPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}`, requestConfig);
      const data = await response.json();
      if (!data.error) {
        dispatch(addTimesheetSuccess(data));
        dispatch(resetTimesheet());
      } else {
        dispatch(addTimesheetError(data.message));
      }
    } catch (error) {
      dispatch(addTimesheetError(error));
    }
  };
};

export const editTimesheet = (timesheet, id) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(timesheet)
      };
      dispatch(resetMessage());
      dispatch(editTimesheetPending());
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${resource}/${id}`,
        requestConfig
      );
      const data = await response.json();
      if (!data.error) {
        dispatch(editTimesheetSuccess(data));
        dispatch(resetTimesheet());
      } else {
        dispatch(editTimesheetError(data.message));
      }
    } catch (error) {
      dispatch(editTimesheetError(error));
    }
  };
};
