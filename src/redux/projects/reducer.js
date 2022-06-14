import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_PENDING,
  GET_PROJECTS_ERROR,
  GET_SINGLE_PROJECT_SUCCESS,
  GET_SINGLE_PROJECT_ERROR,
  GET_SINGLE_PROJECT_PENDING,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_ERROR,
  SET_MODAL
} from './constants';

const initialState = {
  isLoading: false,
  error: false,
  message: '',
  project: {},
  showModal: false,
  list: []
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        showModal: true
      };
    case GET_SINGLE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SINGLE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        project: action.payload,
        message: action.payload
      };
    case GET_SINGLE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case DELETE_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: state.list.filter((project) => project._id !== action.payload),
        message: action.payload,
        showModal: true
      };
    case DELETE_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload,
        showModal: true
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
