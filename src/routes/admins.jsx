import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from 'Components/Layout';

const Admin = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/admin" component={Admin} />
      </Switch>
    </Layout>
  );
};

export default Admin;
