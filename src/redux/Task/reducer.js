import { getTasks, getSingleTask, createTask, updateTask, deleteTask } from './actions';
import {
  GET_TASKS_PENDING,
  GET_TASKS_FULFILLED,
  GET_TASKS_FAILED,
  GET_SINGLE_TASK_PENDING,
  GET_SINGLE_TASK_FULFILLED,
  GET_SINGLE_TASK_FAILED,
  CREATE_TASK_PENDING,
  CREATE_TASK_FULFILLED,
  CREATE_TASK_FAILED,
  UPDATE_TASK_PENDING,
  UPDATE_TASK_FULFILLED,
  UPDATE_TASK_FAILED,
  DELETE_TASK_PENDING,
  DELETE_TASK_FULFILLED,
  DELETE_TASK_FAILED
} from './constants';

const initialState = {
  isLoading: false,
  error: '',
  message: '',
  task: {},
  list: []
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK_PENDING:
      return { ...state, isLoading: true };
    case CREATE_TASK_FULFILLED:
      return {
        ...state,
        isLoading: false,
        task: action.payload
      };
    case CREATE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case UPDATE_TASK_PENDING:
      return { ...state, isLoading: true };
    case UPDATE_TASK_FULFILLED:
      return {
        ...state,
        isLoading: false,
        task: action.payload
      };
    case UPDATE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case GET_TASKS_PENDING:
      return { ...state, isLoading: true };
    case GET_TASKS_FULFILLED:
      return {
        ...state,
        isLoading: false
      };
    case GET_TASKS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case GET_SINGLE_TASK_PENDING:
      return { ...state, isLoading: true };
    case GET_SINGLE_TASK_FULFILLED:
      return {
        ...state,
        isLoading: false,
        task: action.payload
      };
    case GET_SINGLE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_TASK_PENDING:
      return { ...state, isLoading: true };
    case DELETE_TASK_FULFILLED:
      return {
        ...state,
        isLoading: false,
        task: action.payload
      };
    case DELETE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
  }
};
