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
  DELETE_EMPLOYEES_ERROR,
  RESET_EMPLOYEE,
  FILL_EMPLOYEE,
  FORMAT_EMPLOYEE_OBJECTS,
  SET_MODAL,
  RESET_MESSAGE,
  UPDATE_LIST
} from './constants';

export const getEmployeesSuccess = (data) => {
  return { type: GET_EMPLOYEES_SUCCESS, payload: data };
};

export const getEmployeesPending = () => {
  return { type: GET_EMPLOYEES_PENDING };
};

export const getEmployeesError = (error) => {
  return { type: GET_EMPLOYEES_ERROR, payload: error };
};

export const getUniqueEmployeesSuccess = (data) => {
  return { type: GET_UNIQUE_EMPLOYEES_SUCCESS, payload: data };
};

export const getUniqueEmployeesPending = () => {
  return { type: GET_UNIQUE_EMPLOYEES_PENDING };
};

export const getUniqueEmployeesError = (message) => {
  return { type: GET_UNIQUE_EMPLOYEES_ERROR, payload: message };
};

export const createEmployeesSuccess = (data) => {
  return { type: CREATE_EMPLOYEES_SUCCESS, payload: data };
};

export const createEmployeesPending = () => {
  return { type: CREATE_EMPLOYEES_PENDING };
};

export const createEmployeesError = (message) => {
  return { type: CREATE_EMPLOYEES_ERROR, payload: message };
};

export const editEmployeesSuccess = (data) => {
  return { type: EDIT_EMPLOYEES_SUCCESS, payload: data };
};

export const editEmployeesPending = () => {
  return { type: EDIT_EMPLOYEES_PENDING };
};

export const editEmployeesError = (message) => {
  return { type: EDIT_EMPLOYEES_ERROR, payload: message };
};

export const deleteEmployeesSuccess = (data) => {
  return { type: DELETE_EMPLOYEES_SUCCESS, payload: data };
};

export const deleteEmployeesPending = () => {
  return { type: DELETE_EMPLOYEES_PENDING };
};

export const deleteEmployeesError = (message) => {
  return { type: DELETE_EMPLOYEES_ERROR, payload: message };
};

export const resetEmployee = () => {
  return { type: RESET_EMPLOYEE };
};

export const fillEmployee = (userInput) => {
  return { type: FILL_EMPLOYEE, payload: userInput };
};

export const formatEmployeeObject = (object) => {
  return { type: FORMAT_EMPLOYEE_OBJECTS, payload: object };
};

export const resetMessage = () => {
  return { type: RESET_MESSAGE };
};

export const setModal = (state) => {
  return { type: SET_MODAL, payload: state };
};

export const updateList = (newList) => {
  return { type: UPDATE_LIST, payload: newList };
};
