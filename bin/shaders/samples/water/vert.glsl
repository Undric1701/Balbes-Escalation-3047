#version 300 es
precision highp float;
uniform mat4 matrWVP;
uniform mat4 matrW;
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

    pos.y += 0.18 * sin(inPosition.x - inPosition.y + u_time);
    pos.xz += 0.08 * vec2(sin(inPosition.x + 2.0 * u_time), cos(inPosition.z - 3.0 * u_time));
    gl_Position = matrWVP * vec4(pos, 1);
    drawColor = inColor;
    drawNormal = normalize(mat3(matrInv) * inNormal);
    drawWPos = (matrW * vec4(inPosition, 1)).xyz; 
    drawTC = inTexCoord;
    //drawColor = vec4(normalize(drawTC), 1, 1);
    //drawColor = vec4(normalize(drawWPos), 1);
    //gl_Position = vec4(a_pos, 1);
}