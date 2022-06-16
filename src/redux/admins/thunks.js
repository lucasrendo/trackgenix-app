import { getAdminSuccess, getAdminError, getAdminPending } from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      dispatch(getAdminSuccess(data.data));
      return data.data;
    } catch (error) {
      dispatch(getAdminError(error.toString()));
    }
  };
};
