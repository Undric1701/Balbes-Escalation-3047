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

uniform float u_time;   
uniform vec3 camDir;   
uniform vec3 camLoc;  

vec3 Shade( vec3 P, vec3 N, vec3 Kd, vec3 Ks, float Ph, vec3 LDir, vec3 LColor )
{
  vec3 color = vec3(0);
  vec3 V = normalize(P - camLoc);
  //N = faceforward(N, V, N);
  
  // Diffuse
  /*color += max(0, dot(N, LDir)) * Kd * LColor;
  // Specular
  vec3 R = reflect(V, N);
  color += pow(max(0, dot(R, LDir)), Ph) * Ks * LColor;
  //return N;
  */
  return color;
}   

void main() {         
    vec3 V = normalize(drawWPos - camLoc);
    vec3 N = -faceforward(drawNormal, V, drawNormal);
    float nl = max(0.1, max(dot(N, -camDir), dot(N, camDir)));
    o_color = vec4(drawColor.rgb * nl, drawColor.a); 
    //o_color = vec4(N, 1);  
    //o_color = vec4(drawNormal, 1); 
    o_color  = vec4(texture(Texture1, drawTC).rgb, 1);
    //o_color = vec4(drawTC, 0, 1);
    
    //o_color += tex_color.rgb;
    //o_color = vec4(normalize(drawWPos), 1);
}