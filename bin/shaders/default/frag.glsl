#version 300 es
precision highp float;

layout (location = 0) out vec4 o_color;

in vec4 drawColor;
in vec2 drawTC;
in vec3 drawNormal;
in vec3 drawWPos;

uniform sampler2D Texture0;
uniform sampler2D Texture1;
uniform sampler2D Texture2;
uniform sampler2D Texture3;
uniform sampler2D Texture4;
                         
/*
uniform bool IsTexture0;
uniform bool IsTexture1;
uniform bool IsTexture2;
uniform bool IsTexture3;
uniform bool IsTexture4;
uniform bool IsTexture5;
uniform bool IsTexture6;
uniform bool IsTexture7;   
*/

uniform float u_time;   
uniform vec3 camDir;   
uniform vec3 camLoc;  

vec3 Shade( vec3 P, vec3 N, vec3 Kd, vec3 Ks, float Ph, vec3 LDir, vec3 LColor )
{
  vec3 color = vec3(0);
  vec3 V = normalize(P - camLoc);
  //N = faceforward(N, V, N);
                                 
  // Diffuse
  color += max(0.0, dot(N, LDir)) * Kd * LColor;
  // Specular
  vec3 R = reflect(V, N);
  color += pow(max(0.0, dot(R, LDir)), Ph) * Ks * LColor;
  //return N;
  
  return color;
}   

void main() {         
    vec3 V = normalize(drawWPos - camLoc);
    vec3 N = -faceforward(drawNormal, V, drawNormal);
    vec4 ka = texture(Texture0, drawTC),
         kd = texture(Texture1, drawTC),
         ks = texture(Texture2, drawTC);
    float nl = max(0.1, dot(N, -camDir));
    o_color = vec4(drawColor.rgb * nl, drawColor.a); 
    //o_color = vec4(N, 1);  
    //o_color = vec4(drawNormal, 1); 
    //o_color  = vec4(texture(Texture1, drawTC).rgb, 1);
                          
    o_color = vec4(Shade(drawWPos, N, kd.rgb, ks.rgb, ks.a, vec3(-1.0), vec3(1.0)), kd.a);
    //o_color = vec4(drawNormal, 1);
    //o_color = vec4(drawTC, 0, 1);
    
    //o_color += tex_color.rgb;
    //o_color = vec4(normalize(drawWPos), 1);
}