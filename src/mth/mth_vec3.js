/* AT7, 13.06.2025, math module: 3D vectors module */

export class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    vec3ToList = () => {
        return [this.x, this.y, this.z];
    }
    vec3ToArray = () => {
        return new Float32Array[this.x, this.y, this.z];
    }
}

export function Vec3Set(X, Y, Z) {
    return new Vec3(X, Y, Z);
}
export function Vec3AddVec3(V1, V2) {
    return new Vec3(V1.x + V2.x, V1.y + V2.y, V1.z + V2.z);
}
export function Vec3SubVec3(V1, V2) {
    return new Vec3(V1.x - V2.x, V1.y - V2.y, V1.z - V2.z);
}
export function Vec3MulVec3(V1, V2) {
    return new Vec3(V1.x * V2.x, V1.y * V2.y, V1.z * V2.z);
}
export function Vec3MulNum(V1, N) {
    return new Vec3(V1.x * N, V1.y * N, V1.z * N);
}
export function Vec3DivNum(V, N) {
    if (N != 0)
        return new Vec3(V.x / N, V.y / N, V.z / N);
    else
        return V;
}
export function Vec3Neg(V) {
    return new Vec3(-V.x, -V.y, -V.z);
}
export function Vec3DotVec3(V1, V2) {
    return V1.x * V2.x + V1.y * V2.y + V1.z * V2.z;
}
export function Vec3CrossVec3(V1, V2) {
    return new Vec3(V1.y * V2.z - V1.z * V2.y, V1.z * V2.x - V1.x * V2.z, V1.x * V2.y - V1.y * V2.x);
}
export function Vec3Len(V) {
    let len = Vec3DotVec3(V, V);

    return Math.sqrt(len);
}
export function Vec3Len2(V) {
    let len = Vec3DotVec3(V, V);

    return len;
}
export function Vec3Normalize(V) {
    let len = Vec3DotVec3(V, V);

    if (len != 0 && len != 1)
        return Vec3DivNum(V, Math.sqrt(len));
    else
        return V;
}
export function PointTransform(V, M) {
    return Vec3Set(V.x * M.A[0][0] + V.y * M.A[1][0] + V.z * M.A[2][0] + M.A[3][0],
        V.x * M.A[0][1] + V.y * M.A[1][1] + V.z * M.A[2][1] + M.A[3][1],
        V.x * M.A[0][2] + V.y * M.A[1][2] + V.z * M.A[2][2] + M.A[3][2]);
}
export function VectorTransform(V, M) {
    return Vec3Set(V.x * M.A[0][0] + V.y * M.A[1][0] + V.z * M.A[2][0],
        V.x * M.A[0][1] + V.y * M.A[1][1] + V.z * M.A[2][1],
        V.x * M.A[0][2] + V.y * M.A[1][2] + V.z * M.A[2][2]);
}
export function Vec3MulMatr(V, M) {
    let w = V.x * M.A[0][3] + V.y * M.A[1][3] + V.z * M.A[2][3] + M.A[3][3];

    let r = new Vec3((V.x * M.A[0][0] + V.y * M.A[1][0] + V.z * M.A[2][0] + M.A[3][0]) / w,
        (V.x * M.A[0][1] + V.y * M.A[1][1] + V.z * M.A[2][1] + M.A[3][1]) / w,
        (V.x * M.A[0][2] + V.y * M.A[1][2] + V.z * M.A[2][2] + M.A[3][2]) / w);
    return r;
}

