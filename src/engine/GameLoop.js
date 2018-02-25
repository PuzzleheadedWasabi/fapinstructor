class GameLoop {
  constructor() {
    this.subscribers = [];
    this.lastRender = 0;
    this.running = false;
    this.loop = this.loop.bind(this);
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
      if (!window.visible) {
        requestAnimationFrame(this.loop);
      } else {
        setTimeout(() => this.loop(window.performance.now()), 0);
      }
    }
  }
}

export default GameLoop;
