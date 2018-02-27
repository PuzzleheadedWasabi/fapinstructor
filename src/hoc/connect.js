import React from "react";
import PropTypes from "prop-types";

/**
 * A higher-order-component which passes the stores values to the wrapped component
 */
const connect = WrappedComponent =>
  class Connect extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    };

    render() {
       return <WrappedComponent {...this.props} {...this.context.store} />;
    }
  };

export default connect;
