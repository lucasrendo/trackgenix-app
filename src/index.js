import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import EmployeesRoutes from 'routes/employees';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <EmployeesRoutes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
