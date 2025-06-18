/* AT7, 16.06, unit test sample */
import * as res from "../rnd/res/res.js"
import *  as mth from "../../mth/mth.js"

export class Unit_Water {
    constructor() {

    };
    async init() {
        this.mtl = res.material("Water material", mth.Vec4(0.3, 0.3, 0.3, 1), mth.Vec4(0.5, 0.5, 0.5, 1), mth.Vec4(0.2, 0.2, 0.2, 0.2), 30, 1, res.defaultShaderNo, 0);
        this.mtl.bindTex(0, res.texture("./water.jpg", "2d"));

        let a = 30;
        let points = [
            mth.Vec3(-a, 0, -a),
            mth.Vec3(a, 0, -a),
            mth.Vec3(-a, 0, a),
            mth.Vec3(a, 0, a)
        ];
        let normals = [
            mth.Vec3(0, 1, 0),
            mth.Vec3(0, 1, 0),
            mth.Vec3(0, 1, 0),
            mth.Vec3(0, 1, 0)
        ];
        let color = new Array(points.length).fill(mth.Vec4(0.9, 0.9, 0.9, 1));
        let texCoords = new Array(points.length).fill(mth.Vec2(0, 0));
        texCoords = [
            mth.Vec2(0, 0),
            mth.Vec2(a, 0),
            mth.Vec2(0, a),
            mth.Vec2(a, a),
        ];

        let indices = [0, 1, 2, 1, 2, 3];

        let vertices = mth.VertexList(points, texCoords, normals, color);

        this.water = res.prim(this.mtl, gl.TRIANGLES, vertices, indices);
    }
    close = () => {
        //this.prim.draw(mth.UnitMatrix);
    }
    response = () => {
        //console.log("Test unit response");
    };
    render = () => {
        this.water.draw();
    }
}

export function unitCreate() {
    return new Unit_Water();
}