/* AT7, 14.06.2025, mrender module */

import { control } from "../mth/mth.js"

export class Input {
    constructor() {
        this.pressedButtons = new Array(255);
        this.mousePressed = false;
        this.saveX = -1;
        this.saveY = -1;
        this.Mx = 0;
        this.My = 0;
        this.Mdx = 0;
        this.Mdy = 0;
        let canvas = document.getElementById("webgl-canvas");
        canvas.onmousedown = (ev) => { animation.input.mousePressed = true; }
        canvas.onmouseup = (ev) => { animation.input.mousePressed = false; }
        canvas.onmousemove = (ev) => {
            if (animation.input.saveX == -1 || animation.input.saveY == -1) {
                animation.input.saveX = ev.x;
                animation.input.saveY = ev.y;
            }
            if (animation.input.mousePressed) {
                animation.input.Mx = ev.x;
                animation.input.My = ev.y;
                animation.input.Mdx = ev.x - animation.input.saveX;
                animation.input.Mdy = ev.y - animation.input.saveY;
                control(ev);
            }
            animation.input.saveX = ev.x;
            animation.input.saveY = ev.y;
        };
        document.addEventListener('keydown', function (event) {
            if (animation.input.mousePressed == true || event.key == 'w' || event.key == 'W' || event.key == 'a' || event.key == 'A' || event.key == 's' || event.key == 'S' || event.key == 'd' || event.key == 'D' || event.key == 'q' || event.key == 'Q' || event.key == 'e' || event.key == 'E') {
                control(event);
            }
        });
    };
}