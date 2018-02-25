class TickPlayer {
  constructor(soundPlayed) {
    this.soundPlayed = soundPlayed;
    this.lastTick = 0;
  }

  update(progress, speed) {
    if (speed > 0) {
      if (this.lastTick > (1 / speed) * 1000) {
        window.audio.play("tick");

        if (this.soundPlayed) {
          this.soundPlayed();
        }
        this.lastTick = 0;
      } else {
        this.lastTick += progress;
      }
    }
  }
}

export default TickPlayer;
