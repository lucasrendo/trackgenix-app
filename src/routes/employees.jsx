import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'Components/Employee/Home';
import Profile from 'Components/Employee/UserProfile';
import WorkedHours from 'Components/Employee/WorkedHours';
import Projects from 'Components/Employee/MyProjects';
import Layout from 'Components/Layout';

const Employee = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/employee/home" component={Home} />
        <Route exact path="/employee">
          <Redirect to="/employee/home" />
        </Route>
        <Route path="/employee/workedhours" component={WorkedHours} />
        <Route path="/employee/projects" component={Projects} />
        <Route path="/employee/profile" component={Profile} />
      </Switch>
    </Layout>
  );
};

export default Employee;
