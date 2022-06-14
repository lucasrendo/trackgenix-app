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
  SET_MODAL
} from './constants';

const initialState = {
  isLoading: false,
  error: false,
  showModal: false,
  message: '',
  task: {},
  list: []
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK_PENDING:
      return { ...state, isLoading: true };
    case CREATE_TASK_SUCCESS:
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
    case UPDATE_TASK_SUCCESS:
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
      return {
        ...state,
        isLoading: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_TASKS_FAILED:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        showModal: true
      };
    case GET_SINGLE_TASK_PENDING:
      return { ...state, isLoading: true };
    case GET_SINGLE_TASK_SUCCESS:
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
      return {
        ...state,
        isLoading: true,
        message: 'Deleting...'
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        showModal: true,
        error: false
      };
    case DELETE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        showModal: true,
        error: true
      };
    case SET_MODAL:
      return {
        ...state,
        showModal: action.payload
      };
    default:
      return state;
  }
};
