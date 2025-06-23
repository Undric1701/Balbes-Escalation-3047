/* AT7, 14.06.2025, math module */

import { Vec2 } from "./mth_vec2.js"
import { Vec3 } from "./mth_vec3.js"
import { Vec4 } from "./mth_vec4.js"

export * from "./mth_vec2.js"
export * from "./mth_vec3.js"
export * from "./mth_vec4.js"
export * from "./mth_matr.js"
export * from "./mth_cam.js"

export let PI = 3.14159265358979323846;

export function degrees2Radian(A) {
    return (A * Math.PI) / 180.0;
}

export function radian2Degrees(A) {
    return (A * 180.0) / Math.PI;
}


export class _Vertex {
    constructor(pos, texCoord, normal, color) {
        if (pos != undefined) {
            this.pos = pos;
        } else {
            this.pos = Vec3(0, 0, 0);
        }
        //this.pos = pos;
        if (texCoord != undefined) {
            this.texCoord = texCoord;
        } else {
            this.texCoord = Vec2(0, 0);
        }
        //this.texCoord = texCoord;
        if (color != undefined) {
            this.color = color;
        } else {
            this.color = Vec4(1, 1, 1, 1);
        }
        //this.color = color;
        if (normal != undefined) {
            this.normal = normal;
        } else {
            this.normal = Vec3(0, 1, 0);
        }
        //this.normal = normal;        
    }
    toList = () => {
        return (this.pos.toList()).concat(this.texCoord.toList(), this.normal.toList(), this.color.toList());
    }
    toArray = () => {
        return new Float32Array(this.toList());
    }
}

export function Vertex(pos, texCoord, normal, color) {
    return new _Vertex(pos, texCoord, normal, color);
}

export function VertexList(posList, texCoordList, normalsList, colorsList) {
    let vertexList = [];
    for (let i = 0; i < posList.length; i++) {
        vertexList[i] = Vertex(posList[i], texCoordList[i], normalsList[i], colorsList[i],);
    }
    return vertexList;
}

export function VertexArray(vertArr) {
    let vertMas = [];

    for (let i = 0; i < vertArr.length; i++) {
        vertMas = vertMas.concat(vertArr[i].toList());
    }
    return new Float32Array(vertMas);
}

export function vertexFromData(data) {
    return Vertex(Vec3(data[0], data[1], data[2]), Vec2(data[3], data[4]), Vec3(data[5], data[6], data[7]), Vec4(data[8], data[9], data[10], data[11]));
}

export function vertexListFromData(data) {
    let vertArr = [];
    for (let i = 0; i < data.length / 12; i++) {
        vertArr[i] = vertexFromData(data.slice(i * 12, i * 12 + 12));
    }
    return vertArr;
}

export function copyVertices(src) {
    let arr = []
    for (let i = 0; i < src.length; i++) {
        arr[i] = Vertex(Vec3(src[i].pos.toArray()), Vec2(src[i].texCoord.toArray()), Vec3(src[i].normal.toArray()), Vec4(src[i].color.toArray()));
    }
    return arr;
}