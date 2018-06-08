import React from "react";
import Raven from "raven-js";
import Typography from "material-ui/Typography";
import monkey from "images/monkey.gif";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
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
            <div
              style={{
                maxWidth: "90vw",
                wordWrap: "break-word",
                marginTop: 50
              }}
            >
              <Typography color="secondary" variant="subheading">
                {error.message}
              </Typography>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
