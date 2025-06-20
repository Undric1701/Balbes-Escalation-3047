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
                         
uniform float u_time;   
uniform float Trans;   
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
    o_color = vec4(1, 1, 1, 1);
}

/*layout(location = 0) out vec4 OutColor;

in vec3 DrawPos;
in vec2 DrawTexCoord;
in vec3 DrawNormal;
in vec4 DrawColor;
*/
/*uniform float ProjSize, ProjDist;
uniform float FrameW, FrameH;

uniform vec3 CamDir, CamUp, CamRight, CamLoc, CamAt;

uniform sampler2D Tex0;
uniform bool IsTexture0;

uniform samplerCube Tex;

void main( void )
{
  float Wp, Hp;
  
  Wp = Hp = ProjSize;
  if (FrameW > FrameH)
    Wp *= FrameW / FrameH;
  else
    Hp *= FrameH / FrameW;
 
  float
    xp = gl_FragCoord.x * Wp / FrameW - Wp / 2.0,
    yp = gl_FragCoord.y * Hp / FrameH - Hp / 2.0;
 
  vec3 D = normalize(CamDir * ProjDist + CamRight * xp + CamUp * yp);
  
  OutColor = texture(Tex, D);
}
*/
