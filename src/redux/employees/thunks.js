import {
  getEmployeesSuccess,
  getEmployeesPending,
  getEmployeesError,
  getUniqueEmployeesSuccess,
  getUniqueEmployeesPending,
  getUniqueEmployeesError,
  createEmployeesSuccess,
  createEmployeesPending,
  createEmployeesError,
  editEmployeesSuccess,
  editEmployeesPending,
  editEmployeesError,
  deleteEmployeesSuccess,
  deleteEmployeesPending,
  deleteEmployeesError,
  resetEmployee,
  resetMessage
} from './actions.js';

const resource = `${process.env.REACT_APP_API_URL}/employees`;

export const getUniqueEmployee = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getUniqueEmployeesPending());
      const response = await fetch(`${resource}/${id}`);
      const data = await response.json();
      if (!data.error) dispatch(getUniqueEmployeesSuccess(data.data));
      else dispatch(getUniqueEmployeesError(data.message));
    } catch (error) {
      dispatch(getUniqueEmployeesError(error));
    }
  };
};
export const getEmployees = () => {
  return async (dispatch) => {
    try {
      dispatch(getEmployeesPending());
      const response = await fetch(`${resource}`);
      const data = await response.json();
      if (!data.error) dispatch(getEmployeesSuccess(data.data));
      else dispatch(getEmployeesError(data.message));
    } catch (error) {
      dispatch(getUniqueEmployeesError(error));
    }
  };
};

export const createEmployee = (object) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(object)
      };
      dispatch(createEmployeesPending());
      const response = await fetch(`${resource}`, requestConfig);
      const data = await response.json();
      if (!data.error) {
        dispatch(createEmployeesSuccess(data.data));
        dispatch(resetEmployee());
      } else dispatch(createEmployeesError(data.message));
    } catch (error) {
      dispatch(createEmployeesError(error));
    }
  };
};

export const editEmployees = (object, id) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(object)
      };
      dispatch(editEmployeesPending());
      dispatch(resetMessage());
      const response = await fetch(`${resource}/${id}`, requestConfig);
      const data = await response.json();
      if (!data.error) {
        dispatch(editEmployeesSuccess());
        dispatch(resetEmployee());
      } else dispatch(editEmployeesError(data.message));
    } catch (error) {
      dispatch(editEmployeesError(error));
    }
  };
};

export const deleteEmployees = (id) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      };
      dispatch(deleteEmployeesPending());
      dispatch(resetMessage());
      const response = await fetch(`${resource}/${id}`, requestConfig);
      const data = await response.json();
      if (!data.error) {
        dispatch(deleteEmployeesSuccess());
        dispatch(resetEmployee());
      } else dispatch(deleteEmployeesError(data.message));
    } catch (error) {
      dispatch(deleteEmployeesError(error));
    }
  };
};
