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
  GET_SINGLE_ADMIN_SUCCESS,
  UPDATE_LIST,
  RESET_MESSAGE,
  RESET_ADMIN,
  SET_MODAL
} from './constants';

const initialState = {
  list: [],
  pending: false,
  admin: undefined,
  error: false,
  message: '',
  showModal: false
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
        error: true,
        message: action.payload
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
        error: false,
        admin: {
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          email: action.payload.data.email,
          password: action.payload.data.password,
          isActive: action.payload.data.isActive
        },
        message: action.payload.message
      };
    case GET_SINGLE_ADMIN_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
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
        admin: action.payload.data,
        pending: false,
        error: false,
        message: action.payload.message
      };
    case ADD_ADMIN_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
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
        error: false,
        admin: {
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          email: action.payload.data.email,
          password: action.payload.data.password,
          isActive: action.payload.data.isActive
        },
        pending: false,
        message: action.payload.message
      };
    case UPDATE_ADMIN_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
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
        pending: false,
        error: false
      };
    case DELETE_ADMIN_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
        pending: false
      };
    case UPDATE_LIST:
      return {
        ...state,
        list: action.payload
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: ''
      };
    case RESET_ADMIN:
      return {
        ...state,
        admin: undefined
      };
    case SET_MODAL:
      return {
        ...state,
        showModal: action.payload,
        message: 'Loading...'
      };
    default:
      return state;
  }
};
