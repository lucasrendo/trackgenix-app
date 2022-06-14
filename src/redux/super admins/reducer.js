import {
  GET_SUPER_ADMIN_SUCCESS,
  GET_SUPER_ADMIN_PENDING,
  GET_SUPER_ADMIN_ERROR,
  GET_SINGLE_SUPER_ADMIN_SUCCESS,
  GET_SINGLE_SUPER_ADMIN_PENDING,
  GET_SINGLE_SUPER_ADMIN_ERROR,
  DELETE_SUPER_ADMIN_SUCCESS,
  DELETE_SUPER_ADMIN_PENDING,
  DELETE_SUPER_ADMIN_ERROR,
  ADD_SUPER_ADMIN_SUCCESS,
  ADD_SUPER_ADMIN_PENDING,
  ADD_SUPER_ADMIN_ERROR,
  EDIT_SUPER_ADMIN_SUCCESS,
  EDIT_SUPER_ADMIN_PENDING,
  EDIT_SUPER_ADMIN_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  message: '',
  error: false,
  superAdmin: {}
};

export const superAdminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_SUPER_ADMIN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: true
      };
    case GET_SINGLE_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_SINGLE_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SINGLE_SUPER_ADMIN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: true
      };
    case DELETE_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case DELETE_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_SUPER_ADMIN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: true
      };
    case ADD_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case ADD_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_SUPER_ADMIN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: true
      };
    case EDIT_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case EDIT_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_SUPER_ADMIN_ERROR:
      return {
        ...state,
        message: action.payload,
        pending: false,
        error: true
      };
    default:
      return state;
  }
};
