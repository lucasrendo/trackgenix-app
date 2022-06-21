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
  getSingleAdminSuccess,
  resetMessage,
  resetAdmin
} from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    try {
      dispatch(getAdminsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      if (!data.error) dispatch(getAdminsSuccess(data.data));
      else dispatch(getAdminsError(data.message));
    } catch (error) {
      dispatch(getAdminsError(error.toString()));
    }
  };
};

export const getSingleAdmin = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleAdminPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`);
      const data = await response.json();
      if (!data.error) {
        dispatch(getSingleAdminSuccess(data));
      } else {
        dispatch(getSingleAdminError(data.message));
      }
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
      const data = await response.json();
      if (!data.error) {
        dispatch(addAdminSuccess(data));
        dispatch(resetAdmin());
        return data.data;
      } else {
        dispatch(addAdminError(data.message));
      }
    } catch (error) {
      dispatch(addAdminError(error.toString()));
    }
  };
};

export const updateAdmin = (obj, id) => {
  return async (dispatch) => {
    try {
      dispatch(resetMessage());
      dispatch(updateAdminPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(obj)
      });
      const data = await response.json();
      if (!data.error) {
        dispatch(updateAdminSuccess(data));
        dispatch(resetAdmin());
      } else {
        dispatch(updateAdminError(data.message));
      }
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
      const data = await response.json();
      if (!data.error) {
        dispatch(deleteAdminSuccess(id));
        dispatch(resetAdmin());
      } else {
        dispatch(deleteAdminError(data.message));
      }
    } catch (error) {
      dispatch(deleteAdminError(error.toString()));
    }
  };
};
