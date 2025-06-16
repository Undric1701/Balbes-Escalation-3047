#version 300 es

precision highp float;
out vec4 o_color;
in vec4 draw_color;

void main() {
  o_color = draw_color;
}