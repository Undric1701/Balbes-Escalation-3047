import * as mth from "../mth.js"
import * as res from "../../anim/rnd/res/res.js"

export function cubePrim(color) {
  let mtl = res.material("Cube material", mth.Vec4(0.3, 0.3, 0.3, 1), mth.Vec4(0.5, 0.5, 0.5, 1), mth.Vec4(0.2, 0.2, 0.2, 0.2));
  mtl.shaderNo = res.getShdIdByName("platon");

  let a = 1;
  let points = [mth.Vec3Normalize(mth.Vec3(-a, -a, -a)),
  mth.Vec3Normalize(mth.Vec3(a, -a, -a)),
  mth.Vec3Normalize(mth.Vec3(-a, -a, a)),
  mth.Vec3Normalize(mth.Vec3(a, -a, a)),
  mth.Vec3Normalize(mth.Vec3(-a, a, -a)),
  mth.Vec3Normalize(mth.Vec3(a, a, -a)),
  mth.Vec3Normalize(mth.Vec3(-a, a, a)),
  mth.Vec3Normalize(mth.Vec3(a, a, a))];
  let Indices = [
      0, 1, 2,
      1, 2, 3,
      5, 4, 7,
      4, 6, 7,
      0, 1, 4,
      1, 5, 4,
      2, 3, 6,
      6, 3, 7,
      0, 2, 4,
      6, 4, 2,
      1, 3, 5,
      5, 7, 3];
  let normals = points;

  let colors = new Array(points.length).fill(color);
  let texCoords = new Array(points.length).fill(mth.Vec2(0, 0));
  //texCoords = new Array(points.length).fill(mth.);

  let vertices = mth.VertexList(points, texCoords, normals, colors);

  let prim;

  if (typeof window === "undefined") {
    prim = res.prim(mtl, null, vertices, Indices);
  } else {
    prim = res.prim(mtl, gl.TRIANGLES, vertices, Indices);
  }
  return prim;
}

export function tetraPrim(color) {
  let mtl = res.material("Tetra material", mth.Vec4(0.3, 0.3, 0.3, 1), mth.Vec4(0.5, 0.5, 0.5, 1), mth.Vec4(0.2, 0.2, 0.2, 0.2));
  mtl.shaderNo = res.getShdIdByName("platon");

  let points = [
    mth.Vec3(1, 0, 0),
    mth.Vec3(0, 1, 0),
    mth.Vec3(1, 1, 1),
    mth.Vec3(0, 0, 1)
  ];

  let Indices = [
    0, 1, 2,
    0, 2, 3, 
    0, 1, 3, 
    1, 2, 3
  ];
  let normals = points;

  let colors = new Array(points.length).fill(color);
  let texCoords = new Array(points.length).fill(mth.Vec2(0, 0));

  let vertices = mth.VertexList(points, texCoords, normals, colors);

  let prim;

  if (typeof window === "undefined") {
    prim = res.prim(mtl, null, vertices, Indices);
  } else {
    prim = res.prim(mtl, gl.TRIANGLES, vertices, Indices);
  }
  return prim;
}

export function octaPrim(color) {
  let mtl = res.material("Octa material", mth.Vec4(0.3, 0.3, 0.3, 1), mth.Vec4(0.5, 0.5, 0.5, 1), mth.Vec4(0.2, 0.2, 0.2, 0.2));
  mtl.shaderNo = res.getShdIdByName("platon");

  let points = [
    mth.Vec3(0.70710678, 0, 0), 
    mth.Vec3(0, 0, 0.70710678), 
    mth.Vec3(-0.70710678, 0, 0), 
    mth.Vec3(0, 0, -0.70710678), 
    mth.Vec3(0, 0.70710678, 0), 
    mth.Vec3(0, -0.70710678, 0),
  ];

  let Indices = [
    0, 1, 4, 0, 1, 5, 
    0, 3, 4, 0, 3, 5,
    1, 2, 4, 1, 2, 5, 
    2, 3, 4, 2, 3, 5,
  ];
  let normals = points;

  let colors = new Array(points.length).fill(color);
  let texCoords = new Array(points.length).fill(mth.Vec2(0, 0));

  let vertices = mth.VertexList(points, texCoords, normals, colors);

  let prim;

  if (typeof window === "undefined") {
    prim = res.prim(mtl, null, vertices, Indices);
  } else {
    prim = res.prim(mtl, gl.TRIANGLES, vertices, Indices);
  }
  return prim;
}

