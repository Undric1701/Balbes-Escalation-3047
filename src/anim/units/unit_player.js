import * as res from "../rnd/res/res.js"
import *  as mth from "../../mth/mth.js"

export class Unit_Player {
    constructor(com, type) {
        this.com = com;
        this.type = type;
        this.pos = mth.Vec3(10, 0, 10);
        this.pos = mth.Vec3(Math.random() * 30);
        this.velocity = mth.Vec3(0, 0, 0);
        this.rotate = 0;          /* In degrees */
    };
    async init(name, params) {
        this.name = name;
        this.model = await res.loadG3DM("warship4al.g3dm");
    }
    close() {
    }
    response = () => {

    };
    render(ev) {
        if (this.model != undefined)
            this.model.draw(mth.MatrMulMatr(mth.MatrScale(mth.Vec3(0.5, 0.5, 0.5)), mth.MatrTranslate(this.pos)));
    }
    update = () => { }
}

export function unitCreate(com, type) {
    return new Unit_Player(com, type);
}
