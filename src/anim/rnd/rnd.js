/* 14.06.2025, render module */
import * as shd from "./res/shaders.js"

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
        await shd.shadersInit();
    }
    renderStart = () => {
        let gl = window.gl;
        gl.clearColor(0.30, 0.47, 0.8, 1.0);
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT);
        console.log("Render start");
    }
    renderEnd = () => {
        console.log("Render end");
    }
    renderResize = (w, h) => {
        this.w = w;
        this.h = h;
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
    await shd.shadersInit();
}