export function icosPrim(color) {
  let mtl = res.material("Icos material", mth.Vec4(0.3, 0.3, 0.3, 1), mth.Vec4(0.5, 0.5, 0.5, 1), mth.Vec4(0.2, 0.2, 0.2, 0.2));
  mtl.shaderNo = res.getShdIdByName("platon");

  let points = [
    mth.Vec3(0, -1.11803, 0),
    mth.Vec3(0, -0.5, 1),
    mth.Vec3(0.9511, -0.5, 0.309),
    mth.Vec3(0.58778, -0.5, -0.809),
    mth.Vec3(-0.58778, -0.5, -0.809),
    mth.Vec3(-0.9511, -0.5, 0.309),
    mth.Vec3(0.58778, 0.5, 0.809),
    mth.Vec3(0.9511, 0.5, -0.309),
    mth.Vec3(0, 0.5, -1),
    mth.Vec3(-0.9511, 0.5, -0.309),
    mth.Vec3(-0.58778, 0.5, 0.809),
    mth.Vec3(0, 1.11803, 0),
  ];

  let Indices = [
    0, 1, 2,
    0, 2, 3,
    0, 3, 4,
    0, 4, 5,
    0, 1, 5,

    11, 10, 6,
    11, 6, 7,
    11, 7, 8,
    11, 8, 9,
    11, 9, 10,

    1, 2, 6,
    2, 3, 7,
    3, 4, 8, 
    4, 5, 9,
    5, 1, 10,
    
    10, 1, 6,
    6, 2, 7,
    7, 3, 8,
    8, 4, 9,
    9, 5, 10
  ];
  let normals = points;

  let colors = new Array(points.length).fill(color);
  let texCoords = new Array(points.length).fill(mth.Vec2(0, 0));

  let vertices = mth.VertexList(points, texCoords, normals, colors);

  let prim;

  if (typeof window === "undefined") {
    prim = res.prim(mtl, null, vertices, Indices);
  } else {
    prim = res.prim(mtl, gl.TRIANGLES, vertices, Indices);
  }
  return prim;
}

export function dodePrim(color) {
  let mtl = res.material("Dode material", mth.Vec4(0.3, 0.3, 0.3, 1), mth.Vec4(0.5, 0.5, 0.5, 1), mth.Vec4(0.2, 0.2, 0.2, 0.2));
  mtl.shaderNo = res.getShdIdByName("platon");

  let points = [
    mth.Vec3(0, -1.61803399, 0.61803399),
    mth.Vec3(1, -1, 1),
    mth.Vec3(0.61803399,0,1.61803399),
    mth.Vec3(-0.61803399,0,1.61803399),
    mth.Vec3(-1, -1, 1),
    mth.Vec3(1, 1, 1),
    mth.Vec3(0,1.61803399,0.61803399),
    mth.Vec3(-1, 1, 1),
    mth.Vec3(-1.61803399,0.61803399,0),
    mth.Vec3(-1.61803399,-0.61803399,0), 
    mth.Vec3(1.61803399,-0.61803399,0), 
    mth.Vec3(1.61803399,0.61803399,0), 
    mth.Vec3(0,-1.61803399,-0.61803399),
    mth.Vec3(1, -1, -1),
    mth.Vec3(0.61803399,0,-1.61803399),
    mth.Vec3(-0.61803399,0,-1.61803399),
    mth.Vec3(-1, -1, -1),
    mth.Vec3(0,1.61803399,-0.61803399),
    mth.Vec3(1, 1, -1),
    mth.Vec3(-1, 1, -1),
  ];

  let Indices = [
    0, 1, 2,
    2, 3, 4,
    4, 2, 0,

    2, 3, 7,
    7, 2, 5,
    5, 7, 6,

    4, 3, 7,
    4, 7, 8,
    4, 8, 9,

    1, 2, 5,
    1, 5, 11,
    1, 11, 10,
    
    10, 11, 18,
    10, 18, 13,
    18, 13, 14,

    14, 18, 17,
    14, 17, 15,
    15, 17, 19,
    
    8, 9, 19,
    9, 16, 19,
    19, 16, 15,

    15, 16, 12,
    12, 15, 13,
    13, 14, 15,

    0, 12, 13,
    13, 0, 1,
    13, 1, 10,

    11, 18, 17,
    11, 17, 5,
    17, 5, 6,

    6, 17, 19,
    6, 19, 7,
    19, 7, 8,

    16, 9, 4,
    16, 4, 0,
    16, 0, 12,
  ];
  let normals = points;

  let colors = new Array(points.length).fill(color);
  let texCoords = new Array(points.length).fill(mth.Vec2(0, 0));

  let vertices = mth.VertexList(points, texCoords, normals, colors);

  let prim;

  if (typeof window === "undefined") {
    prim = res.prim(mtl, null, vertices, Indices);
  } else {
    prim = res.prim(mtl, gl.TRIANGLES, vertices, Indices);
  }
  return prim;
}

