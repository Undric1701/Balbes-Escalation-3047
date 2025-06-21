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
    vec3 pos = (matrW * vec4(inPosition, 1)).xyz;

    pos.y += 0.06 * sin(pos.x * 2.8 - pos.z * 4.2 + u_time * 4.7);
    pos.y += 0.03 * cos(-pos.x * 2.8 + pos.z * 4.2 + u_time * 6.3);

    pos.xz += 0.1 * vec2(sin(inPosition.x + 4.7 * u_time), cos(inPosition.z - 3.0 * u_time));
    gl_Position = matrVP * vec4(pos, 1);
    drawColor = inColor;
    drawNormal = normalize(mat3(matrInv) * inNormal);
    drawWPos = (matrW * vec4(inPosition, 1)).xyz; 
    drawTC = inTexCoord;
    drawColor = vec4(0.5, 0.7, 0.8, 1);
    //drawColor = vec4(normalize(drawTC), 1, 1);
    //drawColor = vec4(normalize(drawWPos), 1);
    //gl_Position = vec4(a_pos, 1);
}