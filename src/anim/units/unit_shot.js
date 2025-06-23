import * as res from "../rnd/res/res.js"
import *  as mth from "../../mth/mth.js"
import * as input from "../input.js"
import { OBB, OBBMulMatr } from "../../phys/phys.js";

export class Unit_Shot {
    constructor(id, team, loc, dir) {
        this.id = id;
        this.team = team;
        this.loc = mth.Vec3(loc);
        this.dir = mth.Vec3(dir);
        this.speed = 2;
    };
    async init(id, team, loc, dir) {
        if (id != undefined) {
            this.id = id;
            this.team = team;
            this.loc = mth.Vec3(loc);
            this.dir = mth.Vec3(dir);
            this.speed = 2;
        }
        if (this.team == "Earth") {
            this.prim = dodePrim(mth.Vec4(0, 0.5, 1, 1));
        } else {
            this.prim = dodePrim(mth.Vec4(1, 0.5, 0, 1));
        }
        this.BB = OBB(1.6181, 2, 1.6181);
        this.BB = OBBMulMatr(this.BB, MatrRotateY(Math.atan2(this.dir.x, this.dir.z)));
    }
    close() {
        this.prim.free();
    }
    response = () => {
        this.BB = OBBMulMatr(this.BB, mth.MatrTranslate(this.loc));
    };
    render(ev) {
        this.prim.draw(mth.MatrTranslate(this.loc));
    }
    update = (params) => {
        ;
    }
    sendData = () => {
        let data = {
            team: this.team,
            id: this.id,
            loc: this.loc,
            dir: this.dir,
        };
        return data;
    }
}

export function unitCreate(id, com, loc, dir) {
    return new Unit_Shot(id, com, loc, dir);
}