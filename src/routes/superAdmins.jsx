import React from 'react';
import { Switch, Route } from 'react-router-dom';

const superAdmin = () => {
  return (
    <Switch>
      <Route path="/superadmins" component={superAdmin} />
    </Switch>
  );
};

export default superAdmin;
