import * as mth from "../../mth/mth.js"
import * as res from "../rnd/res/res.js"

export class UnitSkybox {

  constructor(name, params) {
    this.name = name;
  };

  async init() {
    let skyshader = res.getShdIdByName("skybox");
    let skyMtl = res.material("Skybox material", mth.Vec4(0.3, 0.3, 0.3, 1), mth.Vec4(0.5, 0.5, 0.5, 1), mth.Vec4(0.2, 0.2, 0.2, 0.2), skyshader);
    skyMtl.bindTex(0, res.texture(res.texCreateCubeMap("../../../../bin/textures/SkyBloody", "cube")));//tex.texCreateCubeMap("bin/textures/skyboxes/SkyLand", "bmp");
    let points = [
      mth.Vec3(-1, -1, 0.99999),
      mth.Vec3(3, -1, 0.99999),
      mth.Vec3(-1, 3, 0.99999),
    ];
    let normals = new Array(points.length).fill(mth.Vec3(0, 0, 0));
    let color = new Array(points.length).fill(mth.Vec4(0, 0, 0, 0));
    let texCoords = [mth.Vec2(1, 0), mth.Vec2(0, 1), mth.Vec2(1, 1)];
    let vertices = mth.VertexList(points, texCoords, color, normals);
    let ind = [0, 1, 2];
    if (typeof window === 'undefined') {
      this.prim = res.prim(skyMtl, null, vertices, ind);
    } else {
      this.prim = res.prim(skyMtl, gl.TRIANGLES, vertices, ind);
    }
  }

  close = () => {
  };

  response() {
  };

  render() {
    window.gl.depthMask(false);
    this.prim.draw(mth.MatrInverse(window.animation.cam.matrVP));
    window.gl.depthMask(true);
  }
  update = () => { }
}

export function unitCreate(name, params) {
  return new UnitSkybox(name, params);
}