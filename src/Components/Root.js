import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ConfigPage from "../Pages/ConfigPage";
import ChangeLogPage from "../Pages/ChangeLogPage";
import GamePage from "../Pages/GamePage";
import "../events";
const Root = () => (
  <Router>
    <div>
      <Route exact path="/" component={ConfigPage} />
      <Route exact path="/changelog" component={ChangeLogPage} />
      <Route path="/game/:config" component={GamePage} />
    </div>
  </Router>
);

export default Root;
