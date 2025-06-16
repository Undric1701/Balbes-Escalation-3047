/* AT7, 16.06, unit test sample */
import { Prim } from "../rnd/res/primitives.js"
import *  as mth from "../../mth/mth.js"

export class Unit_Test {
    init = () => {

        this.mtl = new mtl.Material("Test material", Vec4(0.3, 0.3, 0.3, 1), Vec4(0.5, 0.5, 0.5, 1), Vec4(0.2, 0.2, 0.2, 0.2), 30, 1, shd.defaultShader);

        let c = [mth.Vec3Normalize(mth.Vec3(-a, -a, -a)),
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
        let color = new Array(points.length).fill(mth.Vec4(0.5, 0.5, 0.5, 1));
        let texCoords = new Array(points.length).fill(mth.Vec2(0, 0));

        let verticesc = mth.VertexList(points, texCoords, color, normals);

        this.prim = new prim.Prim(mtl, window.gl.TRIANGLES, vertices, Indices);
    };
    close = () => {
        //this.prim.draw(mth.UnitMatrix);
    }
    response = () => {
        console.log("Test unit response");
    };
    render = () => {
        this.prim.draw(mth.UnitMatrix);
    }
}

export function unitCreate() {
    return new Unit_Test;
}

