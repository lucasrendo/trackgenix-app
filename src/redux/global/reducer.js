import { TOGGLE_SIDEBAR, TOGGLE_MODAL } from 'redux/global/constants';

const initialState = {
  showSidebar: false,
  showModal: false,
  message: '',
  loading: false
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: action.payload
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        showModal: !state.showModal
      };
    default:
      return state;
  }
};
