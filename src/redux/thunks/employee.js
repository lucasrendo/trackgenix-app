import {
  getSingleEmployeesSuccess,
  getSingleEmployeesPending,
  getSingleEmployeesError,
  editEmployeesSuccess,
  editEmployeesPending,
  editEmployeesError
} from 'redux/employees/actions';
import {
  getProjectsSuccess,
  getProjectsPending,
  getProjectsError,
  editProjectPending,
  editProjectSuccess,
  editProjectError,
  getSingleProjectPending,
  getSingleProjectSuccess,
  getSingleProjectError
} from 'redux/projects/actions';
import {
  getTimesheetsPending,
  getTimesheetsSuccess,
  getTimesheetsError,
  addTimesheetError,
  addTimesheetPending,
  addTimesheetSuccess,
  editTimesheetError,
  editTimesheetPending,
  editTimesheetSuccess,
  getSingleTimesheetError,
  getSingleTimesheetPending,
  getSingleTimesheetSuccess
} from 'redux/timesheets/actions';
import {
  getTasksPending,
  getTasksSuccess,
  getTasksFailed,
  getSingleTaskPending,
  getSingleTaskSuccess,
  getSingleTaskFailed,
  addTaskPending,
  addTaskSuccess,
  addTaskFailed,
  editTaskPending,
  editTaskSuccess,
  editTaskFailed,
  deleteTaskPending,
  deleteTaskSuccess,
  deleteTaskFailed
} from 'redux/tasks/actions';

const url = `${process.env.REACT_APP_API_URL}/employee`;

/**************
  EMPLOYEE API
***************/

export const getSingleEmployee = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleEmployeesPending());

      const response = await fetch(`${url}/${id}`);
      const data = await response.json();

      return !data.error
        ? dispatch(getSingleEmployeesSuccess(data))
        : dispatch(getSingleEmployeesError(data.message));
    } catch (error) {
      return dispatch(getSingleEmployeesError(error.message));
    }
  };
};

export const editEmployees = (obj, id) => {
  return async (dispatch) => {
    try {
      dispatch(editEmployeesPending());
      const requestConfig = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(obj)
      };

      const response = await fetch(`${url}/${id}`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(editEmployeesSuccess(data))
        : dispatch(editEmployeesError(data.message));
    } catch (error) {
      return dispatch(editEmployeesError(error));
    }
  };
};

/*************
  PROJECTS API
**************/

export const getProjects = () => {
  return async (dispatch) => {
    try {
      dispatch(getProjectsPending());

      const response = await fetch(`${url}/projects`);
      const data = await response.json();

      return !data.error
        ? dispatch(getProjectsSuccess(data.data))
        : dispatch(getProjectsError(data.message));
    } catch (error) {
      return dispatch(getProjectsError(error.message));
    }
  };
};

export const getSingleProject = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleProjectPending());
      const response = await fetch(`${url}/projects/${id}`);
      const data = await response.json();
      return !data.error
        ? dispatch(getSingleProjectSuccess(data.data))
        : dispatch(getSingleProjectError(data.message));
    } catch (error) {
      return dispatch(getSingleProjectError(error.message));
    }
  };
};

export const editProject = (obj, id) => {
  return async (dispatch) => {
    try {
      dispatch(editProjectPending());
      const requestConfig = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
      };

      const response = await fetch(`${url}/projects/${id}`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(editProjectSuccess(data.message))
        : dispatch(editProjectError(data.message));
    } catch (error) {
      return dispatch(editProjectError(error.message));
    }
  };
};

/***************
  TIMESHEETS API
****************/

export const getTimesheets = () => {
  return async (dispatch) => {
    try {
      dispatch(getTimesheetsPending());

      const response = await fetch(`${url}/timesheets`);
      const data = await response.json();

      return !data.error
        ? dispatch(getTimesheetsSuccess(data.data))
        : dispatch(getTimesheetsError(data.message));
    } catch (error) {
      return dispatch(getTimesheetsError(error));
    }
  };
};

export const getSingleTimesheet = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleTimesheetPending());

      const response = await fetch(`${url}/timesheets/${id}`);
      const data = await response.json();

      return !data.error
        ? dispatch(getSingleTimesheetSuccess(data))
        : dispatch(getSingleTimesheetError(data.message));
    } catch (error) {
      return dispatch(getSingleTimesheetError(error));
    }
  };
};

export const addTimesheet = (timesheet) => {
  return async (dispatch) => {
    try {
      dispatch(addTimesheetPending());
      const requestConfig = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(timesheet)
      };

      const response = await fetch(`${url}/timesheets`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(addTimesheetSuccess(data))
        : dispatch(addTimesheetError(data.message));
    } catch (error) {
      return dispatch(addTimesheetError(error));
    }
  };
};

export const editTimesheet = (timesheet, id) => {
  return async (dispatch) => {
    try {
      dispatch(editTimesheetPending());
      const requestConfig = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(timesheet)
      };

      const response = await fetch(`${url}/timesheets/${id}`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(editTimesheetSuccess(data))
        : dispatch(editTimesheetError(data.message));
    } catch (error) {
      return dispatch(editTimesheetError(error));
    }
  };
};

/**********
  TASKS API
***********/

export const getTasks = () => {
  return async (dispatch) => {
    try {
      dispatch(getTasksPending());

      const response = await fetch(`${url}/tasks`);
      const data = await response.json();

      return !data.error
        ? dispatch(getTasksSuccess(data.data))
        : dispatch(getTasksFailed(data.message));
    } catch (error) {
      return dispatch(getTasksFailed(error));
    }
  };
};

export const getSingleTask = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleTaskPending());

      const response = await fetch(`${url}/tasks/${id}`);
      const data = await response.json();

      return !data.error
        ? dispatch(getSingleTaskSuccess(data))
        : dispatch(getSingleTaskFailed(data.message));
    } catch (error) {
      return dispatch(getSingleTaskFailed(error));
    }
  };
};

export const addTask = (obj) => {
  return async (dispatch) => {
    try {
      dispatch(addTaskPending());
      const requestConfig = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      };

      const response = await fetch(`${url}/tasks`, requestConfig);
      const data = await response.json();

      return !data.error ? dispatch(addTaskSuccess(data)) : dispatch(addTaskFailed(data.message));
    } catch (error) {
      return dispatch(addTaskFailed(error));
    }
  };
};

export const editTask = (object, id) => {
  return async (dispatch) => {
    try {
      dispatch(editTaskPending());
      const requestConfig = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(object)
      };

      const response = await fetch(`${url}/tasks/${id}`, requestConfig);
      const data = await response.json();

      return !data.error ? dispatch(editTaskSuccess(data)) : dispatch(editTaskFailed(data.message));
    } catch (error) {
      return dispatch(editTaskFailed(error));
    }
  };
};

export const deleteTask = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteTaskPending());
      const requestConfig = {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      };

      const response = await fetch(`${url}/tasks/${id}`, requestConfig);
      const data = await response.json();

      !data.error ? dispatch(deleteTaskSuccess(id)) : dispatch(deleteTaskFailed(data.message));
    } catch (error) {
      dispatch(deleteTaskFailed(error));
    }
  };
};
