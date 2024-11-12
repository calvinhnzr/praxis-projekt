export const vertexShader = `
// Uniforms are data that are shared between shaders
// They contain data that are uniform across the entire frame.
// The heightmap and scaling constant for each point are uniforms in this respect.

// A uniform to contain the heightmap image
uniform sampler2D bumpTexture;
// A uniform to contain the scaling constant
uniform float bumpScale;

// Varyings are variables whose values are decided in the vertex shader
// But whose values are then needed in the fragment shader

// A variable to store the height of the point
varying float vAmount;
// The UV mapping coordinates of a vertex
varying vec2 vUV;

void main()
{
    // The "coordinates" in UV mapping representation
    vUV = uv;

    // The heightmap data at those coordinates
    vec4 bumpData = texture2D(bumpTexture, uv);

    // height map is grayscale, so it doesn't matter if you use r, g, or b.
    vAmount = bumpData.r;

    // move the position along the normal
    vec3 newPosition = position + normal * bumpScale * vAmount;

    // Compute the position of the vertex using a standard formula
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`

export const fragmentShader = `
varying vec2 vUV;
varying float vAmount;

void main()
{
    // Blend light green with white based on the height value (vAmount)
    vec4 lightGreen = vec4(0.6, 1.0, 0.6, 1.0);
    vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
    vec4 color = mix(lightGreen, white, vAmount);

    // Set the color
    gl_FragColor = color;
}
`
