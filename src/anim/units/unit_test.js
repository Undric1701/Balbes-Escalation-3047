/* AT7, 16.06, unit test sample */
import * as res from "../rnd/res/res.js"
import *  as mth from "../../mth/mth.js"
import { cubePrim, dodePrim, icosPrim, octaPrim, tetraPrim } from "../../mth/geometry/platon_bodies.js";

export class Unit_Test {
    constructor(name, params) {
        this.name = name;

    };
    async init(name, params) {
        this.name = name;
        this.prim = dodePrim(mth.Vec4(1, 0, 0, 1));
        this.model = await res.loadG3DM("warshipAliensT.g3dm");
    }
    close = () => {
        if (this.model != undefined) {
            this.model.free();
        }
    }
    response = () => {
    };
    render = () => {
        this.prim.draw(mth.MatrMulMatr(mth.MatrRotate(animation.timer.time, mth.Vec3(0, 1, 0)), mth.MatrScale(mth.Vec3(0.5, 0.5, 0.5))));
        if (this.model != undefined)
            this.model.draw(mth.MatrMulMatr(mth.MatrRotate(animation.timer.time, mth.Vec3(0, 1, 0)),
                mth.MatrTranslate(mth.Vec3(Math.sin(animation.timer.time * mth.PI) * 10, -0.2, Math.cos(animation.timer.time * mth.PI) * 10))));
    }
    update = () => { }
    getData = () => {
        let data = {
            name: this.name,
            id: "test",
            params: 0,
        };
        return data;
    }
}

export function unitCreate() {
    return new Unit_Test();
}
