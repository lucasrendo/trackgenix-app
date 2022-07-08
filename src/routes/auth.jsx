import { Switch, Route } from 'react-router-dom';
import Login from 'Components/Auth/Login';
import Register from 'Components/Auth/RegisterForm';

const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/register" component={Register} />
    </Switch>
  );
};

export default AuthRoutes;
