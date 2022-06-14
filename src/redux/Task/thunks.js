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
  deleteTaskFailed,
  resetTask,
  resetMessage
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

export const getSingleTask = (id) => {
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

export const createTask = (object) => {
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

      if (!data.error) {
        dispatch(createTaskFulfilled(data));
        dispatch(resetTask());
      } else dispatch(createTaskFailed(data.message));
    } catch (error) {
      dispatch(createTaskFailed(error));
    }
  };
};

export const updateTask = (object, id) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(object)
      };

      dispatch(resetMessage());
      dispatch(updateTaskPending());
      const response = await fetch(`${url}/${id}`, requestConfig);
      const data = await response.json();

      if (!data.error) {
        dispatch(updateTaskFulfilled(data));
        dispatch(resetTask());
      } else dispatch(updateTaskFailed(data.message));
    } catch (error) {
      dispatch(createTaskFailed(error));
    }
  };
};

export const deleteTask = (id) => {
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
