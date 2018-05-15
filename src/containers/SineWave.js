import React from "react";
// internal
import connect from "hoc/connect";

// var step = -4;

class SineWave extends React.Component {
  componentDidMount() {
    this.ctx = this.getContext();
  }

  getContext = () => {
    const ctx = this.refs.canvas.getContext("2d");
    return ctx;
  };

  draw = () => {
    const width = 500;
    let offset = width;
    for (let x = 0; x < width; x++) {
      if (x > this.props.game.strokeWave.length) {
        break;
      }

      this.ctx.beginPath();
      this.ctx.moveTo(offset, 30);
      this.ctx.lineTo(offset + 10, 0);
      this.ctx.lineTo(offset + 20, 30);
      this.ctx.strokeStyle = "#ff0000";
      this.ctx.stroke();

      offset -= this.props.game.strokeWave[x];
    }
  };

  // drawPoint = (ctx, y) => {
  //   var radius = 3;
  //   ctx.beginPath();
  //   // Hold x constant at 4 so the point only moves up and down.
  //   ctx.arc(4, y, radius, 0, 2 * Math.PI, false);
  //   ctx.fillStyle = "red";
  //   ctx.fill();
  //   ctx.lineWidth = 1;
  //   ctx.stroke();
  // };

  // plotSine = (ctx, xOffset, yOffset) => {
  //   var width = ctx.canvas.width;
  //   var height = ctx.canvas.height;
  //   var scale = 20;
  //   ctx.beginPath();
  //   ctx.lineWidth = 2;
  //   ctx.strokeStyle = "rgb(66,44,255)";
  //   // console.log("Drawing point...");
  //   // drawPoint(ctx, yOffset+step);

  //   var x = 4;
  //   var y = 0;
  //   var amplitude = 40;
  //   var frequency = 2;
  //   //ctx.moveTo(x, y);
  //   ctx.moveTo(x, 50);
  //   while (x < width) {
  //     y = height / 2 + amplitude * Math.sin((x + xOffset) / frequency);
  //     ctx.lineTo(x, y);
  //     x++;
  //     // console.log("x="+x+" y="+y);
  //   }
  //   ctx.stroke();
  //   ctx.save();
  //   console.log("Drawing point at y=" + y);
  //   this.drawPoint(ctx, y);
  //   ctx.stroke();
  //   ctx.restore();
  // };

  // draw = () => {
  //   const ctx = this.ctx;
  //   ctx.clearRect(0, 0, 500, 500);
  //   ctx.save();

  //   this.plotSine(ctx, step, 50);
  //   ctx.restore();

  //   step += 4;
  //   window.requestAnimationFrame(this.draw);
  // };

  render() {
    if (this.ctx) {
      this.draw();
    }

    return <canvas ref="canvas" width="500" height="100" />;
  }
}

export default connect(SineWave);
