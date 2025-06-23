import * as res from "../rnd/res/res.js"
import *  as mth from "../../mth/mth.js"
import * as input from "../input.js"
import { OBB, OBBMulMatr } from "../../phys/phys.js";
import { cubePrim, dodePrim } from "../../mth/geometry/platon_bodies.js";

export class Unit_Shot {
    constructor(name, params) {
        this.name = name;
        this.id = params.id;
        this.team = params.team;
        this.pos = mth.Vec3(params.pos);
        this.dir = mth.Vec3(params.dir);
        this.speed = 2;
        this.A = true;
    };
    async init(name, params) {
        if (name != undefined) {
            this.name = name;
            this.id = params.id;
            this.team = params.team;
            this.pos = mth.Vec3(params.pos);
            this.dir = mth.Vec3(params.dir);
            this.speed = 2;
            this.start = mth.Vec3(params.pos);
            this.A = true;
        }
        if (this.team == "Earth") {
            this.prim = dodePrim(mth.Vec4(0, 0.5, 1, 1));
        } else {
            this.prim = dodePrim(mth.Vec4(1, 0.5, 0, 1));
        }
        this.OBBprim = cubePrim(mth.Vec4(1, 1, 1, 1));
        this.BB = OBB(1.6181, 2, 1.6181);
        this.BB = OBBMulMatr(this.BB, mth.MatrRotateY(Math.atan2(this.dir.x, this.dir.z)));
    }
    close() {
        this.prim.free();
    }
    response = () => {
        this.pos = mth.Vec3AddVec3(this.pos, mth.Vec3MulNum(this.dir, this.speed));
        if (mth.Vec3Len(mth.Vec3SubVec3(this.pos, this.start)) > 100.0) {
            this.A = false;
        }
    };
    render(ev) {
        this.prim.draw(mth.MatrTranslate(this.pos));
        this.BB = OBBMulMatr(this.BB, mth.MatrTranslate(this.pos));
        this.OBBprim.draw(mth.MatrTranslate(this.BB.C));
    }
    update = (params) => {
        if (params == undefined) {
            return;
        }
        if (params.pos != undefined) {
            this.pos = params.pos;
        } else {
            this.pos = mth.Vec3(0);
        }
        if (params.dir != undefined) {
            this.dir = params.dir;
        } else {
            this.dir = mth.Vec3(0);
        }
        if (params.team != undefined) {
            this.team = params.team;
        } else {
            this.team = "Earth";
        }
        if (params.id != undefined) {
            this.id = params.id;
        } else {
            this.id = "shot";
        }
    }
    getData = () => {
        let data = {
            name: this.name,
            team: this.team,
            id: this.id,
            pos: this.pos,
            dir: this.dir,
        };
        return { name: this.name, id: "shot", params: data };
    }
}

export function unitCreate(name, params) {
    return new Unit_Shot(name, params);
}