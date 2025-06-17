/* AT7, 16.06, unit test sample */
import * as res from "../rnd/res/res.js"
import *  as mth from "../../mth/mth.js"

export class Unit_Test {
    constructor() {

        this.mtl = new res.Material("Test material", mth.Vec4(0.3, 0.3, 0.3, 1), mth.Vec4(0.5, 0.5, 0.5, 1), mth.Vec4(0.2, 0.2, 0.2, 0.2), 30, 1, res.defaultShaderNo, 0);

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
        let color = new Array(points.length).fill(mth.Vec4(1, 1, 1, 1));
        let texCoords = new Array(points.length).fill(mth.Vec2(0, 0));

        let vertices = mth.VertexList(points, texCoords, color, normals);

        this.prim = new res.Prim(this.mtl, window.gl.TRIANGLES, vertices, Indices);
    };
    close = () => {
        //this.prim.draw(mth.UnitMatrix);
    }
    response = () => {
        //console.log("Test unit response");
    };
    render = () => {
        this.prim.draw(mth.MatrMulMatr(mth.MatrRotate(window.animation.timer.time, mth.Vec3(204, 130, 102)), mth.MatrScale(mth.Vec3(2, 2, 2))));
    }
}

export function unitCreate() {
    return new Unit_Test();
}

