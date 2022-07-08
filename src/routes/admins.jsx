import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Admin = () => {
  return (
    <Switch>
      {/*home*/}
      <Route exact path="/admin" />
      {/*Project list*/}
      <Route exact path="/admin/projects" />
      {/*single project details*/}
      <Route exact path="/admin/projects/:id" />
      {/*create project form*/}
      <Route exact path="/admin/add-project" />
      {/*form to edit project*/}
      <Route exact path="/admin/edit-project/:id" />
      {/*reports*/}
      <Route exact path="/admin/reports" />
    </Switch>
  );
};

export default Admin;
