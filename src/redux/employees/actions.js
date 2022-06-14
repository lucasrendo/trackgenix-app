import {
  getEmployeesRequest,
  getUniqueEmployeesRequest,
  createEmployeeRequest,
  editEmployeesRequest,
  deleteEmployeesRequest
} from './thunks';
import {
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_ERROR,
  GET_UNIQUE_EMPLOYEES_SUCCESS,
  GET_UNIQUE_EMPLOYEES_PENDING,
  GET_UNIQUE_EMPLOYEES_ERROR,
  CREATE_EMPLOYEES_SUCCESS,
  CREATE_EMPLOYEES_PENDING,
  CREATE_EMPLOYEES_ERROR,
  EDIT_EMPLOYEES_SUCCESS,
  EDIT_EMPLOYEES_PENDING,
  EDIT_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_ERROR
} from './constants';

const getEmployeesSuccess = (data) => {
  return { type: GET_EMPLOYEES_SUCCESS, payload: data };
};
const getEmployeesPending = () => {
  return { type: GET_EMPLOYEES_PENDING };
};
const getEmployeesError = (error) => {
  return { type: GET_EMPLOYEES_ERROR, payload: error };
};

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(getEmployeesPending());
    const data = await getEmployeesRequest();
    if (!data.error) {
      dispatch(getEmployeesSuccess(data));
    } else {
      dispatch(getEmployeesError(data.message));
    }
  };
};

const getUniqueEmployeesSuccess = (data) => {
  return { type: GET_UNIQUE_EMPLOYEES_SUCCESS, payload: data };
};
const getUniqueEmployeesPending = () => {
  return { type: GET_UNIQUE_EMPLOYEES_PENDING };
};
const getUniqueEmployeesError = (message) => {
  return { type: GET_UNIQUE_EMPLOYEES_ERROR, payload: message };
};

export const getUniqueEmployees = () => {
  return async (dispatch) => {
    dispatch(getUniqueEmployeesPending());
    const data = await getUniqueEmployeesRequest();
    if (!data.error) {
      dispatch(getUniqueEmployeesSuccess(data));
    } else {
      dispatch(getUniqueEmployeesError(data.message));
    }
  };
};

const createEmployeesSuccess = (data) => {
  return { type: CREATE_EMPLOYEES_SUCCESS, payload: data };
};
const createEmployeesPending = () => {
  return { type: CREATE_EMPLOYEES_PENDING };
};
const createEmployeesError = (message) => {
  return { type: CREATE_EMPLOYEES_ERROR, payload: message };
};

export const createEmployees = () => {
  return async (dispatch) => {
    dispatch(createEmployeesPending());
    const data = await createEmployeeRequest();
    if (!data.error) {
      dispatch(createEmployeesSuccess(data));
    } else {
      dispatch(createEmployeesError(data.message));
    }
  };
};

const editEmployeesSuccess = (data) => {
  return { type: EDIT_EMPLOYEES_SUCCESS, payload: data };
};
const editEmployeesPending = () => {
  return { type: EDIT_EMPLOYEES_PENDING };
};
const editEmployeesError = (message) => {
  return { type: EDIT_EMPLOYEES_ERROR, payload: message };
};

export const editEmployees = () => {
  return async (dispatch) => {
    dispatch(editEmployeesPending());
    const data = await editEmployeesRequest();
    if (!data.error) {
      dispatch(editEmployeesSuccess(data));
    } else {
      dispatch(editEmployeesError(data.message));
    }
  };
};
const deleteEmployeesSuccess = (data) => {
  return { type: DELETE_EMPLOYEES_SUCCESS, payload: data };
};
const deleteEmployeesPending = () => {
  return { type: DELETE_EMPLOYEES_PENDING };
};
const deleteEmployeesError = (message) => {
  return { type: DELETE_EMPLOYEES_ERROR, payload: message };
};

export const deleteEmployees = () => {
  return async (dispatch) => {
    dispatch(deleteEmployeesPending());
    const data = await deleteEmployeesRequest();
    if (!data.error) {
      dispatch(deleteEmployeesSuccess(data));
    } else {
      dispatch(deleteEmployeesError(data.message));
    }
  };
};
