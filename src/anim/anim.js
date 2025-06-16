/* AT7, 14.06.2025, animation module */
import * as rnd from "./rnd/rnd.js";
import * as time from "./timer.js";
import * as input from "./input.js";
import * as unit from "./units/unit.js"

export class Animation {
  constructor(socket) {
    this.timer = new time.Timer();
    this.render = new rnd.Render();
    rnd.renderInit(this.render);
    this.input = new input.Input();
    this.socket = socket;
    this.units = [];

    this.animAddUnit(new unit.Unit_Test);
  }
  animResponse = () => {
    this.timer.response();
    this.input.response();

    for (let unit of this.units) {
      unit.response();
    }
    this.animRender();
  }
  animRender = () => {
    //console.log(`Current time is ${this.timer.getTime()}`)

    this.render.renderStart();
    for (let unit of this.units) {
      unit.render();
    }
    this.render.renderEnd();
    window.requestAnimationFrame(this.animResponse);
  }
  animResize = (w, h) => {
    this.render.renderResize(w, h);
  }
  animAddUnit = (unit) => {
    this.units.push(unit);
  }
}

