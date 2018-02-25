class Visibility {
  constructor(callback) {
    // Set the name of the hidden property and the change event for visibility
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
      // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    this.hidden = hidden;
    this.visible = true;
    this.callback = callback;

    document.addEventListener(
      visibilityChange,
      this.handleVisibilityChange.bind(this),
      false
    );
  }

  handleVisibilityChange() {
    this.visible = !document[this.hidden];

    if (this.callback) {
      this.callback(this.visible);
    }
  }

  isVisible() {
    return this.visible;
  }
}

export default Visibility;
