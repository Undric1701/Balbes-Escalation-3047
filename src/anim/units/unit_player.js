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
        this.speed = 2;
        this.dir = mth.Vec3(1, 0, 0);
        this.lastRotate = 0;
        this.maxSpeed = 10;
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
            let keys = animation.input.keys;

            if (keys['a'.charCodeAt(0)] || keys['A'.charCodeAt(0)]) { // || keys["d"] || keys["D"]) {
                if (this.velocity.x == 0 && this.velocity.y == 0 && this.velocity.z == 0) {
                    this.dir = mth.Vec3MulMatr(mth.Vec3(1, 0, 0), mth.MatrRotateY(this.lastRotate));
                } else {
                    this.dir = mth.Vec3Normalize(this.velocity);
                }
                this.acceleration = mth.Vec3MulNum(mth.Vec3Normalize(mth.Vec3CrossVec3(mth.Vec3(0, 1, 0), this.dir)), this.speed);
                //this.velocity = mth.Vec3AddVec3(this.velocity, mth.Vec3MulNum(mth.Vec3Normalize(mth.Vec3CrossVec3(mth.Vec3(0, 1, 0), this.velocity)), deltaTime * this.speed));
            } else if (keys['d'.charCodeAt(0)] || keys['D'.charCodeAt(0)]) {
                if (this.velocity.x == 0 && this.velocity.y == 0 && this.velocity.z == 0) {
                    this.dir = mth.Vec3MulMatr(mth.Vec3(1, 0, 0), mth.MatrRotateY(-this.lastRotate));
                } else {
                    this.dir = mth.Vec3Normalize(this.velocity);
                }
                this.acceleration = mth.Vec3MulNum(mth.Vec3Normalize(mth.Vec3CrossVec3(this.dir, mth.Vec3(0, 1, 0))), this.speed);
                //this.velocity = mth.Vec3AddVec3(this.velocity, mth.Vec3MulNum(mth.Vec3Normalize(mth.Vec3CrossVec3(this.velocity, mth.Vec3(0, 1, 0))), deltaTime * this.speed));
            } else if (keys['w'.charCodeAt(0)] || keys['W'.charCodeAt(0)]) {
                if (mth.Vec3Len(mth.Vec3AddVec3(this.velocity, mth.Vec3MulNum(this.dir, animation.timer.deltaTime))) > this.maxSpeed) {
                    this.velocity = mth.Vec3MulNum(mth.Vec3Normalize(this.velocity), this.maxSpeed);
                    this.lastRotate = this.rotate;
                } else {
                    this.velocity = mth.Vec3AddVec3(this.velocity, mth.Vec3MulNum(this.dir, animation.timer.deltaTime));
                }
            } else if (keys['s'.charCodeAt(0)] || keys['S'.charCodeAt(0)]) {
                if (mth.Vec3Len(this.velocity) < this.speed * animation.timer.deltaTime * 2) {
                    this.velocity = mth.Vec3();
                    this.lastRotate = this.rotate;
                } else {
                    this.velocity = mth.Vec3SubVec3(this.velocity, mth.Vec3MulNum(this.dir, animation.timer.deltaTime));
                }
                //this.velocity = mth.Vec3SubVec3(this.velocity, mth.Vec3MulNum(this.dir, animation.timer.deltaTime));

            } else {
                this.acceleration = mth.Vec3();
            }
        } else {
            if (this.pos.y < 20) {
                this.acceleration = mth.Vec3(0, 1, 0);
            }
            else if (this.pos.y > 30) {
                this.acceleration = mth.Vec3(0, -1, 0);
            }
        }
        this.rotate = -180 / mth.PI * Math.atan2(this.dir.z, this.dir.x);
        this.velocity = mth.Vec3AddVec3(this.velocity, mth.Vec3MulNum(this.acceleration, animation.timer.deltaTime));
        this.pos = mth.Vec3AddVec3(this.pos, mth.Vec3MulNum(this.velocity, animation.timer.deltaTime));
        this.pos.y =
            0.1 * Math.sin(this.pos.x * 3.0 - this.pos.z * 3.0 + animation.timer.time * 3.0) +
            0.03 * Math.cos(-this.pos.x * 5.2 + this.pos.z * 5.2 + animation.timer.time * 4.7);
    };
    render(ev) {
        if (this.model != undefined)
            this.model.draw(mth.MatrMulMatr3(mth.MatrRotateY(this.rotate), mth.MatrScale(mth.Vec3(0.5, 0.5, 0.5)), mth.MatrTranslate(this.pos)));
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
