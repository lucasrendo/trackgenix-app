import {
  getTimesheetsByEmployeePending,
  getTimesheetsByEmployeeSuccess,
  getTimesheetsByEmployeeError
} from './actions';

const url = `${process.env.REACT_APP_API_URL}/timesheets/get-by-employee`;

export const getTimesheetsByEmployee = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getTimesheetsByEmployeePending());
      const response = await fetch(`${url}/${id}`);
      const data = await response.json();
      if (!data.error) {
        dispatch(getTimesheetsByEmployeeSuccess(data));
      } else {
        dispatch(getTimesheetsByEmployeeError(data.message));
      }
    } catch (error) {
      dispatch(getTimesheetsByEmployeeError(error));
    }
  };
};
