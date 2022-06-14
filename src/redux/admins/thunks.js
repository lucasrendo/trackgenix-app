import {
  getAdminsSuccess,
  getAdminsError,
  getAdminsPending,
  addAdminError,
  addAdminPending,
  addAdminSuccess,
  updateAdminError,
  updateAdminPending,
  updateAdminSuccess,
  deleteAdminError,
  deleteAdminPending,
  deleteAdminSuccess,
  getSingleAdminError,
  getSingleAdminPending,
  getSingleAdminSuccess
} from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const response_1 = await response.json();
      dispatch(getAdminsSuccess(response_1.data));
      return response_1.data;
    } catch (error) {
      dispatch(getAdminsError(error.toString()));
    }
  };
};

export const getSingleAdmin = (id) => {
  return async (dispatch) => {
    dispatch(getSingleAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`);
      const response_1 = await response.json();
      dispatch(getSingleAdminSuccess(response_1.data));
      return response_1.data;
    } catch (error) {
      dispatch(getSingleAdminError(error.toString()));
    }
  };
};

export const addAdmin = (obj) => {
  return async (dispatch) => {
    dispatch(addAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
      });
      const response_1 = await response.json();
      dispatch(addAdminSuccess(response_1.data));
      return response_1.data;
    } catch (error) {
      dispatch(addAdminError(error.toString()));
    }
  };
};

export const updateAdmin = (id) => {
  return async (dispatch) => {
    dispatch(updateAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const response_1 = await response.json();
      dispatch(updateAdminSuccess(response_1.data));
      return response_1.data;
    } catch (error) {
      dispatch(updateAdminError(error.toString()));
    }
  };
};

export const deleteAdmin = (id) => {
  return async (dispatch) => {
    dispatch(deleteAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const response_1 = await response.json();
      dispatch(deleteAdminSuccess(response_1.data));
      return response_1.data;
    } catch (error) {
      dispatch(deleteAdminError(error.toString()));
    }
  };
};
