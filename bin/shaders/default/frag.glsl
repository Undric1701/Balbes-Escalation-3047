#version 300 es
precision highp float;

layout (location = 0) out vec4 o_color;

in vec4 drawColor;
in vec2 drawTC;
in vec3 drawNormal;
in vec3 drawWPos;

uniform sampler2D TKd;

uniform float u_time;   
uniform vec3 camDir;   
uniform vec3 camLoc;   

void main() {         
    vec3 V = normalize(drawWPos - camLoc);
    vec3 N = -faceforward(drawNormal, V, drawNormal);
    float nl = max(0.1, max(dot(N, -camDir), dot(N, camDir)));
    o_color = vec4(drawColor.rgb * nl, drawColor.a); 
    o_color = vec4(N, 1);  
    o_color = vec4(drawNormal, 1); 
    o_color  = texture(TKd, drawTC);
    //o_color += tex_color.rgb;
    //o_color = vec4(normalize(drawWPos), 1);
}