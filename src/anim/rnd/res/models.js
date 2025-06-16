/* AT7, 17.06, models module */
import * as mth from "../../../mth/mth.js"
import * as res from "./res.js"

export class Model {
    constructor() {
        this.numOfPrims = 0;
        this.maxNumOfPrims = 0;
        this.prims = [];
        this.minBB = mth.Vec3(0, 0, 0);
        this.maxBB = mth.Vec3(0, 0, 0);
        this.trans = mth.UnitMatrix;
    };
}

function modelCreate() {
    let mdl = new Model();

    mdl.maxNumOfPrims = 300;
    mdl.trans = mth.UnitMatrix;

    return mdl;
}

export async function loadG3DM(filename) {
    let response = await fetch(filename);
    let dataBuffer = await response.arrayBuffer();
    let buffer = new Uint8Array(dataBuffer);
    let curpos = 0;

    const sign = buffer.slice(curpos, curpos += 4).reduce((res_str, ch) => res_str += String.fromCharCode(ch), "");
    if (sign != "G3DM") {
        console.error("Tried to load not g3dm model");
        return null;
    }

    let [numOfPrims, numOfMaterials, numOfTextures] = new Uint32Array(dataBuffer.slice(curpos, curpos += 4 * 3));

    let resTable = new Array(numOfMaterials + numOfTextures);

    let texs = resTable.slice(0, numOfTextures);
    let mtls = resTable.slice(numOfTextures, numOfTextures + numOfMaterials);

    let mdl = new Model();
    mdl.prims = new Array(numOfPrims);

    let prim_pos = curpos;

    for (let p = 0; p < numOfPrims; p++) {
        let [numOfVertices, numOfFacetIndices, mtlNo] = new Uint32Array(dataBuffer.slice(curpos, curpos += 4 * 3));
        curpos += 4 * 12 * numOfVertices + 4 * numOfFacetIndices;
    }

    let mtl_pos = curpos;

    curpos += numOfMaterials * (300 + (9 + 1 + 1 + 8 * 2) * 4 + 300 + 8);

    for (t = 0; t < numOfTextures; t++) {
        let name;
        let w, h, c;
        let GLType;

        name = dataBuffer.slice(curpos, curpos += 300);
        w = dataBuffer.slice(curpos, curpos += 4);
        h = dataBuffer.slice(curpos, curpos += 4);
        c = dataBuffer.slice(curpos, curpos += 4);
        if (c == 1) {
            GLType = gl.R8;
        } else if (c == 3) {
            GLType = gl.RGB8;
        } else {
            GLType = GL_RGBA8;
        }
        let texData = dataBuffer.slice(curpos, curpos += c * w * h);
        texs[t] = new res.Texture(Buf, w, h, true, GLType, ptr);
    }

    curpos = mtl_ptr;
    for (m = 0; m < numOfMaterials; m++) {
        let fmat;

        let fmat_name = dataBuffer.slice(curpos, curpos += 300).reduce((res_str, ch) => res_str += ch == 0 ? "" : String.fromCharCode(ch), "");
        let s = new Float32Array(dataBuffer.slice(curpos, curpos += 4 * 11));
        let txtarr = new Float32Array(dataBuffer.slice(curpos, curpos += 4 * 8));

        let mtl = {
            name: fmat_name,
            sh: {
                ka: mth.Vec3(s[0], s[1], s[2]),
                kd: mth.Vec3(s[3], s[4], s[5]),
                ks: mth.Vec3(s[6], s[7], s[8]),
                ph: s[9],
                trans: s[10],
            },
            txs: txtarr,
        };

        mtls[m] = new res.Material(fmat_name);


        fmat = dataBuffer.slice(curpos, curpos += 4);
        /*
        ptr += sizeof(* fmat);

        trans_flag = fmat -> Trans == 1 ? TWR_MTL_OPAQUE : TWR_MTL_TRANSPARENT;
        
        if (fmat -> Tex[0] != -1 && MtlPat -> NumOfTextures > 1 && Texs[fmat -> Tex[0]] -> IsTransparent)
            trans_flag = TWR_MTL_TRANSPARENT;

        Mtls[m] = Twr -> MtlCreate(fmat -> Name, MtlPat, trans_flag);
        sprintf(Buf, "%s.g3dm %s Ka texture", FName, fmat -> Name);
        Twr -> MtlBindTex(Mtls[m], 0, Twr -> TexCreateFromVec4(Buf, Vec4SetVec3(fmat -> Ka, 0)));
        Mtls[m] -> Trans = fmat -> Trans;
        if (fmat -> Tex[0] == -1 && Mtls[m] -> NumOfTextures > 1) {
            sprintf(Buf, "%s.g3dm %s Kd texture", FName, fmat -> Name);
            Twr -> MtlBindTex(Mtls[m], 1, Twr -> TexCreateFromVec4(Buf, Vec4SetVec3(fmat -> Kd, 0)));
        }
        else if (Mtls[m] -> NumOfTextures > 1)
            Twr -> MtlBindTex(Mtls[m], 1, Texs[fmat -> Tex[0]]);
        if (fmat -> Tex[1] == -1 && Mtls[m] -> NumOfTextures > 3)
            Twr -> MtlBindTex(Mtls[m], 3, TWR_DefNMTex);
        else if (Mtls[m] -> NumOfTextures > 3)
            Twr -> MtlBindTex(Mtls[m], 3, Texs[fmat -> Tex[1]]);
        if (fmat -> Tex[2] == -1 && Mtls[m] -> NumOfTextures > 2) {
            sprintf(Buf, "%s.g3dm %s KsPh texture", FName, fmat -> Name);
            Twr -> MtlBindTex(Mtls[m], 2, Twr -> TexCreateFromVec4(Buf, Vec4SetVec3(fmat -> Ks, fmat -> Ph)));
        }
        else if (Mtls[m] -> NumOfTextures > 2)
            Twr -> MtlBindTex(Mtls[m], 2, Texs[fmat -> Tex[2]]);
        */
    }


    for (let i = 0; i < numOfPrims; i++) {
        let [numOfVertices, numOfFacetIndices, mtlNo] = new Uint32Array(dataBuffer.slice(curpos, curpos += 4 * 3));
        let v = new Float32Array(dataBuffer.slice(curpos, curpos += 4 * 12 * numOfVertices));
        let ind = new Uint32Array(dataBuffer.slice(curpos, curpos += 4 * numOfFacetIndices));
    }
}