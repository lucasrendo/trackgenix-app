import React from 'react';
import { Switch, Route } from 'react-router-dom';
import List from 'Components/Admins/List';
import Form from 'Components/Admins/Form';
import Unfinished from 'Components/Shared/Unfinished';
import NotFound from 'Components/Shared/NotFound';

const SuperAdmin = () => {
  return (
    <Switch>
      <Route exact path="/superadmin" component={List} />
      <Route exact path="/superadmin/add-admin" component={Form} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default SuperAdmin;
