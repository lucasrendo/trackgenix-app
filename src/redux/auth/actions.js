import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  RESET_MESSAGE
} from './constants';

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const registerPending = () => {
  return {
    type: REGISTER_PENDING
  };
};

export const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  };
};

export const registerError = (error) => {
  return {
    type: REGISTER_ERROR,
    payload: error
  };
};

export const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  };
};
