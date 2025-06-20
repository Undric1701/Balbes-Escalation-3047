/* AT7, 14.06.2025, materials module */

import * as res from "./res.js"
import * as mth from "../../../mth/mth.js"

export class _material {
    //constructor(name, ka, kd, ks, ph, trans, shaderProgramNo, texCount) {
    constructor(name, ka, kdTrans, ksPh, shaderNo) {
        try {
            if (typeof window === 'undefined') {
                return;
            }
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
                this.trans = 1;
            } else {
                this.kdTrans = mth.Vec4(kdTrans);
                this.trans = 1;
            }
            if (ksPh == undefined) {
                this.ksPh = mth.Vec4(0.3, 0.3, 0.3, 1);
            } else {
                this.ksPh = ksPh;
            }
            if (shaderNo == undefined) {
                this.shaderNo = res.defaultShaderNo;
            } else {
                this.shaderNo = shaderNo;
            }

            this.bindTex(0, res.texCreateFromVec4(this.ka));
            this.bindTex(1, res.texCreateFromVec4(this.kdTrans));
            this.bindTex(2, res.texCreateFromVec4(this.ksPh));

            this.referenceCount = 0;
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
        let shd;
        if (res.shaderApply(this.shaderNo)) {
            shd = this.shaderNo;
        } else {
            shd = res.defaultShaderNo;
        }
        for (let i = 0; i < this.numOfTextures; i++) {
            if (this.textures[i] != undefined) {
                this.textures[i].apply(res.shds[shd], i);
            }
        }
        window.gl.uniform3f(window.gl.getUniformLocation(res.shds[shd].progId, "camLoc"), animation.cam.loc.toArray()[0], animation.cam.loc.toArray()[1], animation.cam.loc.toArray()[2]);
        window.gl.uniform3f(window.gl.getUniformLocation(res.shds[shd].progId, "camDir"), animation.cam.dir.toArray()[0], animation.cam.dir.toArray()[1], animation.cam.dir.toArray()[2]);
        if (this.trans != undefined) {
            window.gl.uniform1f(window.gl.getUniformLocation(res.shds[shd].progId, "Trans"), this.trans);
        } else {
            window.gl.uniform1f(window.gl.getUniformLocation(res.shds[shd].progId, "Trans"), 1);
        }
        //window.gl.uniform3f(window.gl.getUniformLocation(res.shds[this.shaderNo].progId, "Ka"), this.ka[0], this.ka[1], this.ka[2]);
        //window.gl.uniform3f(window.gl.getUniformLocation(res.shds[this.shaderNo].progId, "Kd"), this.kd[0], this.kd[1], this.kd[2]);
        //window.gl.uniform3f(window.gl.getUniformLocation(res.shds[this.shaderNo].progId, "Ks"), this.ks[0], this.ks[1], this.ks[2]);
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

export function material(name, ka, kdTrans, ksPh, shaderNo) {
    return new _material(name, ka, kdTrans, ksPh, shaderNo);
}

export let defaultMaterial;

export async function materialsInit() {
    defaultMaterial = material("default material");

}