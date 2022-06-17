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
  deleteProjectsSuccess,
  deleteProjectsPending,
  deleteProjectsError,
  resetMessage,
  resetProject
} from './actions';

const url = `${process.env.REACT_APP_API_URL}/projects`;

const projectArray = (project) => {
  const body = {
    projectName: project.projectName,
    description: project.description,
    admin: project.admin,
    client: project.client,
    startDate: project.startDate,
    endDate: project.endDate,
    isActive: project.isActive,
    employees: []
  };
  body.employees.push({
    employeeId: project.employees,
    role: project.role,
    rate: project.rate,
    hoursInProject: project.hoursInProject
  });
  return body;
};

export const getProjects = () => {
  return async (dispatch) => {
    try {
      dispatch(getProjectsPending());
      const response = await fetch(url);
      const data = await response.json();
      dispatch(getProjectsSuccess(data.data));
    } catch (error) {
      dispatch(getProjectsError(error.message));
    }
  };
};

export const getSingleProject = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleProjectPending());
      const response = await fetch(`${url}/${id}`);
      const data = await response.json();
      if (!data.error) {
        dispatch(getSingleProjectSuccess(data));
      } else {
        dispatch(getSingleProjectError(data.message));
      }
    } catch (error) {
      dispatch(getSingleProjectError(error));
    }
  };
};

export const addProject = (obj) => {
  return async (dispatch) => {
    try {
      const project = projectArray(obj);
      const requestConfig = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(project)
      };
      dispatch(addProjectPending());
      const response = await fetch(url, requestConfig);
      const data = await response.json();
      dispatch(resetProject());

      if (!data.error) {
        dispatch(addProjectSuccess(data));
        dispatch(resetProject());
      } else dispatch(addProjectError(data.message));
    } catch (error) {
      dispatch(addProjectError(error));
    }
  };
};

export const editProject = (obj, id) => {
  return async (dispatch) => {
    try {
      const project = projectArray(obj);
      const requestConfig = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(project)
      };
      dispatch(resetMessage());
      dispatch(editProjectPending());
      const response = await fetch(`${url}/${id}`, requestConfig);
      const data = await response.json();
      if (!data.error) {
        dispatch(editProjectSuccess(data));
        dispatch(resetProject());
      } else dispatch(editProjectError(data.message));
    } catch (error) {
      dispatch(editProjectError(error.toString()));
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
      dispatch(deleteProjectsPending());
      const response = await fetch(`${url}/${id}`, requestConfig);
      const data = await response.json();
      dispatch(deleteProjectsSuccess(data.message));
    } catch (error) {
      dispatch(deleteProjectsError(error.message));
    }
  };
};
