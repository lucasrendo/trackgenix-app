import { GET_ADMINS_SUCCESS, GET_ADMINS_ERROR, GET_ADMINS_PENDING } from './constants';

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
