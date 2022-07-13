import { TOGGLE_SIDEBAR, TOGGLE_MODAL } from 'redux/global/constants';

export const toggleSidebar = (state) => {
  return {
    type: TOGGLE_SIDEBAR,
    payload: state
  };
};

export const toggleModal = () => {
  return {
    type: TOGGLE_MODAL
  };
};
