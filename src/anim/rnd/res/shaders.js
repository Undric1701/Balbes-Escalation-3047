/* IK4, 16.06, shaders module */

class Shader {
  constructor(name, prog) {
    this.progId = prog;
    this.name = name;
  };

  updateData() {
    this.uniforms = {};
    let countUnif = gl.getProgramParameter(this.progId, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < countUnif; i++) {
      const info = gl.getActiveUniform(this.progId, i);
      this.uniforms[info.name] = {
        name: info.name,
        type: info.type,
        size: info.size,
        loc: gl.getUniformLocation(this.progId, info.name)
      };
    }
  }
}

export function shd(...args) {
  return new Shader(...args);
}

export let shds;
export let numOfShds;

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

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let buf = gl.getShaderInfoLog(shader);
    console.log(buf);
  }
  return shader;
}

let save_time = Date.now();

export function shdApply(shd) {
  if (shd == NULL || shd == undefined)
    return false;
  gl.useProgram(shd.progId);
  return true;
}

export async function shdsLoad(fileNamePrefix) {
  if (typeof window === 'undefined') {
    return;
  }
  console.log(`Shaders: ../../../../bin/shaders/${fileNamePrefix}/`);
  await Promise.all([tryLoadShaderAsync(`../../../../bin/shaders/${fileNamePrefix}/vert.glsl`), tryLoadShaderAsync(`../../../../bin/shaders/${fileNamePrefix}/frag.glsl`)]).then((results) => {
    const vertexSh = loadShader(gl.VERTEX_SHADER, results[0]);
    const fragmentSh = loadShader(gl.FRAGMENT_SHADER, results[1]);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexSh);
    gl.attachShader(shaderProgram, fragmentSh);
    gl.linkProgram(shaderProgram);

    let j = -1;
    for (let i = 0; i < numOfShds; i++) {
      if (shds[i].name == fileNamePrefix) {
        j = i;
      }
    }
    if (j == -1) {
      shds[numOfShds] = shd(fileNamePrefix, shaderProgram);
      shds[numOfShds].updateData();
      return numOfShds++;
    } else {
      shds[j] = shd(fileNamePrefix, shaderProgram);
      shds[j].updateData();
      return j;
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
  if (shaderNo == undefined || shaderNo instanceof Promise) {
    console.log("There is no shader to apply, applying default");
    gl.useProgram(shds[defaultShaderNo].progId);
    return false;
  } else {
    gl.useProgram(shds[shaderNo].progId);
    return true;
  }
}

export let defaultShaderNo = 0;
export let matrWLocation,
  matrVPLocation;

export function getShdIdByName(name) {
  if (typeof window === 'undefined') {
    return;
  }
  for (let i = 0; i < shds.length; i++) {
    if (shds[i].name == name)
      return i;
  }
  return defaultShaderNo;
}

export async function shadersInit() {
  shds = [];
  numOfShds = 0;
  if (typeof window === 'undefined') {
    return;
  }
  await shdsLoad("default");
  await shdsLoad("samples/water");
  await shdsLoad("skybox");
  await shdsLoad("platon");
  matrWLocation = gl.getUniformLocation(shds[0].progId, "MatrW");
}