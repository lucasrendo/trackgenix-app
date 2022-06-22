import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EmployeeLayout from 'Components/Employee/Layout';
import Loading from 'Components/Shared/Loading';
const EmployeeProfile = lazy(() => import('Components/Employee/UserProfile/index'));

const employeeRoutes = () => {
  return (
    <Router>
      <EmployeeLayout>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={'/employee/:id'} />
            <Route exact path={'/employee/projects/:id'} />
            <Route exact path={'/employee/profile/:id'} component={EmployeeProfile} />
            <Route exact path={'/employee/workedhours/:id'} />
          </Switch>
        </Suspense>
      </EmployeeLayout>
    </Router>
  );
};

export default employeeRoutes;
