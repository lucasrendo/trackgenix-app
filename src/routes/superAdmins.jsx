import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Unfinished from 'Components/Shared/Unfinished';
import NotFound from 'Components/Shared/NotFound';

const SuperAdmin = () => {
  return (
    <Switch>
      <Route exact path="/superadmin" component={Unfinished} />
      <Route exact path="/superadmin/add-admin" component={Unfinished} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default SuperAdmin;
