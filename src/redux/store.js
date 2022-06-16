import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { timesheetReducer } from './timesheets/reducer';
import { superAdminsReducer } from './super admins/reducer';
import { projectsReducer } from './projects/reducer';
import { tasksReducer } from './Task/reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  projects: projectsReducer,
  timesheet: timesheetReducer,
  superAdmins: superAdminsReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
