import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Login from 'Components/Auth/Login';
import Layout from 'Components/Layout';
import register from 'Components/Auth/RegisterForm';

const authRoutes = [{ name: 'Login', path: '/auth/login' }];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={authRoutes}>
      <Switch>
        <Route path={`${url}/login`} component={Login} />
        <Route path={`${url}/register`} component={register} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
