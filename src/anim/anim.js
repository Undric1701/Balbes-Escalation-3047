/* AT7, 14.06.2025, animation module */
import * as rnd from "./rnd/rnd.js";
import * as time from "./timer.js";
import * as input from "./input.js";

export class Animation {
  constructor(socket) {
    this.timer = new time.Timer();
    this.render = new rnd.Render();
    this.input = new input.Input();
    this.socket = socket;
    this.units = [];
  }
  animResponse = () => {
    this.timer.response();
    this.input.response();

    for (let unit of this.units) {
      unit.response(this);
    }
    this.animRender();
  }
  animRender = () => {
    console.log(`Current time is ${this.timer.getTime()}`)

    for (let unit of this.units) {
      unit.response(this);
    }
    window.requestAnimationFrame(this.animResponse);
  }
  animResize = (w, h) => {
    this.render.renderResize(w, h);
  }
  animAddUnit = (unit) => {
    this.units.push(unit);
  }
}

