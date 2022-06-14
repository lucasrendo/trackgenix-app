import {
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ADMINS_PENDING,
  ADD_ADMIN_ERROR,
  ADD_ADMIN_PENDING,
  ADD_ADMIN_SUCCESS,
  UPDATE_ADMIN_ERROR,
  UPDATE_ADMIN_PENDING,
  UPDATE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS
} from './constants';

export const getAdminsSuccess = (admins) => ({
  type: GET_ADMINS_SUCCESS,
  payload: admins
});

export const getAdminsPending = () => ({
  type: GET_ADMINS_PENDING
});

export const getAdminsError = (error) => ({
  type: GET_ADMINS_ERROR,
  payload: error
});

export const addAdminSuccess = (admins) => ({
  type: ADD_ADMIN_SUCCESS,
  payload: admins
});

export const addAdminPending = () => ({
  type: ADD_ADMIN_PENDING
});

export const addAdminError = (error) => ({
  type: ADD_ADMIN_ERROR,
  payload: error
});

export const updateAdminSuccess = (admins) => ({
  type: UPDATE_ADMIN_SUCCESS,
  payload: admins
});

export const updateAdminPending = () => ({
  type: UPDATE_ADMIN_PENDING
});

export const updateAdminError = (error) => ({
  type: UPDATE_ADMIN_ERROR,
  payload: error
});

export const deleteAdminSuccess = (admins) => ({
  type: DELETE_ADMIN_SUCCESS,
  payload: admins
});

export const deleteAdminPending = () => ({
  type: DELETE_ADMIN_PENDING
});

export const deleteAdminError = (error) => ({
  type: DELETE_ADMIN_ERROR,
  payload: error
});
