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

export function unitCreate(unit) {
    if (unit == "water") {
        return water.unitCreate();
    } else if (unit == "test") {
        return test.unitCreate()
    } else if (unit == "player") {
        return player.unitCreate()
    } else if (unit == "skybox") {
        return skybox.unitCreate();
    }
    //return new Unit();
}
