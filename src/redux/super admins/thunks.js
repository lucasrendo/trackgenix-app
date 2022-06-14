import { getSuperAdminSuccess, getSuperAdminPending, getSuperAdminError } from './actions';

const url = `${process.env.REACT_APP_API_URL}/super-admin`;
export const getSuperAdmins = () => {
  return async (dispatch) => {
    try {
      dispatch(getSuperAdminPending());
      const response = await fetch(url);
      const data = await response.json();
      dispatch(getSuperAdminSuccess(data.data));
    } catch (error) {
      dispatch(getSuperAdminError(error.message));
    }
  };
};
