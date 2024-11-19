import * as THREE from "three"

import { DoubleSide, RepeatWrapping } from "three"
import { useLoader } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import { vertexShader, fragmentShader } from "./shader/geotiff"

// const heightMap = useTexture("./textures/gm1.png")

export const GDALTerrain = ({ heightmap }) => {
  return (
    <mesh>
      <planeGeometry args={[10, 10, 512, 512]} />
      <shaderMaterial
        uniforms={{
          u_heightmap: { value: heightmap },
          u_resolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
          },
          u_scale: { value: 1.0 }, // Adjust as needed
          u_lightDirection: { value: new THREE.Vector3(1, 1, 1) },
          u_lightColor: { value: new THREE.Vector3(1, 1, 1) },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe={true}
      />
    </mesh>
  )
}
