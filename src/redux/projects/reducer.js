import { GET_PROJECTS_SUCCESS, GET_PROJECTS_PENDING, GET_PROJECTS_ERROR } from './constants';

const initialState = {
  list: [],
  pending: false,
  error: ''
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        pending: true
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
  }
};
