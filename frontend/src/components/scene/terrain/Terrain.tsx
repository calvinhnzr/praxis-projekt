import * as THREE from "three"
import { DoubleSide, RepeatWrapping } from "three"
import { useTexture } from "@react-three/drei"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"

export const vertexShader = `
// Uniforms are data that are shared between shaders
// They contain data that are uniform across the entire frame.
// The heightmap and scaling constant for each point are uniforms in this respect.

// A uniform to contain the heightmap image
uniform sampler2D bumpTexture;
// A uniform to contain the scaling constant
uniform float bumpScale;
// Uniforms to contain the minimum and maximum heights
uniform float minHeight;
uniform float maxHeight;

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

    // Calculate the height using minHeight and maxHeight
    float height = minHeight + vAmount * (maxHeight - minHeight);

    // move the position along the normal
    vec3 newPosition = position + normal * height;

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

export function Image() {
  const texture = useLoader(
    THREE.TextureLoader,
    "./elevation/heightmap/gm-128-albedo.png"
  )
  return (
    <mesh
      position={[0, -10, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      // scale={[1 / 1024, 1 / 1024, 1 / 1024]}
      // scale={[0.496, 0.496, 0.496]} // 1:1 scale
    >
      <planeGeometry attach="geometry" args={[1500, 1500, 256, 256]} />
      <meshBasicMaterial attach="material" map={texture} opacity={0.3} />
    </mesh>
  )
}

export function Terrain() {
  // Load the heightmap image
  const heightMap = useTexture("./elevation/heightmap/gm-128-heightmap.png")
  // const heightMap = useTexture("./elevation/heightmap/ss-gm.png")

  // Apply some properties to ensure it renders correctly
  heightMap.colorSpace = "srgb"
  heightMap.wrapS = RepeatWrapping
  heightMap.wrapT = RepeatWrapping
  heightMap.anisotropy = 16

  const minHeight = 0
  const maxHeight = 314.758
  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      // scale={[3.027, 3.027, 3.027]}
    >
      <planeGeometry args={[1500, 1500, 256, 256]} />
      <shaderMaterial
        wireframe={true}
        uniforms={{
          // Feed the heightmap
          bumpTexture: { value: heightMap },
          // Feed the scaling constant for the heightmap
          bumpScale: { value: 10 },
          minHeight: { value: minHeight },
          maxHeight: { value: maxHeight },
        }}
        // Feed the shaders as strings
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={DoubleSide}
      />
    </mesh>
  )
}
export default Terrain
