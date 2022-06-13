import {
  getTasksPending,
  getTasksFulfilled,
  getTasksFailed,
  getSingleTaskPending,
  getSingleTaskFulfilled,
  getSingleTaskFailed,
  createTaskPending,
  createTaskFulfilled,
  createTaskFailed,
  updateTaskPending,
  updateTaskFulfilled,
  updateTaskFailed,
  deleteTaskPending,
  deleteTaskFulfilled,
  deleteTaskFailed
} from './actions';

const url = `${process.env.REACT_APP_API_URL}/tasks`;

export const getTasks = () => {
  return async (dispatch) => {
    try {
      dispatch(getTasksPending());
      const response = await fetch(url);
      const data = await response.json();

      if (!data.error) dispatch(getTasksFulfilled(data));
      else dispatch(getTasksFailed(data.message));
    } catch (error) {
      dispatch(getTasksFailed(error));
    }
  };
};

export const getSingleTask = async (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleTaskPending());
      const response = await fetch(`${url}/${id}`);
      const data = await response.json();

      if (!data.error) dispatch(getSingleTaskFulfilled(data));
      else dispatch(getSingleTaskFailed(data.message));
    } catch (error) {
      dispatch(getSingleTaskFailed(error));
    }
  };
};

export const createTask = async (object) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object)
      };

      dispatch(createTaskPending());
      const response = await fetch(`${url}`, requestConfig);
      const data = await response.json();

      if (!data.error) dispatch(createTaskFulfilled(data));
      else dispatch(createTaskFailed(data.message));
    } catch (error) {
      dispatch(createTaskFailed(error));
    }
  };
};

export const updateTask = async (object, id) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(object)
      };

      dispatch(updateTaskPending());
      const response = await fetch(`${url}/${id}`, requestConfig);
      const data = await response.json();

      if (!data.error) dispatch(updateTaskFulfilled(data));
      else dispatch(updateTaskFailed(data.message));
    } catch (error) {
      dispatch(createTaskFailed(error));
    }
  };
};

export const deleteTask = async (id) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      };

      dispatch(deleteTaskPending());
      const response = await fetch(`${url}/${id}`, requestConfig);
      const data = await response.json();

      if (!data.error) dispatch(deleteTaskFulfilled(data));
      else dispatch(deleteTaskFailed(data.message));
    } catch (error) {
      dispatch(deleteTaskFailed(error));
    }
  };
};