/*
export function setDefaultTetrahedronGeom() {
    let a = Math.sqrt(3) / 3;
    let vertices = [mth.Vec3Normalize(mth.Vec3Set(-a, -a, -a)),
    mth.Vec3Normalize(mth.Vec3Set(a, -a, a)),
    mth.Vec3Normalize(mth.Vec3Set(a, a, -a)),
    mth.Vec3Normalize(mth.Vec3Set(-a, a, a))];
    let Indices = [
        0, 1, 2,
        0, 2, 3,
        0, 1, 3,
        1, 2, 3
    ];
    let normals = vertices;
    return [vertices, normals, Indices];
}

export function setDefaultOctahedronGeom() {
    let vertices = [mth.Vec3Set(-1, 0, 0),
    mth.Vec3Set(0, 0, 1),
    mth.Vec3Set(1, 0, 0),
    mth.Vec3Set(0, 0, -1),
    mth.Vec3Set(0, 1, 0),
    mth.Vec3Set(0, -1, 0)];
    let Indices = [
        0, 1, 4,
        1, 2, 4,
        2, 3, 4,
        0, 3, 4,
        0, 1, 5,
        1, 2, 5,
        2, 3, 5,
        0, 3, 5
    ];
    let normals = vertices;
    return [vertices, normals, Indices];
}

export function setDefaultEasterEggGeom() {
    let vertices = [];

    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 5; i++) {
            vertices[j * 5 + i] = mth.Vec3Normalize(mth.Vec3Set(Math.cos(2 * i * mth.PI / 5 + mth.PI / 2 * j), j - 0.5, Math.sin(2 * i * mth.PI / 5 + mth.PI / 2 * j)));
        }
    }
    vertices[10] = mth.Vec3Set(0, -1, 0);
    vertices[11] = mth.Vec3Set(0, 1, 0);
    let Indices = [
        0, 1, 8,
        8, 9, 1,
        1, 2, 9,
        9, 5, 2,
        2, 3, 5,
        5, 6, 3,
        3, 4, 6,
        6, 7, 4,
        4, 0, 7,
        7, 8, 0
    ];
    let normals = vertices;
    return [vertices, normals, Indices];
}

export function setDefaultIcosahedronGeom() {
    let vertices = [];

    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 5; i++) {
            vertices[j * 5 + i] = mth.Vec3Normalize(mth.Vec3Set(Math.cos(2 * i * mth.PI / 5 + mth.PI * j), j - 0.5, Math.sin(2 * i * mth.PI / 5 + mth.PI * j)));
        }
    }
    vertices[10] = mth.Vec3Set(0, -1, 0);
    vertices[11] = mth.Vec3Set(0, 1, 0);
    let Indices = [
        7, 8, 0,
        0, 1, 8,
        8, 9, 1,
        1, 2, 9,
        9, 5, 2,
        2, 3, 5,
        5, 6, 3,
        3, 4, 6,
        6, 7, 4,
        4, 0, 7,
        0, 1, 10,
        1, 2, 10,
        2, 3, 10,
        3, 4, 10,
        4, 0, 10,
        5, 6, 11,
        6, 7, 11,
        7, 8, 11,
        8, 9, 11,
        9, 5, 11
    ];
    let normals = vertices;
    return [vertices, normals, Indices];
}

export function setDefaultDodecahedronGeom() {
    let vertices = [];
    let icos = setDefaultIcosahedronGeom();
    let ind = icos[2];
    let vert = icos[0];

    for (let i = 0; i < 20; i++)
        vertices[i] = mth.Vec3Normalize(getMedianVector3(vert[ind[i * 3]], vert[ind[i * 3 + 1]], vert[ind[i * 3 + 2]]))
    let Indices = [];
    for (let i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            Indices[i * 9] = i;
            Indices[i * 9 + 1] = (i + 1) % 10;
            Indices[i * 9 + 2] = (i + 2) % 10;
            Indices[i * 9 + 3] = i;
            Indices[i * 9 + 4] = 15 + (i / 2 + 1) % 5;
            Indices[i * 9 + 5] = 15 + (i / 2 + 2) % 5;
            Indices[i * 9 + 6] = i;
            Indices[i * 9 + 7] = (i + 2) % 10;
            Indices[i * 9 + 8] = 15 + (i / 2 + 2) % 5;
        } else {
            Indices[i * 9] = i;
            Indices[i * 9 + 1] = (i + 1) % 10;
            Indices[i * 9 + 2] = (i + 2) % 10;
            Indices[i * 9 + 3] = i;
            Indices[i * 9 + 4] = 10 + (i - 1) / 2;
            Indices[i * 9 + 5] = 10 + ((i - 1) / 2 + 1) % 5;
            Indices[i * 9 + 6] = i;
            Indices[i * 9 + 7] = (i + 2) % 10;
            Indices[i * 9 + 8] = 10 + ((i - 1) / 2 + 1) % 5;
        }
    }
    Indices[90] = 10;
    Indices[91] = 11;
    Indices[92] = 12;
    Indices[93] = 10;
    Indices[94] = 12;
    Indices[95] = 13;
    Indices[96] = 10;
    Indices[97] = 13;
    Indices[98] = 14;
    Indices[99] = 15;
    Indices[100] = 16;
    Indices[101] = 17;
    Indices[102] = 15;
    Indices[103] = 17;
    Indices[104] = 18;
    Indices[105] = 15;
    Indices[106] = 18;
    Indices[107] = 19;
    let normals = vertices;
    return [vertices, normals, Indices];
}

export function getNormalGeom(vert, ind) {
    let vertices = [];
    let normals = [];

    for (let i = 0; i < ind.length; i += 3) {
        vertices[i] = vert[ind[i]];
        vertices[i + 1] = vert[ind[i + 1]];
        vertices[i + 2] = vert[ind[i + 2]];
        normals[i] = mth.Vec3Normalize(mth.Vec3CrossVec3(mth.Vec3SubVec3(vertices[i + 1], vertices[i]), mth.Vec3SubVec3(vertices[i + 2], vertices[i])))
        normals[i + 1] = normals[i];
        normals[i + 2] = normals[i];
    }
    return [vertices, normals];
}

/*
let cubeBuf, octaBuf, tetraBuf, icosBuf, dodeBuf;
let cubeind, octaind, tetraind, icosind, dodeind;

export function initBuffers(){
    cubeBuf = [
    0, 0, 0,
    0.47, 0.30, 0.52, 1, 
    -1, -1, -1, 
    
    1, 0, 0, 
    0.47, 0.30, 0.52, 1, 
    1, 0, 0, 
    
    1, 0, 1,
    0.47, 0.30, 0.52, 1, 
    1, 0, 1,
    
    0, 0, 1,
    0.47, 0.30, 0.52, 1, 
    0, 0, 1,
    
    0, 1, 0, 
    0.47, 0.30, 0.52, 1, 
    0, 1, 0, 
    
    1, 1, 0, 
    0.47, 0.30, 0.52, 1, 
    1, 1, 0,
    
    1, 1, 1, 
    0.47, 0.30, 0.52, 1, 
    1, 1, 1,
    
    0, 1, 1, 
    0.47, 0.30, 0.52, 1, 
    0, 1, 1,
  ];

  cubeind = [
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    0, 1, 5, 0, 4, 5,
    1, 5, 6, 1, 2, 6,
    2, 6, 7, 2, 3, 7,
    0, 3, 7, 7, 4, 0
  ];

  octaBuf = [
    0.70710678, 0, 0, 
    0.5, 1, 0.67, 1, 
    0.70710678, 0, 0, 
    
    0, 0, 0.70710678, 
    0.5, 1, 0.67, 1, 
    0, 0, 0.70710678, 
    
    -0.70710678, 0, 0, 
    0.5, 1, 0.67, 1, 
    -0.70710678, 0, 0, 
    
    0, 0, -0.70710678, 
    0.5, 1, 0.67, 1, 
    0, 0, -0.70710678, 
    
    0, 0.70710678, 0, 
    0.5, 1, 0.67, 1, 
    0, 0.70710678, 0, 
    
    0, -0.70710678, 0, 
    0.5, 1, 0.67, 1, 
    0, -0.70710678, 0, 
    
  ];

  octaind = [
    0, 1, 4, 0, 1, 5, 
    0, 3, 4, 0, 3, 5,
    1, 2, 4, 1, 2, 5, 
    2, 3, 4, 2, 3, 5,
  ];

  tetraBuf = [
    1, 0, 0,
    0.9, 0.57, 0.5, 1,
    0, 0, 0,
    
    0, 1, 0,
    0.9, 0.57, 0.5, 1,
    0, 0, 0,
    
    1, 1, 1,
    0.9, 0.57, 0.5, 1,
    0, 0, 0,

    0, 0, 1,
    0.9, 0.57, 0.5, 1,
    0, 0, 0,
  ];

  tetraind = [
    0, 1, 2,
    0, 2, 3, 
    0, 1, 3, 
    1, 2, 3
  ];

  icosBuf = [
    0, -1.11803, 0,
    0.47, 0.6, 0.47, 1,
    0, -1.11803, 0,
    
    0, -0.5, 1,
    0.47, 0.6, 0.47, 1,
    0, -0.5, 1,
    
    0.9511, -0.5, 0.309,
    0.47, 0.6, 0.47, 1,
    0.9511, -0.5, 0.309,
    
    0.58778, -0.5, -0.809,
    0.47, 0.6, 0.47, 1,
    0.58778, -0.5, -0.809,
    
    -0.58778, -0.5, -0.809,
    0.47, 0.6, 0.47, 1,
    -0.58778, -0.5, -0.809,
    
    -0.9511, -0.5, 0.309,
    0.47, 0.6, 0.47, 1,
    -0.9511, -0.5, 0.309,
    
    0.58778, 0.5, 0.809,
    0.47, 0.6, 0.47, 1,
    0.58778, 0.5, 0.809,
    
    0.9511, 0.5, -0.309,
    0.47, 0.6, 0.47, 1,
    0.9511, 0.5, -0.309,
    
    0, 0.5, -1,
    0.47, 0.6, 0.47, 1,
    0, 0.5, -1,
    
    -0.9511, 0.5, -0.309,
    0.47, 0.6, 0.47, 1,
    -0.9511, 0.5, -0.309,
    
    -0.58778, 0.5, 0.809,
    0.47, 0.6, 0.47, 1,
    -0.58778, 0.5, 0.809,
    
    0, 1.11803, 0,
    0.47, 0.6, 0.47, 1,
    0, 1.11803, 0,
    
  ];

  icosind = [
    0, 1, 2,
    0, 2, 3,
    0, 3, 4,
    0, 4, 5,
    0, 1, 5,

    11, 10, 6,
    11, 6, 7,
    11, 7, 8,
    11, 8, 9,
    11, 9, 10,

    1, 2, 6,
    2, 3, 7,
    3, 4, 8, 
    4, 5, 9,
    5, 1, 10,
    
    10, 1, 6,
    6, 2, 7,
    7, 3, 8,
    8, 4, 9,
    9, 5, 10
  ];
}

export function DodeInit() {

  dodeBuf = [
    0, -1.61803399, 0.61803399,//0
    0.21, 0.38, 0.71, 1, 
    0, -1.61803399, 0.61803399,//0
    
    1, -1, 1,//1 
    0.23, 0.4, 0.73, 1,  
    1, -1, 1,//1 
    
    0.61803399,0,1.61803399,//2 
    0.25, 0.42, 0.75, 1, 
    0.61803399,0,1.61803399,//2 
    
    -0.61803399,0,1.61803399,//3 
    0.27, 0.44, 0.77, 1, 
    -0.61803399,0,1.61803399,//3 
    
    -1, -1, 1,//4 
    0.29, 0.46, 0.79, 1, 
    -1, -1, 1,//4 
    
    //
    
    1, 1, 1,//5
    0.31, 0.48, 0.81, 1, 
    1, 1, 1,//5
    
    0,1.61803399,0.61803399,//6 
    0.33, 0.5, 0.83, 1,
    0,1.61803399,0.61803399,//6 
    
    -1, 1, 1,//7 
    0.35, 0.52, 0.85, 1, 
    -1, 1, 1,//7 
    
    //
    
    -1.61803399,0.61803399,0,//8 
    0.37, 0.54, 0.87, 1,
    -1.61803399,0.61803399,0,//8 
    
    -1.61803399,-0.61803399,0,//9 
    0.39, 0.56, 0.89, 1, 
    -1.61803399,-0.61803399,0,//9 
    
    //
    
    1.61803399,-0.61803399,0,//10 
    0.41, 0.58, 0.91, 1, 
    1.61803399,-0.61803399,0,//10 
    
    1.61803399,0.61803399,0,//11 
    0.43, 0.6, 0.93, 1, 
    1.61803399,0.61803399,0,//11 
    
    //
    
    0,-1.61803399,-0.61803399, //12
    0.45, 0.62, 0.95, 1, 
    0,-1.61803399,-0.61803399, //12
    
    1, -1, -1, //13
    0.47, 0.64, 0.97, 1, 
    1, -1, -1, //13
    
    0.61803399,0,-1.61803399, //14
    0.49, 0.66, 0.99, 1, 
    0.61803399,0,-1.61803399, //14
    
    -0.61803399,0,-1.61803399, //15
    0.51, 0.68, 1, 1,
    -0.61803399,0,-1.61803399, //15
    
    -1, -1, -1, //16
    0.53, 0.68, 1, 1, 
    -1, -1, -1, //16
    
    //
    
    0,1.61803399,-0.61803399, //17
    0.55, 0.7, 1, 1, 
    0,1.61803399,-0.61803399, //17
    
    1, 1, -1,//18 
    0.57, 0.72, 1, 1, 
    1, 1, -1,//18 
    
    -1, 1, -1,//19 
    0.59, 0.74, 1, 1, 
    -1, 1, -1,//19 
    
  ];

  dodeind = [
    0, 1, 2,
    2, 3, 4,
    4, 2, 0,

    2, 3, 7,
    7, 2, 5,
    5, 7, 6,

    4, 3, 7,
    4, 7, 8,
    4, 8, 9,

    1, 2, 5,
    1, 5, 11,
    1, 11, 10,
    
    10, 11, 18,
    10, 18, 13,
    18, 13, 14,

    14, 18, 17,
    14, 17, 15,
    15, 17, 19,
    
    8, 9, 19,
    9, 16, 19,
    19, 16, 15,

    15, 16, 12,
    12, 15, 13,
    13, 14, 15,

    0, 12, 13,
    13, 0, 1,
    13, 1, 10,

    11, 18, 17,
    11, 17, 5,
    17, 5, 6,

    6, 17, 19,
    6, 19, 7,
    19, 7, 8,

    16, 9, 4,
    16, 4, 0,
    16, 0, 12,
  ];
}
*/