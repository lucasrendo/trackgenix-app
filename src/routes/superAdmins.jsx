import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from 'Components/Layout';
import Loading from 'Components/Shared/Loading';
import List from 'Components/Admins/List';
import Form from 'Components/Admins/Form';

const superAdmins = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Layout>
          <Switch>
            <Route exact path={'/super-admins'} component={List} />
            <Route exact path={'/super-admins/form'} component={Form} />
          </Switch>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default superAdmins;
