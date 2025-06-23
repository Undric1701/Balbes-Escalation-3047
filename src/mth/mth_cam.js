/* IK4, 20.06, camera support module */

import { matr, MatrView, MatrFrustum, MatrMulMatr } from "./mth_matr.js"
import { Vec3 } from "./mth_vec3.js"
import * as mth from "./mth.js"

export class _camera {
  constructor() {
    this.matrView = matr();
    this.matrProj = matr();
    this.matrVP = matr();

    this.loc = Vec3();
    this.at = Vec3();
    this.dir = Vec3();
    this.up = Vec3();
    this.right = Vec3();
    this.setDef();
  }

  set(loc, at, up) {
    this.matrView = MatrView(loc, at, up);
    this.loc = Vec3(loc);
    this.at = Vec3(at);
    this.dir = Vec3(
      -this.matrView.a[0][2],
      -this.matrView.a[1][2],
      -this.matrView.a[2][2]
    );
    this.up = Vec3(
      this.matrView.a[0][1],
      this.matrView.a[1][1],
      this.matrView.a[2][1]
    );
    this.right = Vec3(
      this.matrView.a[0][0],
      this.matrView.a[1][0],
      this.matrView.a[2][0]
    );
    this.matrVP = MatrMulMatr(this.matrView, this.matrProj);
  }

  setProj(projSize, projDist, projFarClip) {
    let rx = projSize,
      ry = projSize;

    this.projDist = projDist;
    this.projSize = projSize;
    this.projFarClip = projFarClip;

    if (this.frameW > this.frameH)
      rx *= this.frameW / this.frameH;
    else
      ry *= this.frameH / this.frameW;
    this.matrProj = MatrFrustum(
      -rx / 2.0,
      rx / 2.0,
      -ry / 2.0,
      ry / 2.0,
      projDist,
      projFarClip
    );

    this.matrVP = MatrMulMatr(this.matrView, this.matrProj);
  }

  setSize(frameW, frameH) {
    if (frameW < 1) frameW = 1;
    if (frameH < 1) frameH = 1;
    this.frameW = frameW;
    this.frameH = frameH;
    this.setProj(this.projSize, this.projDist, this.projFarClip);
  }

  setDef() {
    this.loc = Vec3(8, 8, 8);
    this.at = Vec3(0, 0, 0);
    this.up = Vec3(0, 1, 0);

    this.projDist = 0.1;
    this.projSize = 0.1;
    this.projFarClip = 1800;

    this.frameW = gl.viewportWidth;
    this.frameH = gl.viewportHeight;
    this.matrView = MatrView(this.loc, this.at, this.up);

    this.setProj(this.projSize, this.projDist, this.projFarClip);
    this.set(this.loc, this.at, this.up);
    this.setSize(this.frameW, this.frameH);
  }
}

export function camera() {
  return new _camera();
}

/*
export function control(keys, isShift) {
  ;
}
*/

let isA = false;
let saveDist;

export function control(keys, isShift) {
  
  let Dist = mth.Vec3Len(mth.Vec3SubVec3(animation.cam.at, animation.cam.loc));
  saveDist = Dist;
  let cosT = (animation.cam.loc.y - animation.cam.at.y) / Dist,
    sinT = Math.sqrt(1 - cosT * cosT),
    plen = Dist * sinT,
    cosP = (animation.cam.loc.z - animation.cam.at.z) / plen,
    sinP = (animation.cam.loc.x - animation.cam.at.x) / plen,
    Azimuth = mth.radian2Degrees(Math.atan2(sinP, cosP)),
    Elevator = mth.radian2Degrees(Math.atan2(sinT, cosT)),
    koef = 0.18, shift = 1;

  /*
  Dist = 20;

  let w = keys['w'.charCodeAt(0)] || keys['W'.charCodeAt(0)];
  let s = keys['s'.charCodeAt(0)] || keys['S'.charCodeAt(0)];
  let a = keys['a'.charCodeAt(0)] || keys['A'.charCodeAt(0)];
  let d = keys['d'.charCodeAt(0)] || keys['D'.charCodeAt(0)];
  let e = keys['e'.charCodeAt(0)] || keys['E'.charCodeAt(0)];
  let q = keys['q'.charCodeAt(0)] || keys['Q'.charCodeAt(0)];

  if (isShift)
  {
    shift =  3.0;
  }

  if (w || s || a || d || e || q) {
    let Dir = Vec3(0, 0, 0);

    if (s)
      Dir = mth.Vec3AddVec3(Dir, mth.Vec3Neg(animation.cam.dir));
    if (w)
      Dir = mth.Vec3AddVec3(Dir, Vec3(animation.cam.dir));
    if (a)
      Dir = mth.Vec3AddVec3(Dir, mth.Vec3Normalize(mth.Vec3Neg(animation.cam.right)));
    if (d)
      Dir = mth.Vec3AddVec3(Dir, mth.Vec3Normalize(animation.cam.right));
    if (q)
      Dir = mth.Vec3AddVec3(Dir, mth.Vec3Neg(animation.cam.up));
    if (e)
      Dir = mth.Vec3AddVec3(Dir, animation.cam.up);
    
    animation.cam.loc = mth.Vec3AddVec3(animation.cam.loc, mth.Vec3MulNum(Dir, koef * shift)), animation.cam.at = mth.Vec3AddVec3(animation.cam.at, mth.Vec3MulNum(Dir, koef * shift));
    animation.cam.set(animation.cam.loc, animation.cam.at, animation.cam.up);

  } else if (animation.input.mousePressed) {
    
    */
   if (animation.input.mousePressed)
      Azimuth -= animation.input.Mdx / 3.0;

    if (animation.input.mousePressed)
      Elevator -= animation.input.Mdy / 3.0;

    if (Elevator < 0.08)
      Elevator = 0.08;
    else if (Elevator > 178.90)
      Elevator = 178.90;

    Dist += animation.input.Mdz / 180;
    if (Dist < 0.1)
      Dist = 0.1;
    if (Dist > 30)
      Dist = 30;
    animation.input.Mdz = 0;

    window.animation.cam.set(mth.PointTransform(Vec3(0, Dist, 0), mth.MatrMulMatr3(mth.MatrRotateX(Elevator), mth.MatrRotateY(Azimuth), mth.MatrTranslate(animation.cam.at))),
      animation.cam.at,
      Vec3(0, 1, 0));
    if (!isA) {
      animation.cam.loc = mth.Vec3AddVec3(animation.cam.loc, mth.Vec3(8, 8, 8)), animation.cam.at = mth.Vec3AddVec3(animation.cam.at, mth.Vec3(8, 8, 8));
      animation.cam.set(animation.cam.loc, animation.cam.at, animation.cam.up);
      isA = true;
    }
    Dist = saveDist;
  //}
}

