import {
  GET_TIMESHEETS_BY_EMPLOYEE_PENDING,
  GET_TIMESHEETS_BY_EMPLOYEE_SUCCESS,
  GET_TIMESHEETS_BY_EMPLOYEE_ERROR,
  RESET_MESSAGE
} from './constants';

export const getTimesheetsByEmployeePending = () => {
  return { type: GET_TIMESHEETS_BY_EMPLOYEE_PENDING };
};

export const getTimesheetsByEmployeeSuccess = (data) => {
  return { type: GET_TIMESHEETS_BY_EMPLOYEE_SUCCESS, payload: data };
};

export const getTimesheetsByEmployeeError = (error) => {
  return { type: GET_TIMESHEETS_BY_EMPLOYEE_ERROR, payload: error };
};

export const resetMessage = () => {
  return { type: RESET_MESSAGE };
};
