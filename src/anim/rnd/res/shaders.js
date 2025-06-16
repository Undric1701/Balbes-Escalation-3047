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

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let buf = gl.getShaderInfoLog(shader);
    console.log(buf);
  }
  return shader;
}

let save_time = Date.now();

export function shdApply(gl, shd) {
  if (shd == NULL || shd == undefined)
    return false;
  gl.useProgram(shd.progId);
  return true;
}

export function shdsLoad(gl, fileNamePrefix) {
  console.log(`Shaders: ../../../../bin/shaders/${fileNamePrefix}/`);
  Promise.all([tryLoadShaderAsync(`../../../../bin/shaders/${fileNamePrefix}/vert.glsl`), tryLoadShaderAsync(`../../../../bin/shaders/${fileNamePrefix}/frag.glsl`)]).then((results) => {
    const vertexSh = loadShader(gl, gl.VERTEX_SHADER, results[0]);
    const fragmentSh = loadShader(gl, gl.FRAGMENT_SHADER, results[1]);

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
      return shds[numOfShds++] = shd(fileNamePrefix, shaderProgram);
    } else {
      return shds[j] = shd(fileNamePrefix, shaderProgram);
    }
  });
}

export function shdsUpdate(gl) {
    let t = Date.now();

    if (t - save_time >  1000)
    {
        shdsLoad(gl,"default");

        console.log("Updating shaders");
        save_time = t;
    }
}