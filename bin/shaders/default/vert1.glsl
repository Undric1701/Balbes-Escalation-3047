#version 300 es
precision highp float;
uniform mat4 MatrVP;
uniform mat4 MatrW;

layout (location = 0) in vec3 inPosition;
layout (location = 1) in vec4 inColor;
layout (location = 2) in vec3 inNormal;                

out vec4 drawColor;
out vec3 drawNormal;
out vec3 drawWPos;


void main() {
    gl_Position = MatrVP * MatrW * vec4(inPosition, 1);
    drawColor = inColor;
    drawNormal = mat3(inverse(transpose(MatrW))) * inNormal;
    drawWPos = (MatrW * vec4(inPosition, 1)).xyz; 
    drawColor = vec4(normalize(drawWPos), 1);
    //gl_Position = vec4(a_pos, 1);
}