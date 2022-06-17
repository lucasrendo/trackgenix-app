import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EmployeeLayout from 'Components/Employee/Layout';
import Loading from 'Components/Shared/Loading';
const EmployeeProjects = lazy(() => import('Components/Employee/MyProjects'));

const employeeRoutes = () => {
  return (
    <Router>
      <EmployeeLayout>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={'/employee/:id'} />
            <Route exact path={'/employee/:id/projects'} component={EmployeeProjects} />
            <Route exact path={'/employee/:id/profile'} />
            <Route exact path={'/employee/:id/workedhours'} />
          </Switch>
        </Suspense>
      </EmployeeLayout>
    </Router>
  );
};

export default employeeRoutes;
