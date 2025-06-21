#version 300 es
precision highp float;

layout (location = 0) out vec4 o_color;

in vec4 drawColor;
in vec2 drawTC;
in vec3 drawNormal;
in vec3 drawWPos;

uniform samplerCube Texture0;
                         
uniform float u_time;   
uniform float Trans;   
uniform vec3 camDir;   
uniform vec3 camLoc;
uniform vec3 camRight;
uniform vec3 camUp;  

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
  o_color = vec4(1, 1, 1, 1);

  float Wp, Hp;
  float FrameW = 1900.0;
  float FrameH = 930.0;

  Wp = Hp = 0.1;
  if (FrameW > FrameH)
    Wp *= FrameW / FrameH;
  else
    Hp *= FrameH / FrameW;

  float
    xp = gl_FragCoord.x * Wp / FrameW - Wp / 2.0,
    yp = gl_FragCoord.y * Hp / FrameH - Hp / 2.0;

  vec3 D = normalize(camDir * 0.1 + camRight * xp + camUp * yp);
  o_color = vec4(drawTC, 0, 1);

  o_color = texture(Texture0, D);
}