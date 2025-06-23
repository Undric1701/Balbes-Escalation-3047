import * as res from "../rnd/res/res.js"
import *  as mth from "../../mth/mth.js"
import * as input from "../input.js"
import { isCrossOBB, OBB, OBBMulMatr } from "../../phys/phys.js";
import { cubePrim, dodePrim } from "../../mth/geometry/platon_bodies.js";
import { Unit_Player } from "./unit_player.js";

export class Unit_Shot {
    constructor(name, params) {
        this.name = name;
        this.id = params.id;
        this.team = params.team;
        this.pos = mth.Vec3(params.pos);
        this.dir = mth.Vec3(params.dir);
        this.speed = 2;
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
        }
        if (this.team == "Earth") {
            this.prim = dodePrim(mth.Vec4(0, 0.5, 1, 1));
        } else {
            this.prim = dodePrim(mth.Vec4(1, 0.5, 0, 1));
        }
        //this.OBBprim = cubePrim(mth.Vec4(1, 1, 1, 1));
        this.BB = OBB(1.6181, 2, 1.6181);
        //if (this.A)
        this.BB = OBBMulMatr(this.BB, mth.MatrRotateY(Math.atan2(this.dir.z, this.dir.x)));
        //this.BB = OBBMulMatr(this.BB, mth.MatrTranslate(this.start));   
    }
    close() {
        //this.OBBprim.free();
    }
    response = () => {
        this.pos = mth.Vec3AddVec3(this.pos, this.dir);//mth.Vec3MulNum(this.dir, this.speed));
        let saveBB = OBB(this.BB);
        this.BB = OBBMulMatr(this.BB, mth.MatrTranslate(this.pos));
        if (mth.Vec3Len(mth.Vec3SubVec3(this.pos, this.start)) > 100.0) {
            if (typeof window !== "undefined")
                animation.socket.emit("Delete-Shot", this.getData());
        }
        if (typeof window !== "undefined") {
            let list = animation.unitsList();
            for (let i = 0; i < list.length; i++) {
                if (list[i].id == 'player'/* instanceof Unit_Player */ && list[i].params.team != this.team) {
                    if (isCrossOBB(this.BB, OBB(list[i].params.pos, 3, 2, 2, list[i].params.dir, mth.Vec3(0, 1, 0), mth.Vec3CrossVec3(mth.Vec3(0, 1, 0), list[i].params.dir)))) {
                        console.log(`!${list[i].name}!${this.name}!`);
                    }
                }
            }
        }
        this.BB = OBB(saveBB);
    };
    render(ev) {
        this.prim.draw(mth.MatrTranslate(mth.Vec3AddVec3(this.pos, mth.Vec3(0, 1.52, 0))));
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