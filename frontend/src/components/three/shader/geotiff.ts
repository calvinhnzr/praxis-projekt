export const vertexShader = `
precision mediump float;

// Uniforms passed from JavaScript
uniform sampler2D u_heightmap; // The heightmap texture (converted from GeoTIFF to PNG)
uniform vec2 u_resolution; // Resolution of the canvas
uniform float u_scale; // Scaling factor for height

// Varying for passing data to the fragment shader
varying vec2 v_uv;

void main() {
  // Calculate vertex position based on heightmap
  v_uv = uv;
  vec4 heightData = texture2D(u_heightmap, v_uv);
  float height = heightData.r * u_scale; // Assuming grayscale heightmap

  vec3 pos = position;
  pos.z = height; // Apply height to z-coordinate

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

export const fragmentShader = `
precision mediump float;

// Varying from the vertex shader
varying vec2 v_uv;

// Uniforms for lighting (example)
uniform vec3 u_lightDirection;
uniform vec3 u_lightColor;
uniform sampler2D u_heightmap;

void main() {
  // Simple lighting calculation
  vec3 normal = normalize(vec3(v_uv * 2.0 - 1.0, 1.0)); // Approximate normal
  float lightIntensity = max(dot(normal, u_lightDirection), 0.0);

  // Output color based on height and lighting
  vec4 heightData = texture(u_heightmap, v_uv);
  float height = heightData.r;

  // Apply a fixed color based on height thresholds
  vec3 color;

  // Apply lighting
  color = color * lightIntensity * u_lightColor;

  gl_FragColor = vec4(color, 1.0);
}
`
