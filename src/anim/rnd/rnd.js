/* 14.06.2025, render module */
import * as res from "./res/res.js"

export class Render {
    constructor() {
        let webgl_canvas = document.getElementById("webgl-canvas");
        this.gl = webgl_canvas.getContext("webgl2");
        this.gl.viewportWidth = webgl_canvas.width;
        this.gl.viewportHeight = webgl_canvas.height;
        this.W = webgl_canvas.width;
        this.H = webgl_canvas.height;
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        if (window.gl == undefined) {
            window.gl = this.gl;
        }
    }
    async finishInit() {
        await res.shadersInit();
        await res.materialsInit();
    }
    renderStart = () => {
        let gl = window.gl;
        gl.clearColor(0.30, 0.47, 0.8, 1.0);
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    renderEnd = () => {
    }
    renderResize = (w, h) => {
        this.w = w;
        this.h = h;
        animation.cam.setSize(w, h);
    }
}
export async function renderInit(render) {
    let webgl_canvas = document.getElementById("webgl-canvas");
    render.gl = webgl_canvas.getContext("webgl2");
    render.gl.viewportWidth = webgl_canvas.width;
    render.gl.viewportHeight = webgl_canvas.height;
    render.W = webgl_canvas.width;
    render.H = webgl_canvas.height;
    render.gl.enable(render.gl.DEPTH_TEST);
    render.gl.blendFunc(render.gl.SRC_ALPHA, render.gl.ONE_MINUS_SRC_ALPHA);
    if (window.gl == undefined) {
        window.gl = render.gl;
    }
    await res.shadersInit();
}