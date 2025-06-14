/* AT7, 13.06.2025, math module: matrices module */

export class Matr {
    constructor(A00, A01, A02, A03,
        A10, A11, A12, A13,
        A20, A21, A22, A23,
        A30, A31, A32, A33) {
        this.A =
            [[A00, A01, A02, A03],
            [A10, A11, A12, A13],
            [A20, A21, A22, A23],
            [A30, A31, A32, A33]];
    };
}
export function MatrTranslate(T) {
    return new Matr(1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        T.x, T.y, T.z, 1);
}
export function MatrScale(S) {
    return new Matr(S.x, 0, 0, 0,
        0, S.y, 0, 0,
        0, 0, S.z, 0,
        0, 0, 0, 1);
}
export function MatrRotate(AngleInDegrees, R) {
    let s = Math.sin(AngleInDegrees / 180 * PI), c = Math.cos(AngleInDegrees / 180 * PI),
        x = R.x, y = R.y, z = R.z;

    return new Matr(x * x * (1 - c) + c, x * y * (1 - c) + z * s, x * z * (1 - c) - y * s, 0,
        x * y * (1 - c) - z * s, y * y * (1 - c) + c, y * z * (1 - c) + x * s, 0,
        x * z * (1 - c) + y * s, y * z * (1 - c) - x * s, z * z * (1 - c) + c, 0,
        0, 0, 0, 1);
}
export function MatrTranspose(M) {
    return new Matr(M.A[0][0], M.A[1][0], M.A[2][0], M.A[3][0],
        M.A[0][1], M.A[1][1], M.A[2][1], M.A[3][1],
        M.A[0][2], M.A[1][2], M.A[2][2], M.A[3][2],
        M.A[0][3], M.A[1][3], M.A[2][3], M.A[3][3]);
}
export function MatrDeterm3x3(A11, A12, A13, A21, A22, A23, A31, A32, A33) {
    return A11 * A22 * A33 + A12 * A23 * A31 + A13 * A21 * A32 - A11 * A23 * A32 - A12 * A21 * A33 - A13 * A22 * A31;
}
export function MatrDeterm(M) {
    return M.A[0][0] * MatrDeterm3x3(M.A[1][1], M.A[1][2], M.A[1][3],
        M.A[2][1], M.A[2][2], M.A[2][3],
        M.A[3][1], M.A[3][2], M.A[3][3]) +

        -M.A[0][1] * MatrDeterm3x3(M.A[1][0], M.A[1][2], M.A[1][3],
            M.A[2][0], M.A[2][2], M.A[2][3],
            M.A[3][0], M.A[3][2], M.A[3][3]) +

        M.A[0][2] * MatrDeterm3x3(M.A[1][0], M.A[1][1], M.A[1][3],
            M.A[2][0], M.A[2][1], M.A[2][3],
            M.A[3][0], M.A[3][1], M.A[3][3]) +

        -M.A[0][3] * MatrDeterm3x3(M.A[1][0], M.A[1][1], M.A[1][2],
            M.A[2][0], M.A[2][1], M.A[2][2],
            M.A[3][0], M.A[3][1], M.A[3][2]);
}
export function MatrInverse(M) {
    let det = MatrDeterm(M);
    let r = new Matr(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

    if (det == 0) {
        r.A = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        return r;
    }
    /* Build adjoint matrix */
    r.A[0][0] =
        MatrDeterm3x3(M.A[1][1], M.A[1][2], M.A[1][3],
            M.A[2][1], M.A[2][2], M.A[2][3],
            M.A[3][1], M.A[3][2], M.A[3][3]) / det;
    r.A[1][0] =
        -MatrDeterm3x3(M.A[1][0], M.A[1][2], M.A[1][3],
            M.A[2][0], M.A[2][2], M.A[2][3],
            M.A[3][0], M.A[3][2], M.A[3][3]) / det;
    r.A[2][0] =
        MatrDeterm3x3(M.A[1][0], M.A[1][1], M.A[1][3],
            M.A[2][0], M.A[2][1], M.A[2][3],
            M.A[3][0], M.A[3][1], M.A[3][3]) / det;
    r.A[3][0] =
        -MatrDeterm3x3(M.A[1][0], M.A[1][1], M.A[1][2],
            M.A[2][0], M.A[2][1], M.A[2][2],
            M.A[3][0], M.A[3][1], M.A[3][2]) / det;

    r.A[0][1] =
        -MatrDeterm3x3(M.A[0][1], M.A[0][2], M.A[0][3],
            M.A[2][1], M.A[2][2], M.A[2][3],
            M.A[3][1], M.A[3][2], M.A[3][3]) / det;
    r.A[1][1] =
        MatrDeterm3x3(M.A[0][0], M.A[0][2], M.A[0][3],
            M.A[2][0], M.A[2][2], M.A[2][3],
            M.A[3][0], M.A[3][2], M.A[3][3]) / det;
    r.A[2][1] =
        -MatrDeterm3x3(M.A[0][0], M.A[0][1], M.A[0][3],
            M.A[2][0], M.A[2][1], M.A[2][3],
            M.A[3][0], M.A[3][1], M.A[3][3]) / det;
    r.A[3][1] =
        MatrDeterm3x3(M.A[0][0], M.A[0][1], M.A[0][2],
            M.A[2][0], M.A[2][1], M.A[2][2],
            M.A[3][0], M.A[3][1], M.A[3][2]) / det;

    r.A[0][2] =
        MatrDeterm3x3(M.A[0][1], M.A[0][2], M.A[0][3],
            M.A[1][1], M.A[1][2], M.A[1][3],
            M.A[3][1], M.A[3][2], M.A[3][3]) / det;
    r.A[1][2] =
        -MatrDeterm3x3(M.A[0][0], M.A[0][2], M.A[0][3],
            M.A[1][0], M.A[1][2], M.A[1][3],
            M.A[3][0], M.A[3][2], M.A[3][3]) / det;
    r.A[2][2] =
        MatrDeterm3x3(M.A[0][0], M.A[0][1], M.A[0][3],
            M.A[1][0], M.A[1][1], M.A[1][3],
            M.A[3][0], M.A[3][1], M.A[3][3]) / det;
    r.A[3][2] =
        -MatrDeterm3x3(M.A[0][0], M.A[0][1], M.A[0][2],
            M.A[1][0], M.A[1][1], M.A[1][2],
            M.A[3][0], M.A[3][1], M.A[3][2]) / det;

    r.A[0][3] =
        -MatrDeterm3x3(M.A[0][1], M.A[0][2], M.A[0][3],
            M.A[1][1], M.A[1][2], M.A[1][3],
            M.A[2][1], M.A[2][2], M.A[2][3]) / det;
    r.A[1][3] =
        MatrDeterm3x3(M.A[0][0], M.A[0][2], M.A[0][3],
            M.A[1][0], M.A[1][2], M.A[1][3],
            M.A[2][0], M.A[2][2], M.A[2][3]) / det;
    r.A[2][3] =
        -MatrDeterm3x3(M.A[0][0], M.A[0][1], M.A[0][3],
            M.A[1][0], M.A[1][1], M.A[1][3],
            M.A[2][0], M.A[2][1], M.A[2][3]) / det;
    r.A[3][3] =
        MatrDeterm3x3(M.A[0][0], M.A[0][1], M.A[0][2],
            M.A[1][0], M.A[1][1], M.A[1][2],
            M.A[2][0], M.A[2][1], M.A[2][2]) / det;
    return r;
}
export let UnitMatrix = new Matr(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
export function MatrMulMatr(M1, M2) {
    let r = new Matr(
        M1.A[0][0] * M2.A[0][0] + M1.A[0][1] * M2.A[1][0] + M1.A[0][2] * M2.A[2][0] + M1.A[0][3] * M2.A[3][0],
        M1.A[0][0] * M2.A[0][1] + M1.A[0][1] * M2.A[1][1] + M1.A[0][2] * M2.A[2][1] + M1.A[0][3] * M2.A[3][1],
        M1.A[0][0] * M2.A[0][2] + M1.A[0][1] * M2.A[1][2] + M1.A[0][2] * M2.A[2][2] + M1.A[0][3] * M2.A[3][2],
        M1.A[0][0] * M2.A[0][3] + M1.A[0][1] * M2.A[1][3] + M1.A[0][2] * M2.A[2][3] + M1.A[0][3] * M2.A[3][3],
        M1.A[1][0] * M2.A[0][0] + M1.A[1][1] * M2.A[1][0] + M1.A[1][2] * M2.A[2][0] + M1.A[1][3] * M2.A[3][0],
        M1.A[1][0] * M2.A[0][1] + M1.A[1][1] * M2.A[1][1] + M1.A[1][2] * M2.A[2][1] + M1.A[1][3] * M2.A[3][1],
        M1.A[1][0] * M2.A[0][2] + M1.A[1][1] * M2.A[1][2] + M1.A[1][2] * M2.A[2][2] + M1.A[1][3] * M2.A[3][2],
        M1.A[1][0] * M2.A[0][3] + M1.A[1][1] * M2.A[1][3] + M1.A[1][2] * M2.A[2][3] + M1.A[1][3] * M2.A[3][3],
        M1.A[2][0] * M2.A[0][0] + M1.A[2][1] * M2.A[1][0] + M1.A[2][2] * M2.A[2][0] + M1.A[2][3] * M2.A[3][0],
        M1.A[2][0] * M2.A[0][1] + M1.A[2][1] * M2.A[1][1] + M1.A[2][2] * M2.A[2][1] + M1.A[2][3] * M2.A[3][1],
        M1.A[2][0] * M2.A[0][2] + M1.A[2][1] * M2.A[1][2] + M1.A[2][2] * M2.A[2][2] + M1.A[2][3] * M2.A[3][2],
        M1.A[2][0] * M2.A[0][3] + M1.A[2][1] * M2.A[1][3] + M1.A[2][2] * M2.A[2][3] + M1.A[2][3] * M2.A[3][3],
        M1.A[3][0] * M2.A[0][0] + M1.A[3][1] * M2.A[1][0] + M1.A[3][2] * M2.A[2][0] + M1.A[3][3] * M2.A[3][0],
        M1.A[3][0] * M2.A[0][1] + M1.A[3][1] * M2.A[1][1] + M1.A[3][2] * M2.A[2][1] + M1.A[3][3] * M2.A[3][1],
        M1.A[3][0] * M2.A[0][2] + M1.A[3][1] * M2.A[1][2] + M1.A[3][2] * M2.A[2][2] + M1.A[3][3] * M2.A[3][2],
        M1.A[3][0] * M2.A[0][3] + M1.A[3][1] * M2.A[1][3] + M1.A[3][2] * M2.A[2][3] + M1.A[3][3] * M2.A[3][3])
    return r;
}
export function MatrView(Loc, At, Up1) {
    let Dir = Vec3Normalize(Vec3SubVec3(At, Loc));
    let Right = Vec3Normalize(Vec3CrossVec3(Dir, Up1));
    let Up = Vec3Normalize(Vec3CrossVec3(Right, Dir));

    let m = new Matr(Right.x, Up.x, -Dir.x, 0,
        Right.y, Up.y, -Dir.y, 0,
        Right.z, Up.z, -Dir.z, 0,
        -Vec3DotVec3(Loc, Right), -Vec3DotVec3(Loc, Up), Vec3DotVec3(Loc, Dir), 1);
    return m;
}
export function MatrFrustum(L, R, B, T, N, F) {
    let m = new Matr(2 * N / (R - L), 0, 0, 0,
        0, 2 * N / (T - B), 0, 0,
        (R + L) / (R - L), (T + B) / (T - B), -(F + N) / (F - N), -1,
        0, 0, - 2 * N * F / (F - N), 0);
    return m;
}