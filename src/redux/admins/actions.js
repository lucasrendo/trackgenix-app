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
  DELETE_ADMIN_SUCCESS,
  GET_SINGLE_ADMIN_ERROR,
  GET_SINGLE_ADMIN_PENDING,
  GET_SINGLE_ADMIN_SUCCESS,
  UPDATE_LIST,
  RESET_MESSAGE,
  RESET_ADMIN,
  SET_MODAL
} from './constants';

export const getAdminsPending = () => ({
  type: GET_ADMINS_PENDING
});

export const getAdminsSuccess = (data) => ({
  type: GET_ADMINS_SUCCESS,
  payload: data
});

export const getAdminsError = (error) => ({
  type: GET_ADMINS_ERROR,
  payload: error
});

export const getSingleAdminPending = () => ({
  type: GET_SINGLE_ADMIN_PENDING
});

export const getSingleAdminSuccess = (admin) => ({
  type: GET_SINGLE_ADMIN_SUCCESS,
  payload: admin
});

export const getSingleAdminError = (error) => ({
  type: GET_SINGLE_ADMIN_ERROR,
  payload: error
});

export const addAdminPending = () => ({
  type: ADD_ADMIN_PENDING
});

export const addAdminSuccess = (data) => ({
  type: ADD_ADMIN_SUCCESS,
  payload: data
});

export const addAdminError = (error) => ({
  type: ADD_ADMIN_ERROR,
  payload: error
});

export const updateAdminSuccess = (admin) => ({
  type: UPDATE_ADMIN_SUCCESS,
  payload: admin
});

export const updateAdminPending = () => ({
  type: UPDATE_ADMIN_PENDING
});

export const updateAdminError = (error) => ({
  type: UPDATE_ADMIN_ERROR,
  payload: error
});

export const deleteAdminSuccess = (message) => ({
  type: DELETE_ADMIN_SUCCESS,
  payload: message
});

export const deleteAdminPending = () => ({
  type: DELETE_ADMIN_PENDING
});

export const deleteAdminError = (error) => ({
  type: DELETE_ADMIN_ERROR,
  payload: error
});

export const updateList = (newList) => {
  return {
    type: UPDATE_LIST,
    payload: newList
  };
};

export const resetMessage = () => ({
  type: RESET_MESSAGE
});

export const resetAdmin = () => ({
  type: RESET_ADMIN
});

export const setModal = (state) => {
  return {
    type: SET_MODAL,
    payload: state
  };
};
