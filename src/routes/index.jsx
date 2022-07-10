import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from 'Components/Layout';
import Loading from 'Components/Shared/Loading';
import PrivateRoute from 'helper/firebase/PrivateRoute';
import PublicRoute from 'helper/firebase/PublicRoute';
const superAdminRoutes = lazy(() => import('routes/superAdmins'));
const AdminRoutes = lazy(() => import('routes/admins'));
const EmployeeRoutes = lazy(() => import('routes/employees'));
const AuthRoutes = lazy(() => import('routes/auth'));

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Switch>
            <PublicRoute path="/auth/login" component={AuthRoutes} />
            <Route path="/employee" component={EmployeeRoutes} />
            <Route path="/admin" component={AdminRoutes} />
            <PrivateRoute path="/super-admins" component={superAdminRoutes} />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default Routes;
