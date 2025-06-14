import { shdsUpdate } from "../../anim/rnd/res/shaders.js";

export function f() {
    console.log("f");
}

let gl;

function onStart() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;

    gl.clearColor(0.30, 0.47, 0.8, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    drawScene();
}

function drawScene() {
    shdsUpdate(gl);
    window.requestAnimationFrame(drawScene);
}

window.onload = onStart();