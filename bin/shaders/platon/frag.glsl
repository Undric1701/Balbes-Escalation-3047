#version 300 es

precision highp float;
out vec4 o_color;
in vec4 drawColor;

void main() {
  o_color = drawColor;
}