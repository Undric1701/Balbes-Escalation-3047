/* AT7, 14.06.2025, materials module */

import * as res from "./res.js"
import * as mth from "../../../mth/mth.js"
/*
typedef struct tagtwrMATERIAL
{
  CHAR Name[TWR_STR_MAX];             
  twrMATERIAL_PATTERN *MtlPat;         
  twrTRANSPARENCY_FLAG IsTrans;        
  FLT Trans;                           
  BOOL IsShadowCast;                   
  INT RefCounter;                      
  UINT64 StoreFrameNo;                 
                                       
  INT NumOfBuffers;                    
  twrBUFFER *Bufs[TWR_MAX_BUFFERS];    
  INT NumOfTextures;                   
  twrTEXTURE *Texs[TWR_MAX_TEXTURES];  
  twrPRIM *FirstDraw;                  
                                       
  twrMATERIAL *NextDraw;                                                      
} twrMATERIAL;
*/

export class Material {
    //constructor(name, ka, kd, ks, ph, trans, shaderProgramNo, texCount) {
    constructor(name) {
        try {
            if (typeof name == "string") {
                this.name = name;
            } else {
                throw new Error("Invalid name");
            }
            this.textures = new Array(8);
            this.ka = mth.Vec4(0.2, 0.2, 0.2, 1);
            this.kd = mth.Vec4(0.5, 0.5, 0.5, 1)
            this.ks = mth.Vec4(0.3, 0.3, 0.3, 1);
            this.ph = 30;
            this.trans = 1;
            this.texturesCount = 0;
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
    }
    apply = () => {
        res.shaderApply(this.shaderNo);
        for (let i = 0; i < this.texturesCount; i++) {
            if (this.textures[i] != undefined) {
                this.textures[i].apply(res.shds[this.shaderNo], i);
            }
        }
        window.gl.uniform3f(window.gl.getUniformLocation(res.shds[this.shaderNo].progId, "Ka"), this.ka[0], this.ka[1], this.ka[2]);
        window.gl.uniform3f(window.gl.getUniformLocation(res.shds[this.shaderNo].progId, "Kd"), this.kd[0], this.kd[1], this.kd[2]);
        window.gl.uniform3f(window.gl.getUniformLocation(res.shds[this.shaderNo].progId, "Ks"), this.ks[0], this.ks[1], this.ks[2]);
        window.gl.uniform3f(window.gl.getUniformLocation(res.shds[this.shaderNo].progId, "camLoc"), window.animation.cam.loc.toArray()[0], window.animation.cam.loc.toArray()[1], window.animation.cam.loc.toArray()[2]);
        window.gl.uniform3f(window.gl.getUniformLocation(res.shds[this.shaderNo].progId, "camDir"), window.animation.cam.dir.toArray()[0], window.animation.cam.dir.toArray()[1], window.animation.cam.dir.toArray()[2]);
    }
    bindTex = (no, texture) => {
        if (no >= 0 && no < this.texturesCount) {
            this.textures[no >> 0] = texture;
        }
    }
    free = () => {
        this.referenceCount--;
        if (this.referenceCount <= 0) {
            for (let i = 0; i < this.texturesCount; i++) {
                if (this.textures[i] != undefined) {
                    this.textures[i].free();
                }
            }
        }
    }

}

