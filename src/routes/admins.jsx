import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NewProject from 'Components/Admin/CreateProject';
import Unfinished from 'Components/Shared/Unfinished';
import NotFound from 'Components/Shared/NotFound';
import EmployeeDetails from 'Components/Admin/EmployeeDetails';
import EmployeeList from 'Components/Admin/EmployeesList';
import ProjectOverview from 'Components/Admin/ProjectOverview/index';
import ProjectsList from 'Components/Admin/ProjectsList';

const Admin = () => {
  return (
    <Switch>
      <Route exact path="/admin" component={Unfinished} />
      <Route exact path="/admin/projects" component={ProjectsList} />
      <Route exact path="/admin/projects/add" component={NewProject} />
      <Route exact path="/admin/projects/:projectId" component={ProjectOverview} />
      <Route exact path="/admin/employees" component={EmployeeList} />
      <Route exact path="/admin/employees/:id" component={Unfinished} />
      {/*reports*/}
      <Route exact path="/admin/reports" component={Unfinished} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Admin;
