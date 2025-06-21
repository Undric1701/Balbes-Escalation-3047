/* AT7, 14.06.2025, animation module */

import * as rnd from "./rnd/rnd.js";
import { camera } from "../mth/mth_cam.js";
import * as time from "./timer.js";
import * as input from "./input.js";
import * as Unit from "./units/unit.js"


/*
const rnd = require("./rnd/rnd.js");
const camera = require("../mth/mth_cam.js").camera;
const time = require("./timer.js");
const input = require("./input.js");
*/

//import * as unit from "./units/unit.js";

export class Animation {
  constructor(/* socket */) {
    this.timer = new time.Timer();
    if (typeof window !== 'undefined') {
      this.render = new rnd.Render();
      this.input = new input.Input();
      this.cam = camera();
      window.onresize = () => { this.animResize(window.innerWidth, window.innerHeight) }
    }
    //this.socket = socket;
    /*
    this.saveX = this.saveY = -1;
    this.Mdx = this.Mdy = this.Mx = this.My = 0;
    this.mousePressed = false;
    */
    this.units = [];
  }
  async finishInit() {
    if (typeof window !== 'undefined') {
      await this.render.finishInit();
    }
  }
  animResponse = () => {
    this.timer.response();
    //this.input.response();

    for (let unit of this.units) {
      unit.response();
    }
    if (typeof window !== 'undefined') {
      this.animRender();
    }
  }
  animRender = () => {
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
  async animAddUnit(id, unitName, params) {
    let unit = Unit.unitCreate(id);
    if (unit != undefined) {
      this.units.push(unit);
      await unit.init(unitName, params);
    }
  }
  async updateUnits(unitsList) {
    for (let i = 0; i < unitsList.length; i++) {
      let uni = this.units.find(unit => unit.name == unitsList[i].name);
      if (uni == undefined) {
        await this.animAddUnit(unitsList[i].id, unitsList[i].name, unitsList.params);
      } else {
        await uni.update(unitsList[i].params)
      }
    }

    for (let i = 0; i < this.length; i++) {
      let uni = unitsList.find(unit => unit.name == this.units[i].name);
      if (uni == undefined) {
        await this.units[i].close();
      }
    }
  }
}

