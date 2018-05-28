import React from "react";
import { Route } from "react-router";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";

const App = () => (
  <div className="ui container">
    <Route path="/" exact component={HomePage} />
    <GuestRoute path="/login" exact component={LoginPage} />
    <UserRoute path="/dashboard" exact component={DashboardPage} />
  </div>
);

export default App;
