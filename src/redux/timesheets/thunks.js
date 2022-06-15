import {
  getTimesheetPending,
  getTimesheetSuccess,
  getTimesheetError,
  deleteTimesheetPending,
  deleteTimesheetSuccess,
  deleteTimesheetError
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
