/* AT7, 13.06.2025, math module: 3D vectors module */

export class _Vec3 {
    constructor(x, y, z) {
        if (x == undefined){ 
            this.x = 0;
            this.y = 0;
            this.z = 0;
        } else if (typeof x == "object") {
            if (x.length == 3) { 
                this.x = x[0];
                this.y = x[1];
                this.z = x[2];
            } else {
                this.x = x.x;
                this.y = x.y;
                this.z = x.z;
            }
        } else if (y == undefined && z == undefined) {
            this.x = x;
            this.y = x;
            this.z = x;
        } else { 
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }
    toList = () => {
        return [this.x, this.y, this.z];
    }
    toArray = () => {
        return new Float32Array([this.x, this.y, this.z]);
    }
}

export function Vec3(x, y, z) {
    return new _Vec3(x, y, z);
}

export function Vec3AddVec3(v1, v2) {
    return Vec3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}
export function Vec3SubVec3(v1, v2) {
    return Vec3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}
export function Vec3MulVec3(v1, v2) {
    return Vec3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
}
export function Vec3MulNum(v1, n) {
    return Vec3(v1.x * n, v1.y * n, v1.z * n);
}
export function Vec3DivNum(v, n) {
    if (n != 0)
        return Vec3(v.x / n, v.y / n, v.z / n);
    else
        return v;
}
export function Vec3Neg(v) {
    return new Vec3(-v.x, -v.y, -v.z);
}
export function Vec3DotVec3(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}
export function Vec3CrossVec3(v1, v2) {
    return Vec3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
}
export function Vec3Len(v) {
    let len = Vec3DotVec3(v, v);

    return Math.sqrt(len);
}
export function Vec3Len2(v) {
    let len = Vec3DotVec3(v, v);

    return len;
}
export function Vec3Normalize(v) {
    let len = Vec3DotVec3(v, v);

    if (len != 0 && len != 1)
        return Vec3DivNum(v, Math.sqrt(len));
    else
        return v;
}
export function PointTransform(v, m) {
    return Vec3(v.x * m.a[0][0] + v.y * m.a[1][0] + v.z * m.a[2][0] + m.a[3][0],
        v.x * m.a[0][1] + v.y * m.a[1][1] + v.z * m.a[2][1] + m.a[3][1],
        v.x * m.a[0][2] + v.y * m.a[1][2] + v.z * m.a[2][2] + m.a[3][2]);
}
export function VectorTransform(v, m) {
    return Vec3(v.x * m.a[0][0] + v.y * m.a[1][0] + v.z * m.a[2][0],
        v.x * m.a[0][1] + v.y * m.a[1][1] + v.z * m.a[2][1],
        v.x * m.a[0][2] + v.y * m.a[1][2] + v.z * m.a[2][2]);
}
export function Vec3MulMatr(v, m) {
    let w = v.x * m.a[0][3] + v.y * m.a[1][3] + v.z * m.a[2][3] + m.a[3][3];

    let r = Vec3((v.x * m.a[0][0] + v.y * m.a[1][0] + v.z * m.a[2][0] + m.a[3][0]) / w,
        (v.x * m.a[0][1] + v.y * m.a[1][1] + v.z * m.a[2][1] + m.a[3][1]) / w,
        (v.x * m.a[0][2] + v.y * m.a[1][2] + v.z * m.a[2][2] + m.a[3][2]) / w);
    return r;
}

