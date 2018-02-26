import React from "react";
import PropTypes from "prop-types";
import { subscribe, unsubscribe } from "store";

/**
 * Passes the store into the React context.
 * Use connect to map the context store values to a components props.
 */
class StoreProvider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  };

  componentDidMount() {
    this.subscriberId = subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    unsubscribe(this.subscriberId);
  }

  getChildContext() {
    return { store: this.props.store };
  }

  render() {
    return this.props.children;
  }
}

export default StoreProvider;
