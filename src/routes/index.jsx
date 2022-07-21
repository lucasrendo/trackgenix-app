import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'Components/Layout';
import NotFound from 'Components/Shared/NotFound';
import Unfinished from 'Components/Shared/Unfinished';
import PrivateRoute from './PrivateRoute';
import { tokenListener } from 'helper/firebase';
import { getAuthEmployee } from 'redux/thunks/employee';
import { getAuthAdmin } from 'redux/thunks/admin';

const AdminRoutes = lazy(() => import('routes/admins'));
const superAdminRoutes = lazy(() => import('routes/superAdmins'));
const EmployeeRoutes = lazy(() => import('routes/employees'));
const AuthRoutes = lazy(() => import('routes/auth'));

const Routes = () => {
  const dispatch = useDispatch();
  const homePath = useSelector((state) => state.global.homePath);
  const token = useSelector((store) => store.auth.authenticated?.token);
  const role = useSelector((store) => store.auth.authenticated?.role);

  useEffect(() => {
    tokenListener();
  }, []);

  useEffect(() => {
    if (token) {
      role === 'EMPLOYEE' && dispatch(getAuthEmployee(token));
      role === 'ADMIN' && dispatch(getAuthAdmin(token));
    }
  }, [token]);

  return (
    <Router>
      <Suspense fallback={<div />}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Unfinished}>
              {homePath !== '/' && <Redirect to={homePath} />}
            </Route>
            <PrivateRoute path="/employee" role="EMPLOYEE" component={EmployeeRoutes} />
            <PrivateRoute path="/admin" role="ADMIN" component={AdminRoutes} />
            <PrivateRoute path="/superadmin" role="SUPER ADMIN" component={superAdminRoutes} />
            <Route path="/auth" component={AuthRoutes} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default Routes;
