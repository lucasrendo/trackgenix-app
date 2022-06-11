import { getAdminSuccess, getAdminError, getAdminPending } from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const response_1 = await response.json();
      dispatch(getAdminSuccess(response_1.data));
      return response_1.data;
    } catch (error) {
      dispatch(getAdminError(error.toString()));
    }
  };
};
