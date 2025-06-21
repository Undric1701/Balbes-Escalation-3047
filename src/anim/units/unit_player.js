import * as res from "../rnd/res/res.js"
import *  as mth from "../../mth/mth.js"
import * as input from "../input.js"

export class Unit_Player {
    constructor(name, params) {
        this.name = name;
        if (params.id != undefined) {
            this.id = params.id;
        } else {
            this.id = 0;
        }
        if (params.pos != undefined) {
            this.pos = params.pos;
        } else {
            this.pos = mth.Vec3(0);
        }
        if (params.velocity != undefined) {
            this.velocity = params.velocity;
        } else {
            this.velocity = mth.Vec3(0);
        }
        if (params.acceleration != undefined) {
            this.acceleration = params.acceleration;
        } else {
            this.acceleration = mth.Vec3(0);
        }
        if (params.rotate != undefined) {
            this.rotate = params.rotate;
        } else {
            this.rotate = 0;
        }
        //this.input = new input.Input();
        //this.camera = new input.Input();
    };
    async init(name, params) {
        this.name = name;
        if (params.team == "Earth") {
            this.model = await res.loadG3DM("warshipEarthT.g3dm");
        } else {
            this.model = await res.loadG3DM("warshipAliensT.g3dm");
        }
    }
    close() {
        this.model.free();
    }
    response = () => {
        if (this.id == animation.id) {
        }
        else {
            if (this.pos.y < 20) {
                this.acceleration = mth.Vec3(0, 1, 0);
            }
            else if (this.pos.y > 30) {
                this.acceleration = mth.Vec3(0, -1, 0);
            }
            this.velocity = mth.Vec3AddVec3(this.velocity, mth.Vec3MulNum(this.acceleration, animation.timer.deltaTime));
            this.pos = mth.Vec3AddVec3(this.pos, mth.Vec3MulNum(this.velocity, animation.timer.deltaTime));
        }
    };
    render(ev) {
        if (this.model != undefined)
            this.model.draw(mth.MatrMulMatr(mth.MatrScale(mth.Vec3(0.5, 0.5, 0.5)), mth.MatrTranslate(this.pos)));
    }
    update = (params) => {
        if (params.pos != undefined) {
            this.pos = params.pos;
        } else {
            this.pos = mth.Vec3(0);
        }
        if (params.velocity != undefined) {
            this.velocity = params.velocity;
        } else {
            this.velocity = mth.Vec3(0);
        }
        if (params.acceleration != undefined) {
            this.acceleration = params.acceleration;
        } else {
            this.acceleration = mth.Vec3(0);
        }
        if (params.rotate != undefined) {
            this.rotate = params.rotate;
        } else {
            this.rotate = 0;
        }
    }
    sendData = () => {
        let data = {
            name: this.name,
            id: this.id,
            pos: this.pos,
            velocity: this.velocity,
            acceleration: this.acceleration,
        };
        return data;
    }
}

export function unitCreate(com, type) {
    return new Unit_Player(com, type);
}
