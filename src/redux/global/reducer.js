import { TOGGLE_SIDEBAR } from 'redux/global/constants';

const initialState = {
  showSidebar: false
};

export const globalReducer = (state = initialState, action) => {
  switch (action) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: action.payload
      };
    default:
      return initialState;
  }
};
