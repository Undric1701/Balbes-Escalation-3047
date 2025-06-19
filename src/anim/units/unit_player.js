import * as res from "../rnd/res/res.js"
import *  as mth from "../../mth/mth.js"

export class Unit_Player {
    constructor(com, type) {
        this.com = com;
        this.type = type;
    };
    async init(ev) {
        this.model = await res.loadG3DM("../../../../bin/models/warship4alT1.g3dm");
    }
    close() {
    }
    response = () => {
    };
    render(ev) {
        this.model.draw(mth.MatrMulMatr(mth.MatrScale(mth.Vec3(0.5, 0.5, 0.5)), mth.MatrTranslate(mth.Vec3(-18, 3.47, 8))));
    }
}

export function unitCreate(com, type) {
    return new Unit_Player(com, type);
}
