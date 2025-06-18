export * from "./unit_test.js"
export * from "./unit_player.js"
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

export function unitCreate() {
    return new Unit();
}
