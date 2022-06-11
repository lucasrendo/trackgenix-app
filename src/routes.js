import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Admins from './Components/Admins/List';
import AdminsForm from './Components/Admins/Form';
import SuperAdmins from './Components/SuperAdmins/List';
import SuperAdminsForm from './Components/SuperAdmins/Form';
import Home from './Components/Home/index';
import Projects from './Components/Projects/List';
import ProjectsForm from './Components/Projects/Form';
import Employees from './Components/Employees/List';
import EmployeesForm from './Components/Employees/Form';
import TasksForm from './Components/Tasks/Form';
import TasksList from './Components/Tasks/List';
import Form from './Components/Shared/Form/Form';
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
          <Route exact path={'/super-admins/form'} component={SuperAdminsForm} />
          <Route exact path={'/super-admins/form/:id'} component={SuperAdminsForm} />
          <Route exact path={'/employees'} component={Employees} />
          <Route exact path={'/employees/form'} component={EmployeesForm} />
          <Route exact path={'/employees/form/:id'} component={EmployeesForm} />
          <Route exact path={'/projects'} component={Projects} />
          <Route exact path={'/projects/form'} component={ProjectsForm} />
          <Route exact path={'/projects/form/:id'} component={ProjectsForm} />
          <Route exact path={'/tasks'} component={TasksList} />
          <Route exact path={'/tasks/form/'} component={TasksForm} />
          <Route exact path={'/tasks/form/:id'} component={TasksForm} />
          <Route exact path={'/timesheets'} component={TimeSheetsList} />
          <Route exact path={'/timesheets/form/'} component={TimeSheetsForm} />
          <Route exact path={'/timesheets/form/:id'} component={TimeSheetsForm} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Routes;
