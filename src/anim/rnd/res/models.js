/* AT7, 17.06, models module */
import * as mth from "../../../mth/mth.js"
import * as res from "./res.js"

class _model {
    constructor() {
        this.numOfPrims = 0;
        this.prims = [];
        this.minBB = mth.Vec3(0, 0, 0);
        this.maxBB = mth.Vec3(0, 0, 0);
        this.trans = mth.UnitMatrix;
    };
    primAdd = (pr, trans) => {
        if (trans == undefined) {
            trans = mth.UnitMatrix;
        }
        this.prims[this.numOfPrims++] = { prim: pr, trans: trans };
        this.evalBB();
    }
    evalBB = () => {
        ///...
    }
    draw = (matrW) => {
        if (matrW == undefined) {
            matrW = mth.UnitMatrix;
        }
        let m = mth.MatrMulMatr(this.trans, matrW);

        /* Draw all primitives */
        for (let i = 0; i < this.numOfPrims; i++)
            this.prims[i].prim.draw(mth.MatrMulMatr(this.prims[i].trans, m));
    }
}

export function model() {
    let mdl = new _model();
    return mdl;
}

export async function loadG3DM(filename, loadMatr) {
    let response = await fetch(filename);
    let dataBuffer = await response.arrayBuffer();
    let buffer = new Uint8Array(dataBuffer);
    let curpos = 0;

    if (loadMatr == undefined) {
        loadMatr = mth.UnitMatrix;
    }
    let loadMatrInv = mth.MatrInverse(loadMatr);


    const sign = buffer.slice(curpos, curpos += 4).reduce((res_str, ch) => res_str += String.fromCharCode(ch), "");
    if (sign != "G3DM") {
        console.error("Tried to load not g3dm model");
        return null;
    }

    let [numOfPrims, numOfMaterials, numOfTextures] = new Uint32Array(dataBuffer.slice(curpos, curpos += 4 * 3));

    let resTable = new Array(numOfMaterials + numOfTextures);

    let texs = resTable.slice(0, numOfTextures);
    let mtls = resTable.slice(numOfTextures, numOfTextures + numOfMaterials);

    let mdl = model();
    mdl.prims = new Array(numOfPrims);

    let prim_pos = curpos;

    for (let p = 0; p < numOfPrims; p++) {
        let [numOfVertices, numOfFacetIndices, mtlNo] = new Uint32Array(dataBuffer.slice(curpos, curpos += 4 * 3));
        curpos += 4 * 12 * numOfVertices + 4 * numOfFacetIndices;
    }

    let mtl_pos = curpos;

    curpos += numOfMaterials * (300 + (9 + 1 + 1 + 8 * 2) * 4 + 300 + 8);

    for (let t = 0; t < numOfTextures; t++) {
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
            GLType = gl.RGBA8;
        }
        let texData = dataBuffer.slice(curpos, curpos += c * w * h);
        texs[t] = res.texture(w, h, true, GLType, texData);
    }

    curpos = mtl_pos;
    for (let m = 0; m < numOfMaterials; m++) {
        //let fmat = dataBuffer.slice(curpos, curpos += 300 + (9 + 1 + 1 + 8 * 2) * 4 + 300 + 8);
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

        mtls[m].bindTex(0, res.texCreateFromVec4(mth.Vec4(mtl.ka.toList(), 0)));

        //Mtls[m] = Twr -> MtlCreate(fmat -> Name, MtlPat, trans_flag);
        //sprintf(Buf, "%s.g3dm %s Ka texture", FName, fmat -> Name);
        //Twr -> MtlBindTex(Mtls[m], 0, Twr -> TexCreateFromVec4(Buf, Vec4SetVec3(fmat -> Ka, 0)));
        //Mtls[m] -> Trans = fmat -> Trans;
        if (mtl.txs[0] == -1) {
            mtls[m].bindTex(1, res.texCreateFromVec4(mth.Vec4(fmat.kd.toList(), 0)));
        } else {
            mtls[m].bindTex(1, texs[fmat.txs[0]]);
        }
        if (mtl.txs[1] == -1) {
            mtls[m].bindTex(3, res.texCreateFromVec4(mth.Vec4(0.2, 0.2, 0.2, 0)));
        } else {
            mtls[m].bindTex(3, texs[fmat.txs[1]]);
        }
        if (mtl.txs[2] == -1) {
            mtls[m].bindTex(2, res.texCreateFromVec4(mth.Vec4(fmat.ks.toList(), fmat.ph)));
        } else {
            mtls[m].bindTex(2, texs[fmat.txs[2]]);
        }
    }
    curpos = prim_pos;
    for (let i = 0; i < numOfPrims; i++) {
        let [numOfVertices, numOfFacetIndices, mtlNo] = new Uint32Array(dataBuffer.slice(curpos, curpos += 4 * 3));
        let v = new Float32Array(dataBuffer.slice(curpos, curpos += 4 * 12 * numOfVertices));
        v = mth.vertexListFromData(v);

        if (loadMatr != mth.UnitMatrix) {
            for (let i = 0; i < v.length; i++) {
                v.pos = mth.PointTransform(v.pos, loadMatr);
                v.normal = mth.VectorTransform(v.normal, loadMatrInv);
            }
        }
        let ind = new Uint32Array(dataBuffer.slice(curpos, curpos += 4 * numOfFacetIndices));

        mdl.primAdd(res.prim(mtls[mtlNo], gl.TRIANGLE_STRIP, v, ind));
    }
    return mdl;
}              