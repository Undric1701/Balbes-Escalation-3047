/* AT7, 17.06, models module */
import * as mth from "../../../mth/mth.js"
import * as res from "./res.js"

let fs;

if (typeof window === 'undefined') {
    fs = await import("fs");
}


const __dirname = import.meta.dirname;


class _model {
    constructor() {
        this.numOfPrims = 0;
        this.prims = [];
        this.minBB = mth.Vec3(0, 0, 0);
        this.maxBB = mth.Vec3(0, 0, 0);
        this.trans = mth.matr();
    };
    primAdd = (pr, trans) => {
        if (trans == undefined) {
            trans = mth.matr();
        }
        this.prims[this.numOfPrims++] = { prim: pr, trans: trans };
        this.evalBB();
    }
    evalBB = () => {
        ///...
    }
    draw = (matrW) => {
        if (matrW == undefined) {
            matrW = mth.matr();
        }
        let m = mth.MatrMulMatr(this.trans, matrW);

        /* Draw all primitives */
        for (let i = 0; i < this.numOfPrims; i++)
            this.prims[i].prim.draw(mth.MatrMulMatr(this.prims[i].trans, m));
    }
    free = () => { };
}

export function model() {
    let mdl = new _model();
    return mdl;
}

let modelsList = []

export async function loadG3DM(filename, loadMatr) {
    let response;
    let dataBuffer;
    if (typeof window === 'undefined') {
        response = fs.readFileSync(__dirname.slice(0, __dirname.length - 17) + "/bin/models/" + filename);
        dataBuffer = response;
    } else {
        response = await fetch("../../../../bin/models/" + filename);
        dataBuffer = await response.arrayBuffer();
    }
    let buffer = new Uint8Array(dataBuffer);
    let curpos = 0;

    if (loadMatr == undefined) {
        loadMatr = mth.matr();
    }
    let loadMatrInv = mth.MatrTranspose(mth.MatrInverse(loadMatr));

    if (modelsList[filename] != null && modelsList[filename] != undefined) {
        //let loadedModel = structuredClone(modelsList[filename]);
        return modelsList[filename];
    }

    const sign = (buffer.slice(curpos, curpos += 4)).reduce((res_str, ch) => res_str += String.fromCharCode(ch), "");
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

    curpos += numOfMaterials * (300 + (11 + 8) * 4 + 300 + 4);

    for (let t = 0; t < numOfTextures; t++) {
        let name;
        let GLType;

        //name = dataBuffer.slice(curpos, curpos += 300);
        //name = (buffer.slice(curpos, curpos += 300)).reduce((res_str, ch) => res_str += String.fromCharCode(ch), "");
        name = (buffer.slice(curpos, curpos += 300)).reduce((res_str, ch) => res_str += ch == 0 ? "" : String.fromCharCode(ch), "");
        let [w, h, c] = new Uint32Array(dataBuffer.slice(curpos, curpos += 4 * 3));
        //w = dataBuffer.slice(curpos, curpos += 4);
        //h = dataBuffer.slice(curpos, curpos += 4);
        //c = dataBuffer.slice(curpos, curpos += 4);
        if (c == 1) {
            GLType = gl.R8;
        } else if (c == 3) {
            GLType = gl.RGB8;
        } else {
            GLType = gl.RGBA8;
        }
        let texData = new Uint8Array(dataBuffer.slice(curpos, curpos += c * w * h));
        texs[t] = res.createTexture(name, w, h, true, GLType, texData);
    }

    curpos = mtl_pos;
    for (let m = 0; m < numOfMaterials; m++) {
        //let fmat = dataBuffer.slice(curpos, curpos += 300 + (9 + 1 + 1 + 8 * 2) * 4 + 300 + 8);
        let fmat_name = (buffer.slice(curpos, curpos += 300)).reduce((res_str, ch) => res_str += ch == 0 ? "" : String.fromCharCode(ch), "");
        //let fmat_name = (buffer.slice(curpos, curpos += 300)).reduce((res_str, ch) => res_str += String.fromCharCode(ch), "");    
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

        mtls[m] = res.material(fmat_name);
        curpos += 300 + 4;

        mtls[m].bindTex(0, res.texCreateFromVec4(mth.Vec4(mtl.sh.ka, 0)));

        //Mtls[m] = Twr -> MtlCreate(fmat -> Name, MtlPat, trans_flag);
        //sprintf(Buf, "%s.g3dm %s Ka texture", FName, fmat -> Name);
        //Twr -> MtlBindTex(Mtls[m], 0, Twr -> TexCreateFromVec4(Buf, Vec4SetVec3(fmat -> Ka, 0)));
        //Mtls[m] -> Trans = fmat -> Trans;
        if (isNaN(mtl.txs[0])) {
            mtls[m].bindTex(1, res.texCreateFromVec4(mth.Vec4(mtl.sh.kd.toList(), 0)));
        } else {
            mtls[m].bindTex(1, texs[mtl.txs[0]]);
        }
        if (isNaN(mtl.txs[1])) {
            mtls[m].bindTex(3, res.texCreateFromVec4(mth.Vec4(0.2, 0.2, 0.2, 0)));
        } else {
            mtls[m].bindTex(3, texs[mtl.txs[1]]);
        }
        if (isNaN(mtl.txs[2])) {
            mtls[m].bindTex(2, res.texCreateFromVec4(mth.Vec4(mtl.sh.ks.toArray(), mtl.sh.ph)));
        } else {
            mtls[m].bindTex(2, texs[mtl.txs[2]]);
        }
    }
    curpos = prim_pos;
    let model_for_list = model();
    for (let i = 0; i < numOfPrims; i++) {
        let [numOfVertices, numOfFacetIndices, mtlNo] = new Uint32Array(dataBuffer.slice(curpos, curpos += 4 * 3));
        let v = new Float32Array(dataBuffer.slice(curpos, curpos += 4 * 12 * numOfVertices));
        let ind = new Uint32Array(dataBuffer.slice(curpos, curpos += 4 * numOfFacetIndices));

        v = mth.vertexListFromData(v);
        let v1 = mth.copyVertices(v);
        /*
        for (let j = 0; j < v.length; j++) {
            v1[i] = structuredClone(v[i]);
        }
            */
        if (typeof window === 'undefined') {
            model_for_list.primAdd(res.prim(mtls[mtlNo], null, v1, ind), mth.matr());
        } else {
            model_for_list.primAdd(res.prim(mtls[mtlNo], gl.TRIANGLES, v1, ind), mth.matr());
        }
        for (let i = 0; i < v.length; i++) {
            v[i].pos = mth.PointTransform(v[i].pos, loadMatr);
            v[i].normal = mth.VectorTransform(v[i].normal, loadMatrInv);
        }
        if (typeof window === 'undefined') {
            mdl.primAdd(res.prim(mtls[mtlNo], null, v, ind), loadMatr);
        } else {
            mdl.primAdd(res.prim(mtls[mtlNo], gl.TRIANGLES, v, ind), loadMatr);
        }
    }
    modelsList[filename] = model_for_list;
    return mdl;
}              