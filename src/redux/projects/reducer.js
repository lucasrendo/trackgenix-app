import {
  ADD_PROJECT_PENDING,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  EDIT_PROJECT_PENDING,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR,
  GET_SINGLE_PROJECT_PENDING,
  GET_SINGLE_PROJECT_SUCCESS,
  GET_SINGLE_PROJECT_ERROR,
  RESET_PROJECT,
  RESET_MESSAGE
  //FORMATED_PROJECT
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: false,
  message: '',
  project: undefined
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case GET_SINGLE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        project: {
          projectName: action.payload.data.projectName,
          description: action.payload.data.description,
          startDate: action.payload.data.startDate,
          endDate: action.payload.data.endDate,
          admin: action.payload.data.admin,
          client: action.payload.data.client,
          employees: action.payload.data.employees[0].employeeId,
          role: action.payload.data.employees[0].role,
          rate: action.payload.data.employees[0].rate,
          hoursInProject: action.payload.data.employees[0].hoursInProject,
          isActive: action.payload.data.isActive
        },
        message: action.payload.message
      };
    case GET_SINGLE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case ADD_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        project: action.payload.data,
        isLoading: false,
        error: false,
        message: action.payload.message
      };
    case ADD_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case EDIT_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case EDIT_PROJECT_SUCCESS:
      return {
        ...state,
        project: {
          projectName: action.payload.data.projectName,
          description: action.payload.data.description,
          startDate: action.payload.data.startDate,
          endDate: action.payload.data.endDate,
          admin: action.payload.data.admin,
          client: action.payload.data.client,
          employees: [
            {
              employeeId: action.payload.employees[0].employeeId,
              role: action.payload.data.employees[0].role,
              rate: action.payload.data.employees[0].rate,
              hoursInProject: action.payload.data.employees[0].hoursInProject
            }
          ],
          isActive: action.payload.data.isActive
        },
        isLoading: false,
        error: false,
        message: action.payload.message
      };
    case EDIT_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case RESET_PROJECT:
      return {
        ...state,
        project: undefined
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: ''
      };
    // case FORMATED_PROJECT:
    //   return {
    //     ...state,
    //     project: {
    //       projectName: action.payload.data.projectName,
    //       description: action.payload.data.description,
    //       startDate: action.payload.data.startDate,
    //       endDate: action.payload.data.endDate,
    //       admin: action.payload.data.admin,
    //       client: action.payload.data.client,
    //       employees: action.payload.data.employees,
    //       role: action.payload.data.role,
    //       rate: action.payload.data.rate,
    //       hoursInProject: action.payload.data.hoursInProject,
    //       isActive: action.payload.data.isActive
    //     }
    //   };
    default:
      return state;
  }
};
