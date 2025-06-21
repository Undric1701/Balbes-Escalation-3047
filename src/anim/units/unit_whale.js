/* AT7, 21.06, whale unit */
import * as res from "../rnd/res/res.js"
import *  as mth from "../../mth/mth.js"

export class Unit_Test {
    constructor() {

    };
    async init(name, params) {
        this.name = name;
        this.model = await res.loadG3DM("warshipAliens  T.g3dm");
    }
    close = () => {
        if (this.model != undefined) {
            this.model.free();
        }
    }
    response = () => {
    };
    render = () => {
        //this.prim.draw(mth.MatrMulMatr(mth.MatrRotate(animation.timer.time, mth.Vec3(204, 130, 102)), mth.MatrTranslate(mth.Vec3(2, 2, 2))));
        if (this.model != undefined)
            this.model.draw(mth.MatrMulMatr(mth.MatrRotate(animation.timer.time, mth.Vec3(0, 1, 0)),
                mth.MatrTranslate(mth.Vec3(Math.sin(animation.timer.time * mth.PI) * 10, -0.2, Math.cos(animation.timer.time * mth.PI) * 10))));
    }
    update = () => { }
    sendData = () => {
        let data = {
            name: this.name,
            id: this.id
        };
        return data;
    }
}

export function unitCreate() {
    return new Unit_Test();
}
