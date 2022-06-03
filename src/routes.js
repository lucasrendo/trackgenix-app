import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Admins from './Components/Admins/index';
import SuperAdmins from './Components/SuperAdmins/index';
import Home from './Components/Home/index';
import Employees from './Components/Employees/index';
import Projects from './Components/Projects';
import TimeSheets from './Components/TimeSheets';
import Tasks from './Components/Tasks/index';

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/admins'} component={Admins} />
          <Route exact path={'/super-admins'} component={SuperAdmins} />
          <Route exact path={'/employees'} component={Employees} />
          <Route exact path={'/projects'} component={Projects} />
          <Route exact path={'/time-sheets'} component={TimeSheets} />
          <Route exact path={'/tasks'} component={Tasks} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Routes;
