import React from "react";
import { Route } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import SignupPage from "./components/pages/SignupPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import ForgetPasswordPage from "./components/pages/ForgetPasswordPage";
import UserRoute from "./components/routes/UserRoute";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import GuestRoute from "./components/routes/GuestRoute";
import TopNavigation from "./components/navigation/TopNavigation";
import NewBookPage from "./components/pages/NewBookPage";

const App = ({ location, isAuthenticate }) => (
  <div className="ui container">
    {isAuthenticate && <TopNavigation />}
    <Route location={location} path="/" exact component={HomePage} />
    <Route
      location={location}
      path="/confirmation/:token"
      exact
      component={ConfirmationPage}
    />
    <Route
      location={location}
      path="/reset_password/:token"
      exact
      component={ResetPasswordPage}
    />
    <GuestRoute
      location={location}
      path="/forget_password"
      exact
      component={ForgetPasswordPage}
    />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute
      location={location}
      path="/signup"
      exact
      component={SignupPage}
    />
    <UserRoute
      location={location}
      path="/dashboard"
      exact
      component={DashboardPage}
    />
    <UserRoute
      location={location}
      path="/books/new"
      exact
      component={NewBookPage}
    />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticate: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticate: !!state.user.token
  };
}

export default connect(mapStateToProps)(App);
