/* AT7, 14.06.2025, timer module */

function getTime() {
    let date = new Date();
    let t =
        date.getMilliseconds() / 1000.0 +
        date.getSeconds() +
        date.getMinutes() * 60 +
        date.getHours() * 60;
    return t;
}

export class Timer {
    constructor() {
        this.globalTime = 0.0;
        this.globalDeltaTime = 0.0;
        this.deltaTime = 0.0;
        this.time = 0.0;
        this.startTime = getTime();
        this.oldTime = this.startTime;
        this.oldTimeFPS = this.oldTime;
        this.pauseTime = 0.0;
        this.FPS = 0;
        this.frameCounter = 0;
        this.isPause = false;
        this.timePerSec = 1;
    };
    response = () => {
        let time = getTime();

        this.globalTime = (time - this.startTime) / this.timePerSec;
        this.globalDeltaTime = (time - this.oldTime) / this.timePerSec;

        if (this.isPause) {
            this.deltaTime = 0;
            this.pauseTime += (time - this.oldTime) / this.timePerSec;
        }
        else {
            this.deltaTime = this.globalDeltaTime;
            this.time = (time - this.pauseTime - this.startTime) / this.timePerSec;
        }

        this.frameCounter++;
        if (time - this.oldTimeFPS > this.timePerSec) {
            this.FPS = this.frameCounter * this.timePerSec / (time - this.oldTimeFPS);
            this.oldTimeFPS = time;
            this.frameCounter = 0;
        }
        this.oldTime = time;
    };
    togglePause = () => {
        this.isPause = !this.isPause;
    };
    getTime = () => {
        return this.time
    };
}

/* END OF 'timer.js' FILE */
