import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_PENDING,
  GET_PROJECTS_ERROR,
  ADD_PROJECT_PENDING,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  EDIT_PROJECT_PENDING,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR,
  GET_SINGLE_PROJECT_ERROR,
  GET_SINGLE_PROJECT_PENDING,
  GET_SINGLE_PROJECT_SUCCESS,
  RESET_PROJECT,
  RESET_MESSAGE,
  FORMATED_PROJECT,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_ERROR,
  SET_MESSAGE,
  SET_MODAL
} from './constants';

export const getProjectsSuccess = (projects) => {
  return {
    type: GET_PROJECTS_SUCCESS,
    payload: projects
  };
};

export const getProjectsPending = () => {
  return {
    type: GET_PROJECTS_PENDING
  };
};

export const getProjectsError = (error) => {
  return {
    type: GET_PROJECTS_ERROR,
    payload: error
  };
};

export const getSingleProjectSuccess = (id) => {
  return {
    type: GET_SINGLE_PROJECT_SUCCESS,
    payload: id
  };
};

export const getSingleProjectPending = () => {
  return {
    type: GET_SINGLE_PROJECT_PENDING
  };
};

export const getSingleProjectError = (message) => {
  return {
    type: GET_SINGLE_PROJECT_ERROR,
    payload: message
  };
};

export const addProjectPending = () => {
  return {
    type: ADD_PROJECT_PENDING
  };
};

export const addProjectSuccess = (data) => {
  return {
    type: ADD_PROJECT_SUCCESS,
    payload: data
  };
};

export const addProjectError = (error) => {
  return {
    type: ADD_PROJECT_ERROR,
    payload: error
  };
};

export const editProjectPending = () => {
  return {
    type: EDIT_PROJECT_PENDING
  };
};

export const editProjectSuccess = (data) => {
  return {
    type: EDIT_PROJECT_SUCCESS,
    payload: data
  };
};

export const editProjectError = (error) => {
  return {
    type: EDIT_PROJECT_ERROR,
    payload: error
  };
};

export const resetProject = () => {
  return {
    type: RESET_PROJECT
  };
};

export const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  };
};

export const formatedProject = (data) => {
  return {
    type: FORMATED_PROJECT,
    payload: data
  };
};
export const deleteProjectsSuccess = (id) => {
  return {
    type: DELETE_PROJECTS_SUCCESS,
    payload: id
  };
};

export const deleteProjectsPending = () => {
  return {
    type: DELETE_PROJECTS_PENDING
  };
};

export const deleteProjectsError = (message) => {
  return {
    type: DELETE_PROJECTS_ERROR,
    payload: message
  };
};

export const setMessage = () => {
  return {
    type: SET_MESSAGE
  };
};

export const setModal = (state) => {
  return {
    type: SET_MODAL,
    payload: state
  };
};
