import * as test from "./unit_test.js"
import * as player from "./unit_player.js"
import * as water from "./unit_water.js"
import * as skybox from "./unit_skybox.js"
/*
export class Unit {
    constructor() {
        this.init();
    }
    init = () => {};
    response = () => {};
    render = () => {};
    close = () => {};
}
*/

export function unitCreate(unit, name, params) {
    if (unit == "water") {
        return water.unitCreate(name, params);
    } else if (unit == "test") {
        return test.unitCreate(name, params);
    } else if (unit == "player") {
        return player.unitCreate(name, params);
    } else if (unit == "skybox") {
        return skybox.unitCreate(name, params);
    }
    //return new Unit();
}
