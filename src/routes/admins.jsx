import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Unfinished from 'Components/Shared/Unfinished';
import NotFound from 'Components/Shared/NotFound';
import EmployeeDetails from 'Components/Admin/EmployeeDetails';
import EmployeeList from 'Components/Admin/EmployeesList';
import ProjectDetails from 'Components/Admin/ProjectDetails';
import ProjectsList from 'Components/Admin/ProjectsList';

const Admin = () => {
  return (
    <Switch>
      {/*home*/}
      <Route exact path="/admin" component={Unfinished} />
      <Route exact path="/admin/projects" component={ProjectsList} />
      <Route exact path="/admin/projects/:id" component={ProjectDetails} />
      {/*create project form*/}
      <Route exact path="/admin/add-project" component={Unfinished} />
      <Route exact path="/admin/employees" component={EmployeeList} />
      <Route exact path="/admin/employees/:id" component={EmployeeDetails} />
      {/*reports*/}
      <Route exact path="/admin/reports" component={Unfinished} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Admin;
