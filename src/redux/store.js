import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { timesheetReducer } from './timesheets/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ timesheet: timesheetReducer });

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
