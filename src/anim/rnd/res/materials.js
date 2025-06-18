/* AT7, 14.06.2025, materials module */

import * as res from "./res.js"
import * as mth from "../../../mth/mth.js"

export class _material {
    //constructor(name, ka, kd, ks, ph, trans, shaderProgramNo, texCount) {
    constructor(name, ka, kdTrans, ksPh) {
        try {
            if (typeof name == "string") {
                this.name = name;
            } else {
                throw new Error("Invalid name");
            }

            this.textures = new Array(8);
            this.numOfTextures = 8;

            if (ka == undefined) {
                this.ka = mth.Vec4(0.2, 0.2, 0.2, 1);
            } else {
                this.ka = ka;
            }
            if (kdTrans == undefined) {
                this.kdTrans = mth.Vec4(0.5, 0.5, 0.5, 1);
            } else {
                this.kdTrans = kdTrans;
            }
            if (ksPh == undefined) {
                this.ksPh = mth.Vec4(0.3, 0.3, 0.3, 1);
            } else {
                this.ksPh = ksPh;
            }

            this.bindTex(0, res.texCreateFromVec4(this.ka));
            this.bindTex(1, res.texCreateFromVec4(this.kdTrans));
            this.bindTex(2, res.texCreateFromVec4(this.ksPh));

            this.referenceCount = 0;
            this.shaderNo = res.defaultShaderNo;
            /*
            if (shaderProgramNo !== undefined) {
                this.shaderNo = shaderProgramNo;
            } else {
                this.shaderNo = shd.defaultShaderNo;
            } 
            */
        } catch (err) {
            console.log(err);
        }
    };
    apply = () => {
        res.shaderApply(this.shaderNo);
        for (let i = 0; i < this.numOfTextures; i++) {
            if (this.textures[i] != undefined) {
                this.textures[i].apply(res.shds[this.shaderNo], i);
            }
        }
        //window.gl.uniform3f(window.gl.getUniformLocation(res.shds[this.shaderNo].progId, "Ka"), this.ka[0], this.ka[1], this.ka[2]);
        //window.gl.uniform3f(window.gl.getUniformLocation(res.shds[this.shaderNo].progId, "Kd"), this.kd[0], this.kd[1], this.kd[2]);
        //window.gl.uniform3f(window.gl.getUniformLocation(res.shds[this.shaderNo].progId, "Ks"), this.ks[0], this.ks[1], this.ks[2]);
        window.gl.uniform3f(window.gl.getUniformLocation(res.shds[this.shaderNo].progId, "camLoc"), window.animation.cam.loc.toArray()[0], window.animation.cam.loc.toArray()[1], window.animation.cam.loc.toArray()[2]);
        window.gl.uniform3f(window.gl.getUniformLocation(res.shds[this.shaderNo].progId, "camDir"), window.animation.cam.dir.toArray()[0], window.animation.cam.dir.toArray()[1], window.animation.cam.dir.toArray()[2]);
    };
    bindTex = (no, texture) => {
        if (no >= 0 && no < this.numOfTextures) {
            if (this.textures[no] != undefined) {
                this.textures[no].free();
            }
            this.textures[no] = texture;
        }
    };
    free = () => {
        this.referenceCount--;
        if (this.referenceCount <= 0) {
            for (let i = 0; i < this.texturesCount; i++) {
                if (this.textures[i] != undefined) {
                    this.textures[i].free();
                }
            }
        }
    };
}

export function material(name, ka, kdTrans, ksPh) {
    return new _material(name, ka, kdTrans, ksPh);
}

export let defaultMaterial;

export async function materialsInit() {
    defaultMaterial = material("default material");

}