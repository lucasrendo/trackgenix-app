import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_PENDING,
  GET_PROJECTS_ERROR,
  GET_SINGLE_PROJECT_SUCCESS,
  GET_SINGLE_PROJECT_ERROR,
  GET_SINGLE_PROJECT_PENDING,
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
