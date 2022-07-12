import {
  getProjectsSuccess,
  getProjectsPending,
  getProjectsError,
  addProjectPending,
  addProjectSuccess,
  addProjectError,
  editProjectPending,
  editProjectSuccess,
  editProjectError,
  getSingleProjectPending,
  getSingleProjectSuccess,
  getSingleProjectError,
  deleteProjectSuccess,
  deleteProjectPending,
  deleteProjectError
} from './actions';

const url = `${process.env.REACT_APP_API_URL}/projects`;

const formatProject = (project) => {
  const data = {
    projectName: project.projectName,
    description: project.description,
    admin: project.admin,
    client: project.client,
    startDate: project.startDate,
    endDate: project.endDate,
    isActive: project.isActive,
    employees: []
  };
  data.employees.push({
    employeeId: project.employeeId,
    role: project.role,
    rate: project.rate,
    hoursInProject: project.hoursInProject
  });
  return data;
};

export const getProjects = () => {
  return async (dispatch) => {
    try {
      dispatch(getProjectsPending());
      const response = await fetch(url);
      const data = await response.json();

      if (!data.error) return dispatch(getProjectsSuccess(data.data));
      else return dispatch(getProjectsError(data.message));
    } catch (error) {
      return dispatch(getProjectsError(error.message));
    }
  };
};

export const getSingleProject = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleProjectPending());
      const response = await fetch(`${url}/${id}`);
      const data = await response.json();
      !data.error
        ? dispatch(getSingleProjectSuccess(data.data))
        : dispatch(getSingleProjectError(data.message));
    } catch (error) {
      dispatch(getSingleProjectError(error.message));
    }
  };
};

export const addProject = (obj) => {
  return async (dispatch) => {
    try {
      //const project = formatProject(obj);
      const requestConfig = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
      };
      dispatch(addProjectPending());
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/projects`,
        requestConfig
      );
      const data = await response.json();

      !data.error
        ? dispatch(addProjectSuccess(data.message))
        : dispatch(addProjectError(data.message));
    } catch (error) {
      dispatch(addProjectError(error.message));
    }
  };
};

export const editProject = (obj, id) => {
  return async (dispatch) => {
    try {
      const project = formatProject(obj);
      const requestConfig = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(project)
      };
      dispatch(editProjectPending());
      const response = await fetch(`${url}/${id}`, requestConfig);
      const data = await response.json();
      !data.error
        ? dispatch(editProjectSuccess(data.message))
        : dispatch(editProjectError(data.message));
    } catch (error) {
      dispatch(editProjectError(error.message));
    }
  };
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      };
      dispatch(deleteProjectPending());
      const response = await fetch(`${url}/${id}`, requestConfig);
      const data = await response.json();

      !data.error ? dispatch(deleteProjectSuccess(id)) : dispatch(deleteProjectError(data.message));
    } catch (error) {
      dispatch(deleteProjectError(error.message));
    }
  };
};
