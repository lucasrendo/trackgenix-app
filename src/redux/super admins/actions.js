import {
  GET_SUPER_ADMIN_SUCCESS,
  GET_SUPER_ADMIN_PENDING,
  GET_SUPER_ADMIN_ERROR,
  DELETE_SUPER_ADMIN_SUCCESS,
  DELETE_SUPER_ADMIN_PENDING,
  DELETE_SUPER_ADMIN_ERROR,
  ADD_SUPER_ADMIN_SUCCESS,
  ADD_SUPER_ADMIN_PENDING,
  ADD_SUPER_ADMIN_ERROR,
  EDIT_SUPER_ADMIN_SUCCESS,
  EDIT_SUPER_ADMIN_PENDING,
  EDIT_SUPER_ADMIN_ERROR
} from './constants';

export const getSuperAdminSuccess = (superAdmins) => ({
  type: GET_SUPER_ADMIN_SUCCESS,
  payload: superAdmins
});

export const getSuperAdminPending = () => ({
  type: GET_SUPER_ADMIN_PENDING
});

export const getSuperAdminError = (error) => ({
  type: GET_SUPER_ADMIN_ERROR,
  payload: error
});

export const deleteSuperAdminSuccess = (superAdmins) => ({
  type: DELETE_SUPER_ADMIN_SUCCESS,
  payload: superAdmins
});

export const deleteSuperAdminPending = () => ({
  type: DELETE_SUPER_ADMIN_PENDING
});

export const deleteSuperAdminError = (error) => ({
  type: DELETE_SUPER_ADMIN_ERROR,
  payload: error
});

export const addSuperAdminSuccess = (superAdmins) => ({
  type: ADD_SUPER_ADMIN_SUCCESS,
  payload: superAdmins
});

export const addSuperAdminPending = () => ({
  type: ADD_SUPER_ADMIN_PENDING
});

export const addSuperAdminError = (error) => ({
  type: ADD_SUPER_ADMIN_ERROR,
  payload: error
});

export const editSuperAdminSuccess = (superAdmins) => ({
  type: EDIT_SUPER_ADMIN_SUCCESS,
  payload: superAdmins
});

export const editSuperAdminPending = () => ({
  type: EDIT_SUPER_ADMIN_PENDING
});

export const editSuperAdminError = (error) => ({
  type: EDIT_SUPER_ADMIN_ERROR,
  payload: error
});
