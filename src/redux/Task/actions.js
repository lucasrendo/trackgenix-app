import {
  getTasksRequest,
  getSingleTaskRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest
} from './thunks';
import {
  GET_TASKS,
  GET_TASKS_PENDING,
  GET_TASKS_FULFILLED,
  GET_TASKS_FAILED,
  GET_SINGLE_TASK,
  GET_SINGLE_TASK_PENDING,
  GET_SINGLE_TASK_FULFILLED,
  GET_SINGLE_TASK_FAILED,
  CREATE_TASK,
  CREATE_TASK_PENDING,
  CREATE_TASK_FULFILLED,
  CREATE_TASK_FAILED,
  UPDATE_TASK,
  UPDATE_TASK_PENDING,
  UPDATE_TASK_FULFILLED,
  UPDATE_TASK_FAILED,
  DELETE_TASK,
  DELETE_TASK_PENDING,
  DELETE_TASK_FULFILLED,
  DELETE_TASK_FAILED
} from './constants';

// === GET ALL TASKS === //
const getTasksPending = () => {
  return {
    type: GET_TASKS_PENDING
  };
};

const getTasksFulfilled = (data) => {
  return {
    type: GET_TASKS_FULFILLED,
    payload: data
  };
};

const getTasksFailed = (error) => {
  return {
    type: GET_TASKS_FAILED,
    payload: error
  };
};

export const getTasks = () => {
  return async (dispatch) => {
    dispatch(getTasksPending());
    const data = await getTasksRequest();

    if (!data.error) dispatch(getTasksFulfilled(data));
    else dispatch(getTasksFailed(data.message));
  };
};

// === GET SINGLE TASK === //
const getSingleTaskPending = () => {
  return {
    type: GET_SINGLE_TASK_PENDING
  };
};

const getSingleTaskFulfilled = (data) => {
  return {
    type: GET_SINGLE_TASK_FULFILLED,
    payload: data
  };
};

const getSingleTaskFailed = (message) => {
  return {
    type: GET_SINGLE_TASK_FAILED,
    payload: message
  };
};

export const getSingleTask = () => {
  return async (dispatch) => {
    dispatch(getSingleTaskPending());
    const data = await getSingleTaskRequest();

    if (!data.error) dispatch(getSingleTaskFulfilled(data));
    else dispatch(getSingleTaskFailed(data.message));
  };
};

// === CREATE TASK === //
const createTaskPending = () => {
  return {
    type: CREATE_TASK_PENDING
  };
};

const createTaskFulfilled = (data) => {
  return {
    type: CREATE_TASK_FULFILLED,
    payload: data
  };
};

const createTaskFailed = (message) => {
  return {
    type: CREATE_TASK_FAILED,
    payload: message
  };
};

export const createTask = () => {
  return async (dispatch) => {
    dispatch(createTaskPending());
    const data = await createTaskRequest();

    if (!data.error) dispatch(createTaskFulfilled(data));
    else dispatch(createTaskFailed(data.message));
  };
};

// === UPDATE TASK === //
const updateTaskPending = () => {
  return {
    type: UPDATE_TASK_PENDING
  };
};

const updateTaskFulfilled = (data) => {
  return {
    type: UPDATE_TASK_PENDING,
    payload: data
  };
};

const updateTaskFailed = (message) => {
  return {
    type: UPDATE_TASK_FAILED,
    payload: message
  };
};

export const updateTask = () => {
  return async (dispatch) => {
    dispatch(updateTaskPending());
    const data = await updateTaskRequest();

    if (!data.error) dispatch(updateTaskFulfilled(data));
    else dispatch(updateTaskFailed(data.message));
  };
};

// === DELETE TASK === //
const deleteTaskPending = () => {
  return {
    type: DELETE_TASK_PENDING
  };
};

const deleteTaskFulfilled = (data) => {
  return {
    type: DELETE_TASK_FULFILLED,
    payload: data
  };
};

const deleteTaskFailed = (message) => {
  return {
    type: DELETE_TASK_FAILED,
    payload: message
  };
};

export const deleteTask = () => {
  return async (dispatch) => {
    dispatch(deleteTaskPending());
    const data = await deleteTaskRequest();

    if (!data.error) dispatch(deleteTaskFulfilled(data));
    else dispatch(deleteTaskFailed(data.message));
  };
};
