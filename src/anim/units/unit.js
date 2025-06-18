import * as test from "./unit_test.js"
import * as water from "./unit_water.js"
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
    }
    //return new Unit();
}
