/* AT7, 14.06.2025, math module */

export * from "./mth_vec2.js"
export * from "./mth_vec3.js"
export * from "./mth_vec4.js"
export * from "./mth_matr.js"
export * from "./mth_cam.js"

export class _Vertex {
    constructor(pos, texCoord, color, normal) {
        if (pos != undefined) {
            this.pos = pos;
        } else {
            this.pos = mth.Vec3(0, 0, 0);
        }
        //this.pos = pos;
        if (texCoord != undefined) {
            this.texCoord = texCoord;
        } else {
            this.texCoord = mth.Vec2(0, 0);
        }
        //this.texCoord = texCoord;
        if (color != undefined) {
            this.color = color;
        } else {
            this.color = mth.Vec4(1, 1, 1, 1);
        }
        //this.color = color;
        if (normal != undefined) {
            this.normal = normal;
        } else {
            this.normal = mth.Vec3(0, 1, 0);
        }
        //this.normal = normal;        
    }
    toList = () => {
        return this.pos.toList().concat(this.texCoord.toList(), this.color.toList(), this.normal.toList());
    }
    toArray = () => {
        return new Float32Array(this.toList);
    }
}

export function Vertex(pos, texCoord, color, normal) {
    return new _Vertex(pos, texCoord, color, normal);
}

export function VertexList(posList, texCoordList, colorsList, normalsList) {
    let vertexList = [];
    for (let i = 0; i < posList.length; i++) {
        vertexList[i] = Vertex(posList[i], texCoordList[i], colorsList[i], normalsList[i]);
    }
    return vertexList;
}                    
