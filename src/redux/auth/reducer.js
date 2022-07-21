import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  RESET_MESSAGE
} from './constants';

const initialState = {
  isLoading: false,
  error: false,
  message: ''
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        message: 'Successful login'
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: true,
        message: 'The email or the password are incorrect',
        isLoading: false
      };
    case REGISTER_PENDING:
      return {
        ...state,
        message: 'Loading...'
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        authenticated: action.payload.data,
        error: false,
        message: action.payload.message
      };
    case REGISTER_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload
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
