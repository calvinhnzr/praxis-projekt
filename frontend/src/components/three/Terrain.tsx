import { useRef } from "react"

import { DoubleSide, RepeatWrapping } from "three"
import { useTexture } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { vertexShader, fragmentShader } from "./shader/shader"

function Terrain() {
  // Load the heightmap image
  const heightMap = useTexture("./textures/gm-x13-heightmap.png")
  // Apply some properties to ensure it renders correctly
  heightMap.colorSpace = "srgb"
  heightMap.wrapS = RepeatWrapping
  heightMap.wrapT = RepeatWrapping
  heightMap.anisotropy = 16
  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      // scale={[1 / 1024, 1 / 1024, 1 / 1024]}
      scale={[5.96, 5.96, 5.96]}
    >
      <planeGeometry args={[1024, 1024, 256, 256]} />
      <shaderMaterial
        wireframe={true}
        uniforms={{
          // Feed the heightmap
          bumpTexture: { value: heightMap },
          // Feed the scaling constant for the heightmap
          bumpScale: { value: 248.618 / 5.96 },
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
