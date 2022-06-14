import {
  GET_SUPER_ADMIN_SUCCESS,
  GET_SUPER_ADMIN_PENDING,
  GET_SUPER_ADMIN_ERROR,
  GET_SINGLE_SUPER_ADMIN_SUCCESS,
  GET_SINGLE_SUPER_ADMIN_PENDING,
  GET_SINGLE_SUPER_ADMIN_ERROR,
  DELETE_SUPER_ADMIN_SUCCESS,
  DELETE_SUPER_ADMIN_PENDING,
  DELETE_SUPER_ADMIN_ERROR,
  ADD_SUPER_ADMIN_SUCCESS,
  ADD_SUPER_ADMIN_PENDING,
  ADD_SUPER_ADMIN_ERROR,
  EDIT_SUPER_ADMIN_SUCCESS,
  EDIT_SUPER_ADMIN_PENDING,
  EDIT_SUPER_ADMIN_ERROR,
  SUPER_ADMIN_MODAL,
  SUPER_ADMIN_MESSAGE,
  UPDATE_LIST,
  RESET_MESSAGE,
  RESET_SUPER_ADMIN
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
export const getSingleSuperAdminSuccess = (id) => ({
  type: GET_SINGLE_SUPER_ADMIN_SUCCESS,
  payload: id
});

export const getSingleSuperAdminPending = () => ({
  type: GET_SINGLE_SUPER_ADMIN_PENDING
});

export const getSingleSuperAdminError = (error) => ({
  type: GET_SINGLE_SUPER_ADMIN_ERROR,
  payload: error
});

export const deleteSuperAdminSuccess = (id) => ({
  type: DELETE_SUPER_ADMIN_SUCCESS,
  payload: id
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

export const superAdminModal = (state) => ({
  type: SUPER_ADMIN_MODAL,
  payload: state
});

export const superAdminMessage = () => ({
  type: SUPER_ADMIN_MESSAGE
});

export const updateList = (newList) => ({
  type: UPDATE_LIST,
  payload: newList
});

export const resetMessage = () => ({
  type: RESET_MESSAGE
});

export const resetSuperAdmin = () => ({
  type: RESET_SUPER_ADMIN
});
