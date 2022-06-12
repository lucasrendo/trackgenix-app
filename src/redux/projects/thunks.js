import { getProjectsSuccess, getProjectsPending, getProjectsError } from './actions';

const url = `${process.env.REACT_APP_API_URL}/projects`;
export const getProjects = () => {
  return async (dispatch) => {
    dispatch(getProjectsPending());
    try {
      const response = fetch(url);
      const data = await response.json();
      dispatch(getProjectsSuccess(data.data));
    } catch (error) {
      dispatch(getProjectsError(error));
    }
  };
};
