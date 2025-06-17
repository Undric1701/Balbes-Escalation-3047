/* AT7, 13.06.2025, math module: camera module */
//!!!!!!!!!!! Not final version!!! Needs to be talked over

/*
export class Camera {
    constructor(loc, at, up, w, h, projSize, projDist, farClip) {
        this.matrView = MatrView(loc, at, up);
        this.loc = loc;
        this.at = at;
        this.up = Vec3Set(this.matrView.a[0][1], this.matrView.a[1][1], this.matrView.a[2][1]);
        this.Right = Vec3Set(this.matrView.a[0][0], this.matrView.a[1][0], this.matrView.a[2][0]);
        this.Dir = Vec3Set(-this.matrView.a[0][2], -this.matrView.a[1][2], -this.matrView.a[2][2]);
        this.matrProj = CamSetProj(w, h, projSize, projDist, farClip);
        this.matrVP = MatrMulMatr(this.matrView, this.matrProj);
    }
    camUpdate = (loc, at, up) => {
        this.matrView = MatrView(loc, at, up);
        this.loc = loc;
        this.at = at;
        this.up = Vec3Set(this.matrView.a[0][1], this.matrView.a[1][1], this.matrView.a[2][1]);
        this.Right = Vec3Set(this.matrView.a[0][0], this.matrView.a[1][0], this.matrView.a[2][0]);
        this.Dir = Vec3Set(-this.matrView.a[0][2], -this.matrView.a[1][2], -this.matrView.a[2][2]);
        this.matrProj = CamSetProj(w, h, projSize, projDist, farClip);
        this.matrVP = MatrMulMatr(this.matrView, this.matrProj);
    }
    locAdd = (v) => {
        this.loc = Vec3AddVec3(this.loc, v);
        this.camUpdate(this.loc, this.at, this.up);
    }
    atUpdate = (dir) => {
        this.at = Vec3AddVec3(this.loc, dir);
        this.camUpdate(this.loc, this.at, this.up);
    }
}

export function CamSetProj(W, H, ProjSize, ProjDist, ProjFarClip) {
    let Wp = ProjSize, Hp = ProjSize;
    if (W >= H)
        Wp *= W / H;
    else
        Hp *= H / W;
    return MatrFrustum(-Wp / 2, Wp / 2, -Hp / 2, Hp / 2, ProjDist, ProjFarClip);
}
*/

import {Matr, MatrView, MatrFrustum, MatrMulMatr} from "./mth_matr.js"
import {Vec3} from "./mth_vec3.js"

function matr(...args) {
    return new Matr(...args);
}

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

    if (this.frameW > this.frameH) rx *= this.frameW / this.frameH;
    else ry *= this.frameH / this.frameW;
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
    this.loc = Vec3(8, 4.7, 3);
    this.at = Vec3(0, 0, 0);
    this.up = Vec3(0, 1, 0);

    this.projDist = 0.1;
    this.projSize = 0.1;
    this.projFarClip = 1800;

    this.frameW = window.gl.viewportWidth;
    this.frameH = window.gl.viewportHeight;
    this.matrView = MatrView(this.loc, this.at, this.up);

    this.setProj(this.projSize, this.projDist, this.projFarClip);
    this.set(this.loc, this.at, this.up);
    this.setSize(this.frameW, this.frameH);
  }
}

export function camera() {
  return new _camera();
}
