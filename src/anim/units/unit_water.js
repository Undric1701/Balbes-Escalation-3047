/* AT7, 18.06, unit test sample */
import * as res from "../rnd/res/res.js"
import *  as mth from "../../mth/mth.js"

if (typeof window === 'undefined') {
    let gl = null;
}

function gridCreate(w, h, size) {
    let v = []
    for (let i = 0; i < h; i++)
        for (let j = 0; j < w; j++) {
            let vert = mth.Vertex(mth.Vec3((2 * j / (w - 1) - 1) * size, 0, (2 * i / (h - 1) - 1) * size),
                mth.Vec2(j / (w - 1) * size, i / (h - 1) * size),
                mth.Vec3(0, 1, 0),
                mth.Vec4(0.4, 0.4, 0.7, 0.7));
            v.push(vert);
            /*
            v[i * w + j].pos = Vec3Set(j, 0, i);
            v[i * w + j].normal = Vec3Set(0, 1, 0);
            v[i * w + j].T.X = (j / (W - 1.0));
            v[i * w + j].T.Y = (i / (H - 1.0));
            v[i * w + j].C = Vec4Set1(1);
            */
        }

    let ind = [];
    /* Create indices for land grid */
    for (let i = 0, k = 0; i < h - 1; i++) {
        for (let j = 0; j < w; j++) {
            ind[k++] = (i + 1) * w + j;
            ind[k++] = i * w + j;
        }
        if (i != w - 2)
            ind[k++] = -1;
    }


    return [v, ind];
}

export class Unit_Water {
    constructor(name, params) {
        this.name = name;
    };
    async init(name, params) {
        this.name = name;
        this.mtl = res.material("Water material", mth.Vec4(0.3, 0.3, 0.3, 1), mth.Vec4(0.5, 0.5, 0.5, 1), mth.Vec4(0.2, 0.2, 0.2, 0.2));
        this.mtl.trans = 0.7;
        this.mtl.shaderNo = res.getShdIdByName("samples/water");
        //this.mtl.shaderNo = await res.shdsLoad("samples/water");
        //await res.shdsLoad("samples/water").then((result) => { this.mtl.shaderNo = result });
        this.mtl.bindTex(1, res.texture("../../../../bin/textures/water/water1.png", "2d"));
        //this.mtl.bindTex(4, res.texture("../../../../bin/textures/water/water_NM.bmp", "2d"));
        //this.mtl.bindTex(5, res.texture("../../../../bin/textures/water/water_dudv.bmp", "2d"));

        let water_grid = gridCreate(128, 128, 256);

        if (typeof window === 'undefined') {
            this.water = res.prim(this.mtl, null, water_grid[0], water_grid[1]);;
        } else {
            this.water = res.prim(this.mtl, gl.TRIANGLE_STRIP, water_grid[0], water_grid[1]);
        }
    }
    close = () => {
        this.water.free();
        this.mtl.free();
    }
    response = () => {
    };
    render = () => {
        this.water.draw(mth.MatrTranslate(mth.Vec3(2 * (animation.cam.loc.x >> 1), 0, 2 * (animation.cam.loc.z >> 1))));
    }
    update = () => { }
    getData = ()  => {
        return {
            id: "water",
            name: this.name
        };
    }
}

export function unitCreate() {
    return new Unit_Water();
}