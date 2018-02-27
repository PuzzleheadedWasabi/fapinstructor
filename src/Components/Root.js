import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ErrorBoundary from "Containers/ErrorBoundary";
import ConfigPage from "Containers/Pages/ConfigPage";
import ChangeLogPage from "Containers/Pages/ChangeLogPage";
import GamePage from "Containers/Pages/GamePage";
import StoreProvider from "Containers/StoreProvider";

const Root = ({ store }) => (
  <ErrorBoundary>
    <StoreProvider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={ConfigPage} />
          <Route exact path="/changelog" component={ChangeLogPage} />
          {/*<Route exact path="/game" component={GamePage} />*/}
          <Route exact path="/game/:config" component={GamePage} />
        </div>
      </Router>
    </StoreProvider>
  </ErrorBoundary>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;
