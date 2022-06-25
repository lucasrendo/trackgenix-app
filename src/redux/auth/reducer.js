import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  RESET_MESSAGE
} from './constants';

const initialState = {
  isLoading: true,
  error: false,
  message: '',
  authenticated: undefined,
  user: undefined
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authenticated: action.payload,
        error: false,
        message: action.payload.message
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
        isLoading: false
      };
    case GET_USER_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        error: false,
        user: action.payload,
        isLoading: false
      };
    case GET_USER_ERROR:
      return {
        ...state,
        error: true,
        isLoading: false,
        message: action.payload.message
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
