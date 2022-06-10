import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Admins from './Components/Admins/List';
import AdminsForm from './Components/Admins/Form';
import SuperAdmins from './Components/SuperAdmins/index';
import Home from './Components/Home/index';
import Employees from './Components/Employees/index';
import Projects from './Components/Projects';
import Tasks from './Components/Tasks/index';
import TimeSheetsList from './Components/TimeSheets/List';
import TimeSheetsForm from './Components/TimeSheets/Form';

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/admins'} component={Admins} />
          <Route exact path={'/admins/form'} component={AdminsForm} />
          <Route exact path={'/admins/form/:id'} component={AdminsForm} />
          <Route exact path={'/super-admins'} component={SuperAdmins} />
          <Route exact path={'/employees'} component={Employees} />
          <Route exact path={'/projects'} component={Projects} />
          <Route exact path={'/timesheets'} component={TimeSheetsList} />
          <Route exact path={'/timesheets/form/'} component={TimeSheetsForm} />
          <Route exact path={'/timesheets/form/:id'} component={TimeSheetsForm} />
          <Route exact path={'/tasks'} component={Tasks} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Routes;
