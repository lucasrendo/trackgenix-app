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
  EDIT_SUPER_ADMIN_ERROR,
  SUPER_ADMIN_MODAL,
  SUPER_ADMIN_MESSAGE,
  UPDATE_LIST,
  RESET_MESSAGE
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
        error: true,
        modal: true
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
        message: action.payload,
        isLoading: false,
        showModal: true,
        error: false
      };
    case DELETE_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
        // showModal: true
      };
    case DELETE_SUPER_ADMIN_ERROR:
      return {
        ...state,
        message: action.payload.message,
        isLoading: false,
        error: true
      };
    case ADD_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        superAdmin: action.payload,
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
        error: true,
        modal: true
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
        error: true,
        modal: true
      };
    case SUPER_ADMIN_MODAL:
      return {
        ...state,
        showModal: action.payload
      };
    case SUPER_ADMIN_MESSAGE:
      return {
        ...state,
        message: ''
      };
    case UPDATE_LIST:
      return {
        ...state,
        list: action.payload
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};
