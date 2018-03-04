import React from "react";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
// const Transition = props => <Slide direction="down" {...props} />;

class Notifier extends React.Component {
  state = {
    open: false,
    timer: 0
  };

  componentDidMount() {
    this.updateTimer();
  }

  updateTimer = () => {
    setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 50);
  };

  render() {
    return (
      <div
        style={{
          padding: "14px 24px",
          minWidth: "20vw",
          color: "white",
          backgroundColor: "#313131",
          borderRadius: "0 0 4px 4px",
          background: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography variant="body2" color="inherit" noWrap>
          Speed Strokes
        </Typography>
        <CircularProgress
          style={{ marginLeft: 10 }}
          variant="determinate"
          value={this.state.timer}
          color="secondary"
          size={20}
        />
      </div>
    );
  }
}

export default Notifier;
