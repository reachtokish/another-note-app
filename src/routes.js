import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Gist from './pages/gist';

export default function RouteConfig() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/gist/:id">
          <Gist />
        </Route>
      </Switch>
    </Router>
  );
}