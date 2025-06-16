/* IK4, 16.06, shaders module */

class Shader {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  };
}

export function shd(...args) {
  return new Shader(...args);
}

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

export function shdsUpdate(gl) {
  let t = Date.now();

  if (t - save_time > 1000) {
    Promise.all([tryLoadShaderAsync("../../../../bin/shaders/vert.glsl"), tryLoadShaderAsync("../../../../bin/shaders/frag.glsl")]).then((results) => {
      const vertexSh = loadShader(gl, gl.VERTEX_SHADER, results[0]);
      const fragmentSh = loadShader(gl, gl.FRAGMENT_SHADER, results[1]);

      const shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexSh);
      gl.attachShader(shaderProgram, fragmentSh);
      gl.linkProgram(shaderProgram);
    });

    console.log("Updating shaders");
    save_time = t;
  }
}