import {
  loginPending,
  loginSuccess,
  loginError,
  getUserPending,
  getUserSuccess,
  getUserError
} from './reducer';
import firebase from 'helper/firebase';

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      const token = await response.user.getIdToken();
      const {
        claims: { role }
      } = await response.user.getIdTokenResult();
      return await dispatch(loginSuccess({ role, token }));
    } catch (error) {
      return dispatch(loginError(error));
    }
  };
};

export const getUser = () => {
  return async (dispatch) => {
    dispatch(getUserPending());
    const token = sessionStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/auth/user`, {
        headers: { token }
      });
      const responseJson = await response.json();
      dispatch(getUserSuccess(responseJson.data));
      return responseJson.data;
    } catch (error) {
      dispatch(getUserError(error));
    }
  };
};
