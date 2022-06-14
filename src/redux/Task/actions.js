import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILED,
  GET_SINGLE_TASK_PENDING,
  GET_SINGLE_TASK_SUCCESS,
  GET_SINGLE_TASK_FAILED,
  CREATE_TASK_PENDING,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILED,
  UPDATE_TASK_PENDING,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILED,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILED,
  RESET_TASK,
  RESET_MESSAGE
} from './constants';

// === GET ALL TASKS === //
export const getTasksPending = () => {
  return {
    type: GET_TASKS_PENDING
  };
};

export const getTasksSuccess = (data) => {
  return {
    type: GET_TASKS_SUCCESS,
    payload: data
  };
};

export const getTasksFailed = (error) => {
  return {
    type: GET_TASKS_FAILED,
    payload: error
  };
};

// === GET SINGLE TASK === //
export const getSingleTaskPending = () => {
  return {
    type: GET_SINGLE_TASK_PENDING
  };
};

export const getSingleTaskSuccess = (data) => {
  return {
    type: GET_SINGLE_TASK_SUCCESS,
    payload: data
  };
};

export const getSingleTaskFailed = (message) => {
  return {
    type: GET_SINGLE_TASK_FAILED,
    payload: message
  };
};

// === CREATE TASK === //
export const createTaskPending = () => {
  return {
    type: CREATE_TASK_PENDING
  };
};

export const createTaskSuccess = (data) => {
  return {
    type: CREATE_TASK_SUCCESS,
    payload: data
  };
};

export const createTaskFailed = (message) => {
  return {
    type: CREATE_TASK_FAILED,
    payload: message
  };
};

// === UPDATE TASK === //
export const updateTaskPending = () => {
  return {
    type: UPDATE_TASK_PENDING
  };
};

export const updateTaskSuccess = (data) => {
  return {
    type: UPDATE_TASK_SUCCESS,
    payload: data
  };
};

export const updateTaskFailed = (message) => {
  return {
    type: UPDATE_TASK_FAILED,
    payload: message
  };
};

// === DELETE TASK === //
export const deleteTaskPending = () => {
  return {
    type: DELETE_TASK_PENDING
  };
};

export const deleteTaskSuccess = (data) => {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: data
  };
};

export const deleteTaskFailed = (message) => {
  return {
    type: DELETE_TASK_FAILED,
    payload: message
  };
};

// === FORM ACTIONS === //
export const resetTask = () => {
  return {
    type: RESET_TASK
  };
};

export const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  };
};
