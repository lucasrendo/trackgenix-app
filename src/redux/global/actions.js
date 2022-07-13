import { TOGGLE_SIDEBAR } from 'redux/global/constants';

export const toggleSidebar = (state) => {
  return {
    type: TOGGLE_SIDEBAR,
    payload: state
  };
};
