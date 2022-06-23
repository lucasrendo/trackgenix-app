import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from 'Components/Shared/Loading';
const EmployeeHome = lazy(() => import('Components/Employee/Home'));

const employeeRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={'/employee/home'} component={EmployeeHome} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default employeeRoutes;