/*
export function control(event) {
  let Dist = mth.Vec3Len(mth.Vec3SubVec3(animation.cam.at, animation.cam.loc));

  let cosT = (animation.cam.loc.y - animation.cam.at.y) / Dist,
    sinT = Math.sqrt(1 - cosT * cosT),
    plen = Dist * sinT,
    cosP = (animation.cam.loc.z - animation.cam.at.z) / plen,
    sinP = (animation.cam.loc.x - animation.cam.at.x) / plen,
    Azimuth = mth.radian2Degrees(Math.atan2(sinP, cosP)),
    Elevator = mth.radian2Degrees(Math.atan2(sinT, cosT)),
    speed = 1.8;

  Dist = 0.30;

  if (event.key == 'w' || event.key == 'W' || event.key == 's' || event.key == 'S' || event.key == 'a' || event.key == 'A' || event.key == 'd' || event.key == 'D' || event.key == 'q' || event.key == 'Q' || event.key == 'e' || event.key == 'E') {
    let Dir = Vec3(0, 0, 0);

    if (event.key == 's' || event.key == 'S')
      Dir = mth.Vec3Neg(animation.cam.dir);
    if (event.key == 'w' || event.key == 'W')
      Dir = Vec3(animation.cam.dir);
    if (event.key == 'a' || event.key == 'A')
      Dir = mth.Vec3Normalize(mth.Vec3Neg(animation.cam.right));
    if (event.key == 'd' || event.key == 'D')
      Dir = mth.Vec3Normalize(animation.cam.right);
    if (event.key == 'q' || event.key == 'Q')
      Dir = mth.Vec3Neg(animation.cam.up);
    if (event.key == 'e' || event.key == 'E')
      Dir = animation.cam.up;

    if ((event.key == 's' && event.key == 'w') || (event.key == 'S' && event.key == 'W') || (event.key == 's' && event.key == 'W') || (event.key == 'S' && event.key == 'w'))
      Dir = Vec3(0, 0, 0);
    if ((event.key == 'a' && event.key == 'd') || (event.key == 'A' && event.key == 'D') || (event.key == 'a' && event.key == 'D') || (event.key == 'A' && event.key == 'd'))
      Dir = Vec3(0, 0, 0);
    if ((event.key == 'q' && event.key == 'e') || (event.key == 'Q' && event.key == 'E') || (event.key == 'q' && event.key == 'E') || (event.key == 'Q' && event.key == 'e'))
      Dir = Vec3(0, 0, 0);

    animation.cam.loc = mth.Vec3AddVec3(animation.cam.loc, mth.Vec3MulNum(Dir, 0.18)), animation.cam.at = mth.Vec3AddVec3(animation.cam.at, mth.Vec3MulNum(Dir, 0.18));
    animation.cam.set(animation.cam.loc, animation.cam.at, animation.cam.up);

  } else if (animation.input.mousePressed) {// || event.key == 'a' || event.key == 'A' || event.key == 'd' || event.key == 'D' || event.key == 'q' || event.key == 'Q' || event.key == 'e' || event.key == 'E') {
    
    if (animation.input.mousePressed)
      Azimuth -= animation.input.Mdx / 3.0;

    if (animation.input.mousePressed)
      Elevator -= animation.input.Mdy / 3.0;

    if (Elevator < 0.08)
      Elevator = 0.08;
    else if (Elevator > 178.90)
      Elevator = 178.90;

    window.animation.cam.set(mth.PointTransform(Vec3(0, Dist, 0), mth.MatrMulMatr3(mth.MatrRotateX(Elevator), mth.MatrRotateY(Azimuth), mth.MatrTranslate(animation.cam.at))),
      animation.cam.at,
      Vec3(0, 1, 0));
    if (!isA) {
      animation.cam.loc = mth.Vec3AddVec3(animation.cam.loc, mth.Vec3(8, 8, 8)), animation.cam.at = mth.Vec3AddVec3(animation.cam.at, mth.Vec3(8, 8, 8));
      animation.cam.set(animation.cam.loc, animation.cam.at, animation.cam.up);
      isA = true;
    }
  }
}
  */