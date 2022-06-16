import {
  getEmployeesSuccess,
  getEmployeesPending,
  getEmployeesError,
  getSingleEmployeesSuccess,
  getSingleEmployeesPending,
  getSingleEmployeesError,
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

const employeeArray = (employee) => {
  const data = {
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    password: employee.password,
    assignedProjects: [employee.assignedProjects],
    isActive: employee.isActive
  };
  return data;
};

export const getSingleEmployee = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleEmployeesPending());
      const response = await fetch(`${resource}/${id}`);
      const data = await response.json();
      if (!data.error) {
        dispatch(getSingleEmployeesSuccess(data));
      } else {
        dispatch(getSingleEmployeesError(data.message));
      }
    } catch (error) {
      dispatch(getSingleEmployeesError(error));
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
      dispatch(getSingleEmployeesError(error));
    }
  };
};

export const createEmployee = (obj) => {
  return async (dispatch) => {
    try {
      const object = employeeArray(obj);
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
        dispatch(createEmployeesSuccess(data));
        dispatch(resetEmployee());
      } else dispatch(createEmployeesError(data.message));
    } catch (error) {
      dispatch(createEmployeesError(error));
    }
  };
};

export const editEmployees = (obj, id) => {
  return async (dispatch) => {
    try {
      const object = employeeArray(obj);
      const requestConfig = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(object)
      };
      dispatch(resetMessage());
      dispatch(editEmployeesPending());
      const response = await fetch(`${resource}/${id}`, requestConfig);
      const data = await response.json();
      if (!data.error) {
        dispatch(editEmployeesSuccess(data));
        dispatch(resetEmployee());
      } else dispatch(editEmployeesError(data.message));
    } catch (error) {
      dispatch(editEmployeesError(error.toString()));
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
