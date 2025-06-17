/* AT7, 13.06.2025, math module: matrices module */

import { PI } from "./mth.js"

import * as Vec3s from "./mth_vec3.js"


export class Matr {
    constructor(A00, A01, A02, A03,
        A10, A11, A12, A13,
        A20, A21, A22, A23,
        A30, A31, A32, A33) {
        if (A00 == undefined) {
            this.a = [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1],
            ];
        } else {
            this.a =
                [[A00, A01, A02, A03],
                [A10, A11, A12, A13],
                [A20, A21, A22, A23],
                [A30, A31, A32, A33]];
        }
    };
}
export function MatrTranslate(t) {
    return new Matr(1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        t.x, t.y, t.z, 1);
}
export function MatrScale(S) {
    return new Matr(S.x, 0, 0, 0,
        0, S.y, 0, 0,
        0, 0, S.z, 0,
        0, 0, 0, 1);
}
export function MatrRotate(AngleInDegree, R) {
    let a = AngleInDegree * Math.PI,
      sine = Math.sin(a),
      cosine = Math.cos(a);
    let x = 0,
      y = 0,
      z = 1;
    if (typeof R == "object")
      if (R.length == 3) (x = R[0]), (y = R[1]), (z = R[2]);
      else (x = R.x), (y = R.y), (z = R.z);

    let len = x * x + y * y + z * z;
    if (len != 0 && len != 1)
      (len = Math.sqrt(len)), (x /= len), (y /= len), (z /= len);
    let m = new Matr();
    m.a[0][0] = cosine + x * x * (1 - cosine);
    m.a[0][1] = x * y * (1 - cosine) + z * sine;
    m.a[0][2] = x * z * (1 - cosine) - y * sine;
    m.a[0][3] = 0;
    m.a[1][0] = y * x * (1 - cosine) - z * sine;
    m.a[1][1] = cosine + y * y * (1 - cosine);
    m.a[1][2] = y * z * (1 - cosine) + x * sine;
    m.a[1][3] = 0;
    m.a[2][0] = z * x * (1 - cosine) + y * sine;
    m.a[2][1] = z * y * (1 - cosine) - x * sine;
    m.a[2][2] = cosine + z * z * (1 - cosine);
    m.a[2][3] = 0;
    m.a[3][0] = 0;
    m.a[3][1] = 0;
    m.a[3][2] = 0;
    m.a[3][3] = 1;
    return m;
}
export function MatrTranspose(m) {
    return new Matr(m.a[0][0], m.a[1][0], m.a[2][0], m.a[3][0],
        m.a[0][1], m.a[1][1], m.a[2][1], m.a[3][1],
        m.a[0][2], m.a[1][2], m.a[2][2], m.a[3][2],
        m.a[0][3], m.a[1][3], m.a[2][3], m.a[3][3]);
}
export function MatrDeterm3x3(A11, A12, A13, A21, A22, A23, A31, A32, A33) {
    return A11 * A22 * A33 + A12 * A23 * A31 + A13 * A21 * A32 - A11 * A23 * A32 - A12 * A21 * A33 - A13 * A22 * A31;
}
export function MatrDeterm(m) {
    return m.a[0][0] * MatrDeterm3x3(m.a[1][1], m.a[1][2], m.a[1][3],
        m.a[2][1], m.a[2][2], m.a[2][3],
        m.a[3][1], m.a[3][2], m.a[3][3]) +

        -m.a[0][1] * MatrDeterm3x3(m.a[1][0], m.a[1][2], m.a[1][3],
            m.a[2][0], m.a[2][2], m.a[2][3],
            m.a[3][0], m.a[3][2], m.a[3][3]) +

        m.a[0][2] * MatrDeterm3x3(m.a[1][0], m.a[1][1], m.a[1][3],
            m.a[2][0], m.a[2][1], m.a[2][3],
            m.a[3][0], m.a[3][1], m.a[3][3]) +

        -m.a[0][3] * MatrDeterm3x3(m.a[1][0], m.a[1][1], m.a[1][2],
            m.a[2][0], m.a[2][1], m.a[2][2],
            m.a[3][0], m.a[3][1], m.a[3][2]);
}
export function MatrInverse(m) {
    let det = MatrDeterm(m);
    let r = new Matr(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

    if (det == 0) {
        r.a = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        return r;
    }
    /* Build adjoint matrix */
    r.a[0][0] =
        MatrDeterm3x3(m.a[1][1], m.a[1][2], m.a[1][3],
            m.a[2][1], m.a[2][2], m.a[2][3],
            m.a[3][1], m.a[3][2], m.a[3][3]) / det;
    r.a[1][0] =
        -MatrDeterm3x3(m.a[1][0], m.a[1][2], m.a[1][3],
            m.a[2][0], m.a[2][2], m.a[2][3],
            m.a[3][0], m.a[3][2], m.a[3][3]) / det;
    r.a[2][0] =
        MatrDeterm3x3(m.a[1][0], m.a[1][1], m.a[1][3],
            m.a[2][0], m.a[2][1], m.a[2][3],
            m.a[3][0], m.a[3][1], m.a[3][3]) / det;
    r.a[3][0] =
        -MatrDeterm3x3(m.a[1][0], m.a[1][1], m.a[1][2],
            m.a[2][0], m.a[2][1], m.a[2][2],
            m.a[3][0], m.a[3][1], m.a[3][2]) / det;

    r.a[0][1] =
        -MatrDeterm3x3(m.a[0][1], m.a[0][2], m.a[0][3],
            m.a[2][1], m.a[2][2], m.a[2][3],
            m.a[3][1], m.a[3][2], m.a[3][3]) / det;
    r.a[1][1] =
        MatrDeterm3x3(m.a[0][0], m.a[0][2], m.a[0][3],
            m.a[2][0], m.a[2][2], m.a[2][3],
            m.a[3][0], m.a[3][2], m.a[3][3]) / det;
    r.a[2][1] =
        -MatrDeterm3x3(m.a[0][0], m.a[0][1], m.a[0][3],
            m.a[2][0], m.a[2][1], m.a[2][3],
            m.a[3][0], m.a[3][1], m.a[3][3]) / det;
    r.a[3][1] =
        MatrDeterm3x3(m.a[0][0], m.a[0][1], m.a[0][2],
            m.a[2][0], m.a[2][1], m.a[2][2],
            m.a[3][0], m.a[3][1], m.a[3][2]) / det;

    r.a[0][2] =
        MatrDeterm3x3(m.a[0][1], m.a[0][2], m.a[0][3],
            m.a[1][1], m.a[1][2], m.a[1][3],
            m.a[3][1], m.a[3][2], m.a[3][3]) / det;
    r.a[1][2] =
        -MatrDeterm3x3(m.a[0][0], m.a[0][2], m.a[0][3],
            m.a[1][0], m.a[1][2], m.a[1][3],
            m.a[3][0], m.a[3][2], m.a[3][3]) / det;
    r.a[2][2] =
        MatrDeterm3x3(m.a[0][0], m.a[0][1], m.a[0][3],
            m.a[1][0], m.a[1][1], m.a[1][3],
            m.a[3][0], m.a[3][1], m.a[3][3]) / det;
    r.a[3][2] =
        -MatrDeterm3x3(m.a[0][0], m.a[0][1], m.a[0][2],
            m.a[1][0], m.a[1][1], m.a[1][2],
            m.a[3][0], m.a[3][1], m.a[3][2]) / det;

    r.a[0][3] =
        -MatrDeterm3x3(m.a[0][1], m.a[0][2], m.a[0][3],
            m.a[1][1], m.a[1][2], m.a[1][3],
            m.a[2][1], m.a[2][2], m.a[2][3]) / det;
    r.a[1][3] =
        MatrDeterm3x3(m.a[0][0], m.a[0][2], m.a[0][3],
            m.a[1][0], m.a[1][2], m.a[1][3],
            m.a[2][0], m.a[2][2], m.a[2][3]) / det;
    r.a[2][3] =
        -MatrDeterm3x3(m.a[0][0], m.a[0][1], m.a[0][3],
            m.a[1][0], m.a[1][1], m.a[1][3],
            m.a[2][0], m.a[2][1], m.a[2][3]) / det;
    r.a[3][3] =
        MatrDeterm3x3(m.a[0][0], m.a[0][1], m.a[0][2],
            m.a[1][0], m.a[1][1], m.a[1][2],
            m.a[2][0], m.a[2][1], m.a[2][2]) / det;
    return r;
}
export let UnitMatrix = new Matr(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
export function MatrMulMatr(M1, M2) {
    let r = new Matr(
        M1.a[0][0] * M2.a[0][0] + M1.a[0][1] * M2.a[1][0] + M1.a[0][2] * M2.a[2][0] + M1.a[0][3] * M2.a[3][0],
        M1.a[0][0] * M2.a[0][1] + M1.a[0][1] * M2.a[1][1] + M1.a[0][2] * M2.a[2][1] + M1.a[0][3] * M2.a[3][1],
        M1.a[0][0] * M2.a[0][2] + M1.a[0][1] * M2.a[1][2] + M1.a[0][2] * M2.a[2][2] + M1.a[0][3] * M2.a[3][2],
        M1.a[0][0] * M2.a[0][3] + M1.a[0][1] * M2.a[1][3] + M1.a[0][2] * M2.a[2][3] + M1.a[0][3] * M2.a[3][3],
        M1.a[1][0] * M2.a[0][0] + M1.a[1][1] * M2.a[1][0] + M1.a[1][2] * M2.a[2][0] + M1.a[1][3] * M2.a[3][0],
        M1.a[1][0] * M2.a[0][1] + M1.a[1][1] * M2.a[1][1] + M1.a[1][2] * M2.a[2][1] + M1.a[1][3] * M2.a[3][1],
        M1.a[1][0] * M2.a[0][2] + M1.a[1][1] * M2.a[1][2] + M1.a[1][2] * M2.a[2][2] + M1.a[1][3] * M2.a[3][2],
        M1.a[1][0] * M2.a[0][3] + M1.a[1][1] * M2.a[1][3] + M1.a[1][2] * M2.a[2][3] + M1.a[1][3] * M2.a[3][3],
        M1.a[2][0] * M2.a[0][0] + M1.a[2][1] * M2.a[1][0] + M1.a[2][2] * M2.a[2][0] + M1.a[2][3] * M2.a[3][0],
        M1.a[2][0] * M2.a[0][1] + M1.a[2][1] * M2.a[1][1] + M1.a[2][2] * M2.a[2][1] + M1.a[2][3] * M2.a[3][1],
        M1.a[2][0] * M2.a[0][2] + M1.a[2][1] * M2.a[1][2] + M1.a[2][2] * M2.a[2][2] + M1.a[2][3] * M2.a[3][2],
        M1.a[2][0] * M2.a[0][3] + M1.a[2][1] * M2.a[1][3] + M1.a[2][2] * M2.a[2][3] + M1.a[2][3] * M2.a[3][3],
        M1.a[3][0] * M2.a[0][0] + M1.a[3][1] * M2.a[1][0] + M1.a[3][2] * M2.a[2][0] + M1.a[3][3] * M2.a[3][0],
        M1.a[3][0] * M2.a[0][1] + M1.a[3][1] * M2.a[1][1] + M1.a[3][2] * M2.a[2][1] + M1.a[3][3] * M2.a[3][1],
        M1.a[3][0] * M2.a[0][2] + M1.a[3][1] * M2.a[1][2] + M1.a[3][2] * M2.a[2][2] + M1.a[3][3] * M2.a[3][2],
        M1.a[3][0] * M2.a[0][3] + M1.a[3][1] * M2.a[1][3] + M1.a[3][2] * M2.a[2][3] + M1.a[3][3] * M2.a[3][3])
    return r;
}
export function MatrView(Loc, At, Up1) {
    let Dir = Vec3s.Vec3Normalize(Vec3s.Vec3SubVec3(At, Loc));
    let Right = Vec3s.Vec3Normalize(Vec3s.Vec3CrossVec3(Dir, Up1));
    let Up = Vec3s.Vec3Normalize(Vec3s.Vec3CrossVec3(Right, Dir));

    let m = new Matr(Right.x, Up.x, -Dir.x, 0,
        Right.y, Up.y, -Dir.y, 0,
        Right.z, Up.z, -Dir.z, 0,
        -Vec3s.Vec3DotVec3(Loc, Right), -Vec3s.Vec3DotVec3(Loc, Up), Vec3s.Vec3DotVec3(Loc, Dir), 1);
    return m;
}
export function MatrFrustum(l, r, b, t, n, f) {
    let m = new Matr(2 * n / (r - l), 0, 0, 0,
        0, 2 * n / (t - b), 0, 0,
        (r + l) / (r - l), (t + b) / (t - b), -(f + n) / (f - n), -1,
        0, 0, - 2 * n * f / (f - n), 0);
    return m;
}

export function float32ArrayFromMatr(matr) {
    //return new Float32Array(matr.a[0].concat(matr.a[1].concat(matr.a[2].concat(matr.a[3]))), 0, 16);
    return new Float32Array(matr.a[0].concat(matr.a[1], matr.a[2], matr.a[3]));
}