import {
  getProjectsSuccess,
  getProjectsPending,
  getProjectsError,
  getSingleProjectSuccess,
  getSingleProjectPending,
  getSingleProjectError,
  deleteProjectsSuccess,
  deleteProjectsPending,
  deleteProjectsError
} from './actions';

const url = `${process.env.REACT_APP_API_URL}/projects`;
export const getProjects = () => {
  return async (dispatch) => {
    try {
      dispatch(getProjectsPending());
      const response = await fetch(url);
      const data = await response.json();
      dispatch(getProjectsSuccess(data.data));
    } catch (error) {
      dispatch(getProjectsError(error.message));
    }
  };
};

export const getSingleProject = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleProjectPending);
      const response = await fetch(`${url}/${id}`);
      const data = await response.json();
      dispatch(getSingleProjectSuccess(data.data));
    } catch (error) {
      dispatch(getSingleProjectError(error.message));
    }
  };
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      };
      dispatch(deleteProjectsPending());
      const response = await fetch(`${url}/${id}`, requestConfig);
      const data = await response.json();
      dispatch(deleteProjectsSuccess(data.message));
    } catch (error) {
      dispatch(deleteProjectsError(error.message));
    }
  };
};
