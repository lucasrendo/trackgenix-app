import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Admins from './Components/Admins/index';
import SuperAdmins from './Components/SuperAdmins/List';
import SuperAdminsForm from './Components/SuperAdmins/Form';
import Home from './Components/Home/index';
import Employees from './Components/Employees/index';
import Projects from './Components/Projects';
import TimeSheets from './Components/TimeSheets/index';
import Tasks from './Components/Tasks/index';
import Form from './Components/Shared/Form/Form';

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/admins'} component={Admins} />
          <Route exact path={'/admins/form'} component={Form} />
          <Route exact path={'/admins/form/:id'} component={Form} />
          <Route exact path={'/super-admin'} component={SuperAdmins} />
          <Route exact path={'/super-admin/form'} component={SuperAdminsForm} />
          <Route exact path={'/super-admin/form/:id'} component={SuperAdminsForm} />
          <Route exact path={'/employees'} component={Employees} />
          <Route exact path={'/projects'} component={Projects} />
          <Route exact path={'/timesheets'} component={TimeSheets} />
          <Route exact path={'/timesheets/form/'} component={Form} />
          <Route exact path={'/timesheets/form/:id'} component={Form} />
          <Route exact path={'/tasks'} component={Tasks} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Routes;
