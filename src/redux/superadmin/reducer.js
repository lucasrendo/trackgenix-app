import { RESET_SUPER_ADMIN, RESET_MESSAGE } from './constants';

const initialState = {
  list: [],
  isLoading: false,
  superAdmin: undefined,
  error: false,
  message: ''
};

export const superAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_SUPER_ADMIN:
      return {
        ...state,
        superAdmin: undefined
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

export default superAdminReducer;
