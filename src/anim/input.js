/* AT7, 14.06.2025, mrender module */

import { control } from "../mth/mth.js"

export class Input {
    constructor() {
        this.keysOld = new Array(256).fill(false);
        this.keys = new Array(256).fill(false);
        this.keysClick = new Array(256).fill(false);
        this.shiftKey = false;
        this.altKey = false;
        this.ctrlKey = false;
        
        this.mousePressed = false;
        this.saveX = -1;
        this.saveY = -1;
        this.Mx = 0;
        this.My = 0;
        this.Mdx = 0;
        this.Mdy = 0;
        let canvas = document.getElementById("webgl-canvas");
        canvas.onmousedown = (ev) => { animation.input.mousePressed = true; }
        canvas.onmouseup = (ev) => { animation.input.mousePressed = false; animation.input.Mdx = animation.input.Mdy = 0;}
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
            if (!event.shiftKey && !event.altKey && !event.ctrlKey) {
                animation.input.keysOld[event.key.charCodeAt(0)] = animation.input.keys[event.key.charCodeAt(0)];
                animation.input.keys[event.key.charCodeAt(0)] = true;
                animation.input.keysClick[event.key.charCodeAt(0)] = !animation.input.keysOld[event.key.charCodeAt(0)] && animation.input.keys[event.key.charCodeAt(0)];
            }
            animation.input.shiftKey = event.shiftKey;
            animation.input.altKey = event.altKey;
            animation.input.ctrlKey = event.ctrlKey;
        });
        document.addEventListener('keyup', function (e) {
            if (!e.shiftKey && !e.altKey && !e.ctrlKey) {
                animation.input.keysOld[e.key.charCodeAt(0)] = animation.input.keys[e.key.charCodeAt(0)];
                animation.input.keys[e.key.charCodeAt(0)] = false;
                animation.input.keysClick[e.key.charCodeAt(0)] = false;
            }
            animation.input.shiftKey = e.shiftKey;
            animation.input.altKey = e.altKey;
            animation.input.ctrlKey = e.ctrlKey;
        });
    };

    response() {
        /*
        if (animation.input.mousePressed == true || event.key == 'w' || event.key == 'W' || event.key == 'a' || event.key == 'A' || event.key == 's' || event.key == 'S' || event.key == 'd' || event.key == 'D' || event.key == 'q' || event.key == 'Q' || event.key == 'e' || event.key == 'E') {
          control(event);
        }
        */
       control(animation.input.keys, animation.input.shiftKey);
    }
}