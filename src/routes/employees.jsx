import React, { lazy } from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
const EmployeeProjects = lazy(() => import('Components/Employee/MyProjects'));

const employeeRoutes = () => {
  return (
    <>
      <Route exact path={'/:id'} />
      <Route exact path={'/projects/:id'} component={EmployeeProjects} />
      <Route exact path={'/profile/:id'} />
      <Route exact path={'/workedhours/:id'} />
    </>
  );
};

export default employeeRoutes;
