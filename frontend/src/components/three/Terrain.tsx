import { DoubleSide, RepeatWrapping } from "three"
import { useTexture } from "@react-three/drei"
import { vertexShader, fragmentShader } from "./shader/heigthmap"

function Terrain() {
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
