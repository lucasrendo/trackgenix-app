import {
  getProjectsSuccess,
  getProjectsPending,
  getProjectsFailed,
  getSingleProjectSuccess,
  getSingleProjectPending,
  getSingleProjectFailed,
  deleteProjectsSuccess,
  deleteProjectsPending,
  deleteProjectsFailed
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
      dispatch(getProjectsFailed(error.message));
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
      dispatch(getSingleProjectFailed(error.message));
    }
  };
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteProjectsPending(id));
      const requestConfig = {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      };
      const response = await fetch(`${url}/${id}`, requestConfig);
      const data = await response.json();
      dispatch(deleteProjectsSuccess(data.data));
    } catch (error) {
      dispatch(deleteProjectsFailed(error.message));
    }
  };
};
