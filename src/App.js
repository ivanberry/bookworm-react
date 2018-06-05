import React, { Component } from "react";
import { Route } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "react-loader";

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
import { fetchCurrentUser } from "./actions/user";
import NewBookPage from "./components/pages/NewBookPage";

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    const { location, isAuthenticated, loaded } = this.props;
    return (
      <Loader loaded={loaded}>
        <div className="ui container">
          {isAuthenticated && <TopNavigation />}
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
          <GuestRoute
            location={location}
            path="/login"
            exact
            component={LoginPage}
          />
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
      </Loader>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    loaded: state.user.loaded
  };
}

export default connect(mapStateToProps, { fetchCurrentUser })(App);
