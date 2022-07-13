import { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Layout from 'Components/Layout';
import NotFound from 'Components/Shared/NotFound';
import Unfinished from 'Components/Shared/Unfinished';

const AdminRoutes = lazy(() => import('routes/admins'));
const superAdminRoutes = lazy(() => import('routes/superAdmins'));
const EmployeeRoutes = lazy(() => import('routes/employees'));
const AuthRoutes = lazy(() => import('routes/auth'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Unfinished} />
            <Route path="/employee" component={EmployeeRoutes} />
            <Route path="/admin" component={AdminRoutes} />
            <Route path="/superadmin" component={superAdminRoutes} />
            <Route path="/auth" component={AuthRoutes} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default Routes;
