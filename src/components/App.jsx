import React from "react";
import { Switch, Router, Route } from "react-router-dom";

import history from "../history";
import { connect } from "react-redux";
import AddTeam from "./AddTeam";
import "antd/dist/antd.css";

const App = (props) => {
  return (
    <Router history={history}>
      <Switch>
        {/* 
        <PrivateRoute
          path="/home"
          exact
          component={Home}
          user={user}
          dispatch={dispatch}
        />
        */}

        <Route path="/TeamApp" component={AddTeam} />
        <Route path="/" exact component={AddTeam} />
      </Switch>
    </Router>
  );
};

export default connect()(App);
