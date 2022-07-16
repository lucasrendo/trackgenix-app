import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminsForm from 'Components/SuperAdmins/CreateAdmin';
import AdminsList from 'Components/SuperAdmins/AdminList';
import Unfinished from 'Components/Shared/Unfinished';
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
