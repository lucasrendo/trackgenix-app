import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Admin = () => {
  return (
    <Switch>
      <Route path="/admin" component={Admin} />
    </Switch>
  );
};

export default Admin;
