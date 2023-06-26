const timer = document.getElementById("timer");
const chrono = {
  total: 0,
  lastStart: null,
  loop: null,
  getTime: function () {
    if (this.lastStart)
      return new Date() - this.lastStart + this.total;
    return this.total;
  },
  getTimeText: function () {
    const total_seconds = this.getTime() / 1000;
    const minutes = parseInt(seconds / 60);
    return `${minutes}:${seconds.toFixed(2)}`;
  },
  play: function (action, delay) {
    this.lastStart = new Date();
    this.loop = window.setInterval(action, delay);
  },
  pause: function () {
    this.total = this.getTime();
    this.lastStart = null;
    window.clearInterval(this.loop);
  },
  reset: function () {
    this.total = 0;
    this.lastStart = null;
    window.clearInterval(this.loop);
  },
};

function play() {
  chrono.pause();
  chrono.play(() => timer.innerHTML = chrono.getTimeText());
}
