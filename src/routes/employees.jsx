import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EmployeeLayout from 'Components/Employee/Layout';
import Loading from 'Components/Shared/Loading';
const EmployeeWorkedHours = lazy(() => import('Components/Employee/WorkedHours'));

const employeeRoutes = () => {
  return (
    <Router>
      <EmployeeLayout>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={'/employee/:id'} />
            <Route exact path={'/employee/:id/projects'} component={EmployeeWorkedHours} />
            <Route exact path={'/employee/:id/profile'} />
            <Route exact path={'/employee/:id/workedhours'} />
          </Switch>
        </Suspense>
      </EmployeeLayout>
    </Router>
  );
};

export default employeeRoutes;
