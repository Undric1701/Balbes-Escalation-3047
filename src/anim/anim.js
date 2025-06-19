/* AT7, 14.06.2025, animation module */
import * as rnd from "./rnd/rnd.js";
import { camera } from "../mth/mth_cam.js";
import * as time from "./timer.js";
import * as input from "./input.js";
import * as unit from "./units/unit.js";

export class Animation {
  constructor(socket) {
    this.timer = new time.Timer();
    this.render = new rnd.Render();
    //rnd.renderInit(this.render);
    this.input = new input.Input();
    this.socket = socket;
    this.cam = camera();
    this.saveX = this.saveY = -1;
    this.Mdx = this.Mdy = this.Mx = this.My = 0;
    this.mousePressed = false;
    this.units = [];
  }
  async finishInit() {
    await this.render.finishInit();
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
  async animAddUnit(unit) {
    this.units.push(unit);
    await unit.init()
  }
}

