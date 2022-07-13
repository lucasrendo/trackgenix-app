import {
  getAdminsSuccess,
  getAdminsError,
  getAdminsPending,
  addAdminError,
  addAdminPending,
  addAdminSuccess,
  editAdminError,
  editAdminPending,
  editAdminSuccess,
  deleteAdminError,
  deleteAdminPending,
  deleteAdminSuccess,
  getSingleAdminError,
  getSingleAdminPending,
  getSingleAdminSuccess
} from 'redux/admins/actions';

const url = `${process.env.REACT_APP_API_URL}/super-admin`;

export const getAdmins = () => {
  return async (dispatch) => {
    try {
      dispatch(getAdminsPending());

      const response = await fetch(`${url}/admins`);
      const data = await response.json();

      return !data.error
        ? dispatch(getAdminsSuccess(data.data))
        : dispatch(getAdminsError(data.message));
    } catch (error) {
      return dispatch(getAdminsError(error));
    }
  };
};

export const getSingleAdmin = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleAdminPending());

      const response = await fetch(`${url}/admins/${id}`);
      const data = await response.json();

      return !data.error
        ? dispatch(getSingleAdminSuccess(data))
        : dispatch(getSingleAdminError(data.message));
    } catch (error) {
      return dispatch(getSingleAdminError(error));
    }
  };
};

export const addAdmin = (obj) => {
  return async (dispatch) => {
    try {
      dispatch(addAdminPending());
      const dataOptions = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
      };

      const response = await fetch(`${url}/admins`, dataOptions);
      const data = await response.json();

      return !data.error ? dispatch(addAdminSuccess(data)) : dispatch(addAdminError(data.message));
    } catch (error) {
      dispatch(addAdminError(error));
    }
  };
};

export const editAdmin = (obj, id) => {
  return async (dispatch) => {
    try {
      dispatch(editAdminPending());
      const dataOptions = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(obj)
      };

      const response = await fetch(`${url}/admins/${id}`, dataOptions);
      const data = await response.json();

      return !data.error
        ? dispatch(editAdminSuccess(data))
        : dispatch(editAdminError(data.message));
    } catch (error) {
      return dispatch(editAdminError(error));
    }
  };
};

export const deleteAdmin = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteAdminPending());
      const dataOptions = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
      };

      const response = await fetch(`${url}/admins/${id}`, dataOptions);
      const data = await response.json();

      return !data.error
        ? dispatch(deleteAdminSuccess(id))
        : dispatch(deleteAdminError(data.message));
    } catch (error) {
      return dispatch(deleteAdminError(error));
    }
  };
};
