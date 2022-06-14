import {
  getTimesheetPending,
  getTimesheetSuccess,
  getTimesheetError,
  deleteTimesheetPending,
  deleteTimesheetSuccess,
  deleteTimesheetError,
  resetMessage,
  resetTimesheet
} from './actions';

const resource = '/timesheets';
const url = `${process.env.REACT_APP_API_URL}/timesheets`;

export const getTasks = () => {
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

export const deleteTimesheet = (timesheet, id) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(timesheet)
      };
      dispatch(resetMessage());
      dispatch(deleteTimesheetPending());
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${resource}/${id}`,
        requestConfig
      );
      const data = await response.json();
      if (!data.error) {
        dispatch(deleteTimesheetSuccess(data));
        dispatch(resetTimesheet());
      } else {
        dispatch(deleteTimesheetError(data.message));
      }
    } catch (error) {
      dispatch(deleteTimesheetError(error));
    }
  };
};
