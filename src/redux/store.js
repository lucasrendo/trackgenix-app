import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { adminsReducer } from './admins/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ admins: adminsReducer });

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
