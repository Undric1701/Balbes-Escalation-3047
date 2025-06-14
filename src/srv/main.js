import * as time from "../anim/timer.js"

let timer = new time.Timer();

setInterval(() => {
    timer.response();
    console.log(`Current time: ${timer.time}s\nFPS: ${timer.FPS}`);
})