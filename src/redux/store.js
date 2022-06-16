import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { adminsReducer } from './admins/reducer';
import { timesheetReducer } from './timesheets/reducer';
import thunk from 'redux-thunk';
import { projectsReducer } from './projects/reducer';
import { tasksReducer } from './Task/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  tasks: tasksReducer,
  projects: projectsReducer,
  timesheet: timesheetReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
