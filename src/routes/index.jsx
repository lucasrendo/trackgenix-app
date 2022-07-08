import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from 'Components/Layout';
import Loading from 'Components/Shared/Loading';
const superAdminRoutes = lazy(() => import('routes/superAdmins'));
const AdminRoutes = lazy(() => import('routes/admins'));
const EmployeeRoutes = lazy(() => import('routes/employees'));

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/employee" component={EmployeeRoutes} />
            <Route path="/admin" component={AdminRoutes} />
            <Route path="/super-admins" component={superAdminRoutes} />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default Routes;
