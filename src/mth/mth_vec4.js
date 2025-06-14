/* AT7, 13.06.2025, math module: 4D vectors module */

export class Vec4 {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    vec4ToList = () => {
        return [this.x, this.y, this.z, this.w];
    }
    vec4ToArray = () => {
        return new Float32Array[this.x, this.y, this.z, this.w];
    }
}
export function Vec4Set(x, y, z, W) {
    return new Vec4(x, y, z, W);
}