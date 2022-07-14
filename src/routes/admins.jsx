import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Unfinished from 'Components/Shared/Unfinished';
import NotFound from 'Components/Shared/NotFound';
import Admins from 'Components/Admins/Form';

const Admin = () => {
  return (
    <Switch>
      {/*home*/}
      <Route exact path="/admin" component={Admins} />
      {/*Project list*/}
      <Route exact path="/admin/projects" component={Unfinished} />
      {/*single project details*/}
      <Route exact path="/admin/projects/:id" component={Unfinished} />
      {/*create project form*/}
      <Route exact path="/admin/add-project" component={Unfinished} />
      {/*form to edit project*/}
      <Route exact path="/admin/edit-project/:id" component={Unfinished} />
      {/*reports*/}
      <Route exact path="/admin/reports" component={Unfinished} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Admin;
