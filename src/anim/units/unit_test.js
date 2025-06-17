/* AT7, 16.06, unit test sample */
import * as res from "../rnd/res/res.js"
import *  as mth from "../../mth/mth.js"

export class Unit_Test {
    constructor() {

    };
    async init() {
        this.mtl = res.material("Test material", mth.Vec4(0.3, 0.3, 0.3, 1), mth.Vec4(0.5, 0.5, 0.5, 1), mth.Vec4(0.2, 0.2, 0.2, 0.2), 30, 1, res.defaultShaderNo, 0);
        this.mtl.bindTex(0, res.texture("./TWR_SHOT04.png", "2d"));

        let a = 1;
        let points = [mth.Vec3Normalize(mth.Vec3(-a, -a, -a)),
        mth.Vec3Normalize(mth.Vec3(a, -a, -a)),
        mth.Vec3Normalize(mth.Vec3(-a, -a, a)),
        mth.Vec3Normalize(mth.Vec3(a, -a, a)),
        mth.Vec3Normalize(mth.Vec3(-a, a, -a)),
        mth.Vec3Normalize(mth.Vec3(a, a, -a)),
        mth.Vec3Normalize(mth.Vec3(-a, a, a)),
        mth.Vec3Normalize(mth.Vec3(a, a, a))];
        let Indices = [
            0, 1, 2,
            1, 2, 3,
            5, 4, 7,
            4, 6, 7,
            0, 1, 4,
            1, 5, 4,
            2, 3, 6,
            6, 3, 7,
            0, 2, 4,
            6, 4, 2,
            1, 3, 5,
            5, 7, 3];
        let normals = points;
        let color = new Array(points.length).fill(mth.Vec4(0.9, 0.9, 0.9, 1));
        let texCoords = new Array(points.length).fill(mth.Vec2(0, 0));
        texCoords = [
            mth.Vec2(1, 0),
            mth.Vec2(0, 1),
            mth.Vec2(0, 0),
            mth.Vec2(1, 1),
            mth.Vec2(-1, 1),
            mth.Vec2(1, -1),
            mth.Vec2(0, -1),
            mth.Vec2(-1, 0),
        ];

        let vertices = mth.VertexList(points, texCoords, color, normals);

        this.prim = res.prim(this.mtl, window.gl.TRIANGLES, vertices, Indices);
        this.model = await res.loadG3DM("../../../../bin/models/warshipal.g3dm");
    }
    close = () => {
        //this.prim.draw(mth.UnitMatrix);
    }
    response = () => {
        //console.log("Test unit response");
    };
    render = () => {
        //this.prim.draw(mth.MatrMulMatr(mth.MatrRotate(window.animation.timer.time, mth.Vec3(204, 130, 102)), mth.MatrScale(mth.Vec3(2, 2, 2))));
        this.model.draw(mth.MatrScale(mth.Vec3(0.1, 0.1, 0.1)));
    }
}

export function unitCreate() {
    return new Unit_Test();
}

