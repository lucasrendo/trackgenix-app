import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NewProject from 'Components/Projects/Form';
import Unfinished from 'Components/Shared/Unfinished';
import NotFound from 'Components/Shared/NotFound';

const Admin = () => {
  return (
    <Switch>
      {/*home*/}
      <Route exact path="/admin" component={Unfinished} />
      {/*Project list*/}
      <Route exact path="/admin/projects" component={NewProject} />
      {/*single project details*/}
      <Route exact path="/admin/projects/:id" component={Unfinished} />
      {/*create project form*/}
      <Route exact path="/admin/projects/add" component={NewProject} />
      {/*form to edit project*/}
      <Route exact path="/admin/edit-project/:id" component={Unfinished} />
      {/*reports*/}
      <Route exact path="/admin/reports" component={Unfinished} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Admin;
