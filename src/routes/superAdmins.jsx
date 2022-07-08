import React from 'react';
import { Switch, Route } from 'react-router-dom';
import List from 'Components/SuperAdmins/List';
import Form from 'Components/SuperAdmins/Form';
import NotFound from 'Components/Shared/NotFound';

const superAdmin = () => {
  return (
    <Switch>
      <Route exact path="/superadmin" component={List} />
      <Route exact path="/superadmin/add-admin" component={Form} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default superAdmin;
