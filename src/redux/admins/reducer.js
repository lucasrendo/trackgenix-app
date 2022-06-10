import { GET_ADMINS_PENDING, GET_ADMINS_SUCCESS, GET_ADMINS_ERROR } from './constants';

const initialState = {
  list: [],
  pending: false,
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
        list: action.payload,
        pending: false
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    default:
      return state;
  }
};
