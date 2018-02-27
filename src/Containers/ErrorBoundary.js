import React from 'react';
import Raven from "raven-js";
import monkey from "images/monkey.gif"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };

    Raven.config("https://75a8117570924a2eb142da7e40a17968@sentry.io/204785", {
      release: "2.0.0",
      maxUrlLength: 2000
    }).install();
    console.log('raven config')
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    Raven.captureException(error);
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <h2>The error has been logged and we've dispatched the code monkeys</h2>
          <img src={monkey} alt="code monkey" />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
