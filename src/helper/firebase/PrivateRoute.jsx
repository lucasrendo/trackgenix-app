import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Routes from 'routes';
import { isAuthenticated } from 'Ducks/selector';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  <Route
    {...rest}
    render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to={Routes()} />)}
  />;
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  isAuthenticated: PropTypes.bool
};

PrivateRoute.defaultProps = {
  isAuthenticated: false
};

export default connect((state) => ({
  isAuthenticated: isAuthenticated(state)
}))(PrivateRoute);
