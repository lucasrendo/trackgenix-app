import {
  getSuperAdminSuccess,
  getSuperAdminPending,
  getSuperAdminError,
  getSingleSuperAdminSuccess,
  getSingleSuperAdminPending,
  getSingleSuperAdminError,
  deleteSuperAdminSuccess,
  deleteSuperAdminPending,
  deleteSuperAdminError,
  resetMessage,
  resetSuperAdmin
} from './actions';

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

export const getSingleSuperAdmins = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleSuperAdminPending());
      const response = await fetch(`${url}/super-admin/${id}`);
      const data = await response.json();
      dispatch(getSingleSuperAdminSuccess(data.data));
    } catch (error) {
      dispatch(getSingleSuperAdminError(error.message));
    }
  };
};

export const deleteSuperAdmins = (id) => {
  return async (dispatch) => {
    try {
      const reqConfig = {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      };
      dispatch(deleteSuperAdminPending());
      dispatch(resetMessage());
      const response = await fetch(`${url}/${id}`, reqConfig);
      const data = await response.json();
      if (!data.error) {
        dispatch(deleteSuperAdminSuccess());
        dispatch(resetSuperAdmin());
      }
    } catch (error) {
      dispatch(deleteSuperAdminError(error));
    }
  };
};
