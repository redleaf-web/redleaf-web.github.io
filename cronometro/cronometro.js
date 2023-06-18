function time() {
  let result = new Date() - start - pauseTime;
  let seconds = (result * speed / 1000).toFixed(2);
  return seconds;
}


function toogleSpeed() {
  const list = [.1, .5, 1, 2];
  const next = (list.indexOf(speed) + 1) % list.length;
  speed = list[next];
  speedButton.innerHTML = speed + "x";
}


function tooglePause() {
  const now = new Date();
  if (pauseStart) {
    pauseTime += (now - pauseStart);
    interval = window.setInterval(() => clock.innerHTML = time());  // FEIO
  } else {
    window.clearInterval(interval);
  }
  pauseStart = pauseStart ? null : now;
  pauseButton.innerHTML = pauseStart ? "paused" : "running";
}


let clock = document.getElementById("clock");
let speedButton = document.getElementById("speed");
let pauseButton = document.getElementById("pause");

let start = new Date();
let pauseStart = null;
let pauseTime = 0;
let speed = 1;

let interval = window.setInterval(() => clock.innerHTML = time(), 45);

