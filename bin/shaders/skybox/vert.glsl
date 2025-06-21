#version 300 es
precision highp float;
uniform mat4 matrWVP;
uniform mat4 matrW;
uniform mat4 matrVP;
uniform mat4 matrInv;
uniform float u_time;   

layout (location = 0) in vec3 inPosition;
layout (location = 1) in vec2 inTexCoord;
layout (location = 2) in vec3 inNormal;                
layout (location = 3) in vec4 inColor;

out vec4 drawColor;
out vec2 drawTC;
out vec3 drawNormal;
out vec3 drawWPos;


void main() {                   
    vec3 pos = inPosition;
    gl_Position = vec4(pos, 1);
    drawColor = inColor;
    drawNormal = normalize(mat3(matrInv) * inNormal);
    drawWPos = (matrW * vec4(inPosition, 1)).xyz; 
    drawTC = inTexCoord;
}
