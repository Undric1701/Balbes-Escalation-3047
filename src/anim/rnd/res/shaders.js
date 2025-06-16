/* IK4, 16.06, shaders module */

class Shader {
  constructor(name, prog) {
    this.progId = prog;
    this.name = name;
  };
}

export function shd(...args) {
  return new Shader(...args);
}

export let shds = [];
shds[0] = shdsLoad("Default");
export let defaultShaderNo = 0;
export let numOfShds = 0;

async function tryLoadShaderAsync(shaderName) {
  try {
    const response = await fetch(shaderName);
    const text = await response.text();
    return text;
  } catch (err) {
    console.log(err);
  }
}

function loadShader(type, source) {
  const shader = window.gl.createShader(type);

  window.gl.shaderSource(shader, source);
  window.gl.compileShader(shader);

  if (!window.gl.getShaderParameter(shader, window.gl.COMPILE_STATUS)) {
    let buf = window.gl.getShaderInfoLog(shader);
    console.log(buf);
  }
  return shader;
}

let save_time = Date.now();

export function shdApply(shd) {
  if (shd == NULL || shd == undefined)
    return false;
  window.gl.useProgram(shd.progId);
  return true;
}

export async function shdsLoad(fileNamePrefix) {
  console.log(`Shaders: ../../../../bin/shaders/${fileNamePrefix}/`);
  await Promise.all([tryLoadShaderAsync(`../../../../bin/shaders/${fileNamePrefix}/vert.glsl`), tryLoadShaderAsync(`../../../../bin/shaders/${fileNamePrefix}/frag.glsl`)]).then((results) => {
    const vertexSh = loadShader(window.gl, window.gl.VERTEX_SHADER, results[0]);
    const fragmentSh = loadShader(window.gl, window.gl.FRAGMENT_SHADER, results[1]);

    const shaderProgram = gl.createProgram();
    window.gl.attachShader(shaderProgram, vertexSh);
    window.gl.attachShader(shaderProgram, fragmentSh);
    window.gl.linkProgram(shaderProgram);

    let j = -1;
    for (let i = 0; i < numOfShds; i++) {
      if (shds[i].name == fileNamePrefix) {
        j = i;
      }
    }
    if (j == -1) {
      return shds[numOfShds++] = shd(fileNamePrefix, shaderProgram);
    } else {
      return shds[j] = shd(fileNamePrefix, shaderProgram);
    }
  });
}

export function shdsUpdate() {
  let t = Date.now();

  if (t - save_time > 1000) {
    shdsLoad("default");

    console.log("Updating shaders");
    save_time = t;
  }
}

export function shaderApply(shaderNo) {
  if (shaderNo != undefined) {
    window.gl.useProgram(shds[shaderNo].progId);
  } else {
    console.log("there is no shader to apply, applying default");
    window.gl.useProgram(shds[defaultShaderNo].progId);
  }

}