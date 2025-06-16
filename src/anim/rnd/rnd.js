/* 14.06.2025, render module */

export class Render {
    constructor() {
    }
    init = () => {
        let webgl_canvas = document.getElementById("webgl-canvas");
        this.gl = webgl_canvas.getContext("webgl2");
        this.gl.viewportWidth = canvas.width;
        this.gl.viewportHeight = canvas.height;
        this.W = canvas.width;
        this.H = canvas.height;
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }
    renderStart = () => {
        console.log("Render start");
    }
    renderEnd = () => {
        console.log("Render end");
    }
}