import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from 'Components/Layout';

const superAdmin = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/superadmins" component={superAdmin} />
      </Switch>
    </Layout>
  );
};

export default superAdmin;
