import Visibility from "./Visibility";

class GameLoop {
  constructor() {
    this.subscribers = [];
    this.lastRender = 0;
    this.visible = new Visibility(this.handleVisibility.bind(this));
    this.fallback = false;
    this.running = false;

    this.loop = this.loop.bind(this);
  }

  handleVisibility(isVisible) {
    this.fallback = !isVisible;

    if (this.fallback) {
      setTimeout(() => this.loop(window.performance.now()), 0);
    }
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.loop(window.performance.now());
    }
  }

  stop() {
    this.running = false;
  }

  subscribe(callback) {
    return this.subscribers.push(callback);
  }

  unsubscribe(id) {
    delete this.subscribers[id - 1];
  }

  loop(timestamp) {
    if (this.running) {
      const progress = timestamp - this.lastRender;

      this.subscribers.forEach(callback => {
        callback(progress);
      });

      this.lastRender = timestamp;
      if (!this.fallback) {
        requestAnimationFrame(this.loop);
      } else {
        setTimeout(() => this.loop(window.performance.now()), 0);
      }
    }
  }
}

export default GameLoop;
