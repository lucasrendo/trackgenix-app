import React, { lazy } from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
const EmployeeProfile = lazy(() => import('Components/Employee/UserProfile/index'));

const employeeRoutes = () => {
  return (
    <>
      <Route exact path={'/employee/:id'} />
      <Route exact path={'/employee/projects/:id'} />
      <Route exact path={'/employee/workedhours/:id'} />
      <Route exact path={'/employee/profile/:id'} component={EmployeeProfile} />
    </>
  );
};

export default employeeRoutes;
