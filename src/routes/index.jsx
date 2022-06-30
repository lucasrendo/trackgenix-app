import { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

const AdminRoutes = lazy(() => import('routes/admins'));
const EmployeeRoutes = lazy(() => import('routes/employees'));
const AuthRoutes = lazy(() => import('routes/auth'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/employee" component={EmployeeRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/auth" component={AuthRoutes} />
          <Redirect to="/auth" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
