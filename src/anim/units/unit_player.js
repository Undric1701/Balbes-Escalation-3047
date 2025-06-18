import * as res from "../rnd/res/res.js"
import *  as mth from "../../mth/mth.js"

export class Unit_Player {
    constructor() {

    };
    async init(ev) {
        this.model = await res.loadG3DM("../../../../bin/models/warshipal.g3dm");
        this.model.trans = mth.MatrRotateY(-90);
    }
    close() {
    }
    response = () => {
    };
    render(ev) {
        //this.model.draw(mth.MatrMulMatr3(mth.MatrScale(mth.Vec3(0.5, 0.5, 0.5)), mth.MatrTranslate(mth.Vec3(0, -1, 0)), mth.MatrInverse(window.animation.cam.matrVP)));
    }
}

export function unitCreate() {
    return new Unit_Player();
}
