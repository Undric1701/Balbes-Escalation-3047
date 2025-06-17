#version 300 es
precision highp float;

layout (location = 0) out vec4 o_color;

in vec4 drawColor;
in vec3 drawNormal;
in vec3 drawWPos;


uniform float u_time;
uniform float FrameW;
uniform float FrameH;   
uniform vec3 CamDir;   
uniform vec3 CamLoc;   



void main() {         
    vec3 V = normalize(drawWPos - CamLoc);
    vec3 N = -faceforward(drawNormal, V, drawNormal);
    float nl = max(0.1, max(dot(N, -CamDir), dot(N, CamDir)));
    o_color = vec4(drawColor.rgb * nl, drawColor.a); 
    //o_color = vec4(N, 1);  
    //o_color = vec4(drawNormal, 1); 
    //o_color = vec4(normalize(drawWPos), 1);
}