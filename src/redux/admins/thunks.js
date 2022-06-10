import { getAdminSuccess, getAdminError, getAdminPending } from './actions';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getAdminSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getAdminError(error.toString()));
      });
  };
};
