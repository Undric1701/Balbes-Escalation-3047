/* AT7, 14.06.2025, math module: 2D vectors module */

export class _Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toList = () => {
        return [this.x, this.y];
    }
    toArray = () => {
        return new Float32Array[this.x, this.y];
    }
}

export function Vec2(x, y) {
    return new _Vec2(x, y);
}
export function Vec2AddVec2(v1, v2) {
    return Vec2(v1.x + v2.x, v1.y + v2.y);
}
export function Vec2SubVec2(v1, v2) {
    return Vec3(v1.x - v2.x, v1.y - v2.y);
}
export function Vec2MulVec2(v1, v2) {
    return Vec2(v1.x * v2.x, v1.y * v2.y);
}
export function Vec2MulNum(v1, n) {
    return Vec2(v1.x * n, v1.y * n);
}
export function Vec2DivNum(v, n) {
    if (n != 0)
        return Vec2(v.x / n, v.y / n);
    else
        return v;
}
export function Vec2Neg(v) {
    return Vec3(-v.x, -v.y);
}
export function Vec2DotVec2(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}
export function Vec2Len(v) {
    let len = Vec2DotVec2(v, v);

    return Math.sqrt(len);
}
export function Vec2Len2(v) {
    let len = Vec2DotVec2(v, v);

    return len;
}
export function Vec2Normalize(v) {
    let len = Vec2DotVec2(v, v);

    if (len != 0 && len != 1)
        return Vec2DivNum(v, Math.sqrt(len));
    else
        return v;
}