import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ErrorBoundary from "containers/ErrorBoundary";
import ConfigPage from "containers/Pages/ConfigPage";
import GamePage from "containers/Pages/GamePage";
import StoreProvider from "containers/StoreProvider";

const Root = ({ store }) => (
  <ErrorBoundary>
    <StoreProvider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={ConfigPage} />
          <Route exact path="/game/:config" component={GamePage} />
        </div>
      </Router>
    </StoreProvider>
  </ErrorBoundary>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
