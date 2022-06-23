import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from 'Components/Shared/Loading';
const EmployeeProfile = lazy(() => import('Components/Employee/UserProfile/index'));

const employeeRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={'/employee/:id'} />
          <Route exact path={'/employee/projects/:id'} />
          <Route exact path={'/employee/profile/:id'} component={EmployeeProfile} />
          <Route exact path={'/employee/workedhours/:id'} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default employeeRoutes;
