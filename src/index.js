import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import EmployeeRoutes from 'routes/employees';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
      <EmployeeRoutes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
