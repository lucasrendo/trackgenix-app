import {
  getTasksPending,
  getTasksSuccess,
  getTasksFailed,
  getSingleTaskPending,
  getSingleTaskSuccess,
  getSingleTaskFailed,
  createTaskPending,
  createTaskSuccess,
  createTaskFailed,
  updateTaskPending,
  updateTaskSuccess,
  updateTaskFailed,
  deleteTaskPending,
  deleteTaskSuccess,
  deleteTaskFailed
} from './actions';

const url = `${process.env.REACT_APP_API_URL}/tasks`;

export const getTasks = () => {
  return async (dispatch) => {
    try {
      dispatch(getTasksPending());
      const response = await fetch(url);
      const data = await response.json();

      if (!data.error) dispatch(getTasksSuccess(data.data));
      else dispatch(getTasksFailed(data.message));
    } catch (error) {
      dispatch(getTasksFailed(error));
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

      if (!data.error) dispatch(deleteTaskSuccess(data.message));
      else dispatch(deleteTaskFailed(data.message));
    } catch (error) {
      dispatch(deleteTaskFailed(error));
    }
  };
};
