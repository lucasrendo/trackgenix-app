import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EmployeeLayout from 'Components/Employee/Layout';
import Loading from 'Components/Shared/Loading';
import EmployeeHome from 'Components/Employee/Home';

const employeeRoutes = () => {
  return (
    <Router>
      <EmployeeLayout>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={'/employee/home'} component={EmployeeHome} />
          </Switch>
        </Suspense>
      </EmployeeLayout>
    </Router>
  );
};

export default employeeRoutes;
