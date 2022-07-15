import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminsList from 'Components/Admins/List';
import AdminsForm from 'Components/Admins/Form';
import NotFound from 'Components/Shared/NotFound';

const SuperAdmin = () => {
  return (
    <Switch>
      <Route exact path="/superadmin" component={AdminsList} />
      <Route exact path="/superadmin/add-admin" component={AdminsForm} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default SuperAdmin;
