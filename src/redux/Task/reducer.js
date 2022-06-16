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
  RESET_MESSAGE,
  SET_MODAL,
  UPDATE_LIST
} from './constants';

const initialState = {
  isLoading: false,
  error: false,
  message: '',
  task: undefined,
  showModal: false,
  list: []
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_TASK_PENDING:
      return { ...state, isLoading: true, message: 'Fetching...' };
    case GET_SINGLE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        task: {
          employeeId: action.payload.data.employeeId,
          projectId: action.payload.data.projectId,
          title: action.payload.data.title,
          description: action.payload.data.description,
          date: action.payload.data.date,
          done: action.payload.data.done
        },
        message: action.payload.message
      };
    case GET_SINGLE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case CREATE_TASK_PENDING:
      return { ...state, isLoading: true, message: 'Fetching...' };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        task: action.payload.data,
        message: action.payload.message
      };
    case CREATE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case UPDATE_TASK_PENDING:
      return { ...state, isLoading: true, message: 'Fetching...' };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        task: action.payload.data,
        message: action.payload.message
      };
    case UPDATE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
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
    case UPDATE_LIST:
      return {
        ...state,
        list: action.payload
      };
    case RESET_TASK:
      return {
        ...state,
        task: undefined
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: ''
      };
    default:
      return state;
  }
};
