import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Layout from 'Components/Layout';
import Loading from 'Components/Shared/Loading';
import List from 'Components/SuperAdmin/List';
import Form from 'Components/SuperAdmin/Form';

const superAdmins = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Layout>
          {superAdmins ? (
            <em>Logged as {superAdmins.firstName}</em>
          ) : (
            <Link to="/auth/login">Login</Link>
          )}
          <Switch>
            {/* <Route
              path="/auth/login"
              render={() => {
                return superAdmins ? <Redirect to="/super-admins" /> : <Redirect to="/" />;
              }}
              component={List}
            /> */}
            {/* <Route exact path={'/super-admins'} component={List} /> */}
            <Route exact path={'/super-admins/form'} component={Form} />
          </Switch>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default superAdmins;
