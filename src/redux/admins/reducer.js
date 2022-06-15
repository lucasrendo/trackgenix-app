import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  ADD_ADMIN_ERROR,
  ADD_ADMIN_PENDING,
  ADD_ADMIN_SUCCESS,
  UPDATE_ADMIN_ERROR,
  UPDATE_ADMIN_PENDING,
  UPDATE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  GET_SINGLE_ADMIN_ERROR,
  GET_SINGLE_ADMIN_PENDING,
  GET_SINGLE_ADMIN_SUCCESS
} from './constants';

const initialState = {
  list: [],
  pending: false,
  admin: {},
  error: ''
};

export const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING:
      return {
        ...state,
        pending: true
      };
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        pending: false,
        list: action.payload
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case GET_SINGLE_ADMIN_PENDING:
      return {
        ...state,
        pending: true
      };
    case GET_SINGLE_ADMIN_SUCCESS:
      return {
        ...state,
        pending: false,
        admin: action.payload
      };
    case GET_SINGLE_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case ADD_ADMIN_PENDING:
      return {
        ...state,
        pending: true
      };
    case ADD_ADMIN_SUCCESS:
      return {
        ...state,
        admin: action.payload,
        pending: false
      };
    case ADD_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case UPDATE_ADMIN_PENDING:
      return {
        ...state,
        pending: true
      };
    case UPDATE_ADMIN_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    case UPDATE_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case DELETE_ADMIN_PENDING:
      return {
        ...state,
        pending: true
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    case DELETE_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    default:
      return state;
  }
};
