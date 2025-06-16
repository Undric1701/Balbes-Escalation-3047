#version 300 es

precision highp float;
layout(location = 0) in vec3 in_pos;
layout(location = 1) in vec4 in_color;
layout(location = 2) in vec3 in_normal;        
out vec4 draw_color;
uniform mat4 matrWVP;
uniform mat4 matrW;
uniform mat4 matrInv;
uniform vec3 camDir;
uniform vec3 camLoc;

void main() {
    gl_Position = matrWVP * vec4(in_pos, 1);
    vec3 v = normalize(mat3(matrInv) * in_pos - camLoc);
    vec3 n = normalize(in_normal);
    n = faceforward(n, v, n);
    draw_color = vec4(in_color.rgb * max(0.47, dot(n, normalize(-camDir))), 1);
}