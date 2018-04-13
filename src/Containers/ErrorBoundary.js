import React from "react";
import Raven from "raven-js";
import Typography from "material-ui/Typography";
import monkey from "images/monkey.gif";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };

    Raven.config("https://75a8117570924a2eb142da7e40a17968@sentry.io/204785", {
      release: "2.0.1",
      maxUrlLength: 4000
    }).install();
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    Raven.captureException(error);
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div style={{ textAlign: "center", marginTop: "10vw" }}>
            <Typography color="secondary" variant="headline">
              Something went wrong
            </Typography>
            <Typography color="secondary" variant="subheading">
              The error has been logged and we've dispatched the code monkeys
            </Typography>
            <img src={monkey} alt="code monkey" />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
