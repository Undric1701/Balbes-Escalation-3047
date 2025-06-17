/* AT7, 13.06.2025, math module: 4D vectors module */

export class _Vec4 {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    toList = () => {
        return [this.x, this.y, this.z, this.w];
    }
    toArray = () => {
        return new Float32Array[this.x, this.y, this.z, this.w];
    }
}
export function Vec4(x, y, z, w) {
    return new _Vec4(x, y, z, w)
}
