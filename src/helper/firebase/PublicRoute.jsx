import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Routes from 'routes';
import { isAuthenticated } from 'Ducks/selectors';

const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  <Route
    {...rest}
    render={(props) => (!isAuthenticated ? <Component {...props} /> : <Redirect to={Routes()} />)}
  />;
};
PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
PublicRoute.defaultProps = {
  isAuthenticated: false
};

export default connect((state) => ({
  isAuthenticated: isAuthenticated(state)
}))(PublicRoute);
