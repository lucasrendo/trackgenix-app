import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_PENDING,
  GET_PROJECTS_ERROR,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_ERROR
} from './constants';

export const getProjectsSuccess = (projects) => ({
  type: GET_PROJECTS_SUCCESS,
  payload: projects
});

export const getProjectsPending = () => ({
  type: GET_PROJECTS_PENDING
});

export const getProjectsError = (error) => ({
  type: GET_PROJECTS_ERROR,
  payload: error
});

export const deleteProjectsSuccess = (projects) => ({
  type: DELETE_PROJECTS_SUCCESS,
  payload: projects
});

export const deletProjectsPending = () => ({
  type: DELETE_PROJECTS_PENDING
});

export const deleteProjectError = (error) => ({
  type: DELETE_PROJECTS_ERROR,
  payload: error
});
