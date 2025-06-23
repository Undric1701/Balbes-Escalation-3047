/* IK4, 14.06.2025, physic module */
/* IK4, 19.06.2025, physic module */

import { Vec3MulMatr, Vec3, Vec3Normalize, Vec3DotVec3, Vec3SubVec3, Vec3CrossVec3, Vec3AddVec3, Vec3MulNum, Vec3Neg, _Vec3 } from "../mth/mth_vec3.js";

export class _BoundBox {
    constructor(Center, hU, hV, hW, U, W, V) {
        if (typeof Center == "number") {
            this.C = Vec3(0);
            this.hU = Center;
            this.hV = hU;
            this.hW = hV;
            this.U = Vec3Normalize(Vec3(this.C.x + this.hU, this.C.y, this.C.z));
            this.W = Vec3Normalize(Vec3(this.C.x, this.C.y + this.hW, this.C.z));
            this.V = Vec3Normalize(Vec3(this.C.x, this.C.y, this.C.z + this.hV));
        } else if (Center instanceof _Vec3) {
            this.C = Vec3(Center);
            this.hU = hU;
            this.hV = hV;
            this.hW = hW;
            this.U = Vec3(U);
            this.V = Vec3(V);
            this.W = Vec3(W);
        } else {
            this.C = Vec3(Center.C);
            this.hU = Center.hU;
            this.hV = Center.hV;
            this.hW = Center.hW;
            this.U = Vec3(Center.U);
            this.V = Vec3(Center.V);
            this.W = Vec3(Center.W);
        }
    }
}

export function OBB(...args) {
    return new _BoundBox(...args);
}

export function OBBMulMatr(BB, Matr) {
    let NBB = OBB(BB.C, BB.hU, BB.hV, BB.hW, BB.U, BB.W, BB.V);

    let u = Vec3AddVec3(NBB.C, Vec3MulNum(NBB.U, NBB.hU));
    let v = Vec3AddVec3(NBB.C, Vec3MulNum(NBB.V, NBB.hV));
    let w = Vec3AddVec3(NBB.C, Vec3MulNum(NBB.W, NBB.hW));

    NBB.C = Vec3MulMatr(NBB.C, Matr);

    NBB.U = Vec3Normalize(Vec3SubVec3(Vec3MulMatr(u, Matr), NBB.C));
    NBB.W = Vec3Normalize(Vec3SubVec3(Vec3MulMatr(w, Matr), NBB.C));
    NBB.V = Vec3Normalize(Vec3SubVec3(Vec3MulMatr(v, Matr), NBB.C));

    return NBB;
}

function Proec(V, L) {
    let P = Vec3DotVec3(V, L);
    return P;
}

function RProecOBB(BB, L) {
    let C = BB.C;
    
    let TRF = Vec3AddVec3(Vec3AddVec3(Vec3MulNum(BB.U, BB.hU), Vec3MulNum(BB.W, BB.hW)), Vec3MulNum(BB.V, BB.hV));
    let TLF = Vec3AddVec3(Vec3SubVec3(Vec3MulNum(BB.U, BB.hU), Vec3MulNum(BB.W, BB.hW)), Vec3MulNum(BB.V, BB.hV));
    let TRC = Vec3AddVec3(Vec3AddVec3(Vec3Neg(Vec3MulNum(BB.U, BB.hU)), Vec3MulNum(BB.W, BB.hW)), Vec3MulNum(BB.V, BB.hV));
    let TLC = Vec3AddVec3(Vec3SubVec3(Vec3Neg(Vec3MulNum(BB.U, BB.hU)), Vec3MulNum(BB.W, BB.hW)), Vec3MulNum(BB.V, BB.hV));
    let DRF = Vec3Neg(TLC);
    let DLF = Vec3Neg(TRC);
    let DRC = Vec3Neg(TLF);
    let DLC = Vec3Neg(TRF);

    TRF = Proec(Vec3AddVec3(C, TRF), L);
    TLF = Proec(Vec3AddVec3(C, TLF), L);
    TRC = Proec(Vec3AddVec3(C, TRC), L);
    TLC = Proec(Vec3AddVec3(C, TLC), L);
    DRF = Proec(Vec3AddVec3(C, DRF), L);
    DLF = Proec(Vec3AddVec3(C, DLF), L);
    DRC = Proec(Vec3AddVec3(C, DRC), L);
    DLC = Proec(Vec3AddVec3(C, DLC), L);
    
    let min = Math.min(TRF, TLF, TRC, TLC, DRF, DLF, DRC, DLC);
    let max = Math.max(TRF, TLF, TRC, TLC, DRF, DLF, DRC, DLC);

    let R = (max - min) / 2;

    return R;
}

function isCrossOBBOBBL(OBB1, OBB2, L1) {
    let L = Vec3Normalize(L1);
    let D = Math.abs(Proec(Vec3SubVec3(OBB1.C, OBB2.C), L));

    let R1 = RProecOBB(OBB1, L);
    let R2 = RProecOBB(OBB2, L);

    if (D < (R1 + R2) || D == (R1 + R2)) {
        return true;
    } else {
        return false;
    }
}

export function isCrossOBB(OBB1, OBB2) {
    if (isCrossOBBOBBL(OBB1, OBB2, OBB1.U) && isCrossOBBOBBL(OBB1, OBB2, OBB1.W) && isCrossOBBOBBL(OBB1, OBB2, OBB1.V) &&
        isCrossOBBOBBL(OBB1, OBB2, OBB2.U) && isCrossOBBOBBL(OBB1, OBB2, OBB2.W) && isCrossOBBOBBL(OBB1, OBB2, OBB2.V) &&
        isCrossOBBOBBL(OBB1, OBB2, Vec3CrossVec3(OBB1.U, OBB2.U)) && isCrossOBBOBBL(OBB1, OBB2, Vec3CrossVec3(OBB1.U, OBB2.W)) && isCrossOBBOBBL(OBB1, OBB2, Vec3CrossVec3(OBB1.U, OBB2.V)) &&
        isCrossOBBOBBL(OBB1, OBB2, Vec3CrossVec3(OBB1.W, OBB2.U)) && isCrossOBBOBBL(OBB1, OBB2, Vec3CrossVec3(OBB1.W, OBB2.W)) && isCrossOBBOBBL(OBB1, OBB2, Vec3CrossVec3(OBB1.W, OBB2.V)) &&
        isCrossOBBOBBL(OBB1, OBB2, Vec3CrossVec3(OBB1.V, OBB2.U)) && isCrossOBBOBBL(OBB1, OBB2, Vec3CrossVec3(OBB1.V, OBB2.W)) && isCrossOBBOBBL(OBB1, OBB2, Vec3CrossVec3(OBB1.V, OBB2.V))
    ) {
        return true;
    } else {
        return false;
    }
}
