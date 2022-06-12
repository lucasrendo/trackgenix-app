import { GET_SUPER_ADMIN_SUCCESS } from './constants';

const initialState = {
  superAdmins: []
};

export const superAdminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        superAdmins: action.payload
      };
    default:
      return state;
  }
};
