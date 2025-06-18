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

let isA = false;

export function control(event) {
  let Dist = mth.Vec3Len(mth.Vec3SubVec3(window.animation.cam.at, window.animation.cam.loc));

  let cosT = (window.animation.cam.loc.y - window.animation.cam.at.y) / Dist,
    sinT = Math.sqrt(1 - cosT * cosT),
    plen = Dist * sinT,
    cosP = (window.animation.cam.loc.z - window.animation.cam.at.z) / plen,
    sinP = (window.animation.cam.loc.x - window.animation.cam.at.x) / plen,
    Azimuth = mth.radian2Degrees(Math.atan2(sinP, cosP)),
    Elevator = mth.radian2Degrees(Math.atan2(sinT, cosT)),
    speed = 1.8;

  Dist = 0.30;

  if (event.key == 'w' || event.key == 'W' || event.key == 's' || event.key == 'S') {
    let Dir = Vec3(0, 0, 0);

    if (event.key == 's' || event.key == 'S')
      Dir = mth.Vec3Neg(window.animation.cam.dir);
    if (event.key == 'w' || event.key == 'W')
      Dir = Vec3(window.animation.cam.dir);

    if ((event.key == 's' && event.key == 'w') || (event.key == 'S' && event.key == 'W') || (event.key == 's' && event.key == 'W') || (event.key == 'S' && event.key == 'w'))
      Dir = Vec3(0, 0, 0);

    window.animation.cam.loc = mth.Vec3AddVec3(window.animation.cam.loc, mth.Vec3MulNum(Dir, 0.30)), window.animation.cam.at = mth.Vec3AddVec3(window.animation.cam.at, mth.Vec3MulNum(Dir, 0.30));
    window.animation.cam.set(window.animation.cam.loc, window.animation.cam.at, window.animation.cam.up);
  } else if (event.key == 'a' || event.key == 'A' || event.key == 'd' || event.key == 'D' || event.key == 'q' || event.key == 'Q' || event.key == 'e' || event.key == 'E') {
    if (event.key == 'a' || event.key == 'A')
      Azimuth += speed;
    if (event.key == 'd' || event.key == 'D')
      Azimuth -= speed;

    if (event.key == 'e' || event.key == 'E')
      Elevator += speed;

    if (event.key == 'q' || event.key == 'Q')
      Elevator -= speed;

    if (Elevator < 0.08)
      Elevator = 0.08;
    else if (Elevator > 178.90)
      Elevator = 178.90;

    window.animation.cam.set(mth.PointTransform(Vec3(0, Dist, 0), mth.MatrMulMatr3(mth.MatrRotateX(Elevator), mth.MatrRotateY(Azimuth), mth.MatrTranslate(window.animation.cam.at))),
      window.animation.cam.at,
      Vec3(0, 1, 0));
    if (!isA) {
      window.animation.cam.loc = mth.Vec3AddVec3(window.animation.cam.loc, mth.Vec3(8, 8, 8)), window.animation.cam.at = mth.Vec3AddVec3(window.animation.cam.at, mth.Vec3(8, 8, 8));
      window.animation.cam.set(window.animation.cam.loc, window.animation.cam.at, window.animation.cam.up);
      isA = true;
    }
  }
}