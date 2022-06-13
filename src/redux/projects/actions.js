import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_PENDING,
  GET_PROJECTS_FAILED,
  GET_SINGLE_PROJECT_SUCCESS,
  GET_SINGLE_PROJECT_FAILED,
  GET_SINGLE_PROJECT_PENDING,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_FAILED
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

export const getProjectsFailed = (error) => {
  return {
    type: GET_PROJECTS_FAILED,
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

export const getSingleProjectFailed = (message) => {
  return {
    type: GET_SINGLE_PROJECT_FAILED,
    payload: message
  };
};

export const deleteProjectsSuccess = (project) => {
  return {
    type: DELETE_PROJECTS_SUCCESS,
    payload: project
  };
};

export const deleteProjectsPending = () => {
  return {
    type: DELETE_PROJECTS_PENDING
  };
};

export const deleteProjectsFailed = (message) => {
  return {
    type: DELETE_PROJECTS_FAILED,
    payload: message
  };
};
