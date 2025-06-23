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
        if (params.hp != undefined) {
            this.hp = params.hp;
        } else {
            this.hp = 100;
        }
        if (params.team != undefined) {
            this.hp = params.team;
        } else {
            this.team = "Earth";
        }
        this.speed = 2.0;
        this.dir = mth.Vec3(1, 0, 0);
        this.lastRotate = 0;
        this.maxSpeed = 8;
        if (typeof window !== "undefined") {
            this.lastInputTime = animation.timer.time;
            this.inputDelay = 0.03;
        }
        //this.input = new input.Input();
        //this.camera = new input.Input();
    };
    async init(name, params) {
        this.name = name;

        if (this.team == undefined) {
            this.team = params.team;
        }
        if (this.team == "Earth") {
            this.model = await res.loadG3DM("warshipEarthT.g3dm");
        } else {
            this.model = await res.loadG3DM("warshipAliensT.g3dm");
        }
    }
    close() {
        if (this.model != undefined) {
            this.model.free();
        }
    }
    response = () => {
        let isInput = false;
        if (typeof window !== "undefined") {
            if (this.id == animation.id) {
                let keys = animation.input.keys;
                let keysClick = animation.input.keysClick;
                if (keysClick[' '.charCodeAt(0)]) {
                    let shotName = "shot#" + this.id + "_" + Date.now();
                    let shot = animation.animAddUnit("shot", shotName, {
                        id: this.id,
                        team: this.team,
                        pos: mth.Vec3AddVec3(this.pos, mth.Vec3MulNum(this.dir, 2)),
                        dir: this.dir,
                    });
                    animation.socket.emit("Player-Change-Scene", animation.unitsList());
                }
                if (keys['a'.charCodeAt(0)] || keys['A'.charCodeAt(0)]) {
                    isInput = true;
                    if (this.velocity.x == 0 && this.velocity.y == 0 && this.velocity.z == 0) {
                        this.dir = mth.Vec3MulMatr(mth.Vec3(1, 0, 0), mth.MatrRotateY(this.lastRotate));
                    } else {
                        this.dir = mth.Vec3Normalize(this.velocity);
                    }
                    this.acceleration = mth.Vec3MulNum(mth.Vec3Normalize(mth.Vec3CrossVec3(mth.Vec3(0, 1, 0), this.dir)), this.speed);
                    //this.velocity = mth.Vec3AddVec3(this.velocity, mth.Vec3MulNum(mth.Vec3Normalize(mth.Vec3CrossVec3(mth.Vec3(0, 1, 0), this.velocity)), deltaTime * this.speed));
                } else if (keys['d'.charCodeAt(0)] || keys['D'.charCodeAt(0)]) {
                    isInput = true;
                    if (this.velocity.x == 0 && this.velocity.y == 0 && this.velocity.z == 0) {
                        this.dir = mth.Vec3MulMatr(mth.Vec3(1, 0, 0), mth.MatrRotateY(-this.lastRotate));
                    } else {
                        this.dir = mth.Vec3Normalize(this.velocity);
                    }
                    this.acceleration = mth.Vec3MulNum(mth.Vec3Normalize(mth.Vec3CrossVec3(this.dir, mth.Vec3(0, 1, 0))), this.speed);
                    //this.velocity = mth.Vec3AddVec3(this.velocity, mth.Vec3MulNum(mth.Vec3Normalize(mth.Vec3CrossVec3(this.velocity, mth.Vec3(0, 1, 0))), deltaTime * this.speed));
                } else if (keys['w'.charCodeAt(0)] || keys['W'.charCodeAt(0)]) {
                    isInput = true;
                    if (mth.Vec3Len(mth.Vec3AddVec3(this.velocity, mth.Vec3MulNum(this.dir, animation.timer.deltaTime))) > this.maxSpeed) {
                        this.velocity = mth.Vec3MulNum(mth.Vec3Normalize(this.velocity), this.maxSpeed);
                        this.lastRotate = this.rotate;
                    } else {
                        this.velocity = mth.Vec3AddVec3(this.velocity, mth.Vec3MulNum(this.dir, animation.timer.deltaTime));
                    }
                } else if (keys['s'.charCodeAt(0)] || keys['S'.charCodeAt(0)]) {
                    isInput = true;
                    if (mth.Vec3Len(this.velocity) < this.speed * animation.timer.deltaTime * 2) {
                        this.velocity = mth.Vec3();
                        this.lastRotate = this.rotate;
                    } else {
                        this.velocity = mth.Vec3SubVec3(this.velocity, mth.Vec3MulNum(this.dir, animation.timer.deltaTime));
                    }
                } else {
                    if (this.acceleration.x != 0 || this.acceleration.y != 0 || this.acceleration.z != 0) {
                        this.acceleration = mth.Vec3();
                        this.sendData();
                        this.lastInputTime = animation.timer.time;
                    }
                }
                let loc = mth.Vec3AddVec3(animation.cam.loc, mth.Vec3MulNum(this.velocity, animation.timer.deltaTime));
                loc.y = animation.cam.loc.y;
                animation.cam.set(loc, mth.Vec3AddVec3(this.pos, mth.Vec3(0, 1.8, 0)), mth.Vec3(0, 1, 0));
                if (keys[' '.charCodeAt(0)]) {
                    let missileData = { name: `Player` };
                }
            }
        }
        this.rotate = -180 / mth.PI * Math.atan2(this.dir.z, this.dir.x);
        if (typeof window !== "undefined") {
            this.velocity = mth.Vec3AddVec3(this.velocity, mth.Vec3MulNum(this.acceleration, animation.timer.deltaTime));
            this.pos = mth.Vec3AddVec3(this.pos, mth.Vec3MulNum(this.velocity, animation.timer.deltaTime));
            this.pos.y =
                0.04 * Math.sin(this.pos.x - this.pos.z + animation.timer.time * 3.0) +
                0.01 * Math.cos(-this.pos.x + this.pos.z + animation.timer.time * 4.7);
            if (isInput) {
                if (animation.timer.time - this.lastInputTime > this.inputDelay) {
                    this.sendData();
                    this.lastInputTime = animation.timer.time;
                }
            }
        }
        else {
            this.velocity = mth.Vec3AddVec3(this.velocity, mth.Vec3MulNum(this.acceleration, Animation.timer.deltaTime));
            this.pos = mth.Vec3AddVec3(this.pos, mth.Vec3MulNum(this.velocity, Animation.timer.deltaTime));
            this.pos.y =
                0.04 * Math.sin(this.pos.x - this.pos.z + Animation.timer.time * 3.0) +
                0.01 * Math.cos(-this.pos.x + this.pos.z + Animation.timer.time * 4.7);
        }
    };
    render(ev) {
        if (this.model != undefined)
            this.model.draw(mth.MatrMulMatr(mth.MatrRotateY(this.rotate), mth.MatrTranslate(this.pos)));
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
        if (params.dir != undefined) {
            this.dir = params.dir;
        } else {
            this.dir = mth.Vec3(1, 0, 0);
        }
        if (params.team != undefined) {
            this.team = params.team;
        } else {
            this.team = "Earth";
        }
    }
    sendData = () => {
        let data = {
            id: this.id,
            team: this.team,
            pos: this.pos,
            velocity: this.velocity,
            acceleration: this.acceleration,
            rotate: this.rotate,
            dir: this.dir,
        };
        animation.socket.emit("Player-Send-Input", { id: "player", name: this.name, params: data });
    }
    getData = () => {
        let data = {
            id: this.id,
            pos: this.pos,
            team: this.team,
            velocity: this.velocity,
            acceleration: this.acceleration,
            rotate: this.rotate,
            dir: this.dir,
        };
        return { name: this.name, id: "player", params: data }
    }
}

export function unitCreate(name, params) {
    return new Unit_Player(name, params);
}