import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ConfigPage from "../Containers/Pages/ConfigPage";
import ChangeLogPage from "../Containers/Pages/ChangeLogPage";
import GamePage from "../Containers/Pages/GamePage";
import StoreProvider from "../Containers/StoreProvider";
import { createStore } from "../store";

const initialState = {
  actionTriggers: null,
  executing: false
};
window.store = createStore(initialState);


const Root = () => (
  <StoreProvider store={window.store}>
    <Router>
      <div>
        <Route exact path="/" component={ConfigPage} />
        <Route exact path="/changelog" component={ChangeLogPage} />
        <Route exact path="/game" component={GamePage} />
        {/*<Route exact path="/game/:config" component={GamePage} />*/}
      </div>
    </Router>
  </StoreProvider>
);

export default Root;
