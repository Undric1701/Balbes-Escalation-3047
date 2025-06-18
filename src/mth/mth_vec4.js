/* AT7, 13.06.2025, math module: 4D vectors module */
import * as mth from "./mth.js"

export class _Vec4 {
    constructor(x, y, z, w) {
        if (x == undefined){ 
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 0;
        } else if (typeof x == "object") {
            if (x.length == 3) { 
                this.x = x[0];
                this.y = x[1];
                this.z = x[2];
                this.w = x[3];
            } else {
                this.x = x.x;
                this.y = x.y;
                this.z = x.z;
                this.w = x.w;
            }
        } else if (y == undefined && z == undefined) {
            this.x = x;
            this.y = x;
            this.z = x;
            this.w = x;
        } else { 
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
    }
    toList = () => {
        return [this.x, this.y, this.z, this.w];
    }
    toArray = () => {
        return new Float32Array([this.x, this.y, this.z, this.w]);
    }
}
export function Vec4(x, y, z, w) {
    if (typeof x instanceof mth._Vec3) {
        return new _Vec4(x.x, x.y, x.z, y);
    }
    return new _Vec4(x, y, z, w)
}
