import React, { useRef, useState, Suspense } from "react"
import * as THREE from "three"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import {
  Box,
  CameraControls,
  PerspectiveCamera,
  Stage,
} from "@react-three/drei"

import Terrain from "./Terrain"

function Image() {
  const texture = useLoader(THREE.TextureLoader, "./textures/gm-x13-albedo.png")
  return (
    <mesh
      position={[0, -10, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      // scale={[1 / 1024, 1 / 1024, 1 / 1024]}
      // scale={[0.496, 0.496, 0.496]} // 1:1 scale
      scale={[5.96, 5.96, 5.96]}
    >
      <planeGeometry attach="geometry" args={[1024, 1024, 256, 256]} />
      <meshBasicMaterial attach="material" map={texture} opacity={0.3} />
    </mesh>
  )
}

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <Stage>
        <Suspense fallback={null}>
          <group>
            <Image />
            <Terrain />
          </group>
          {/* <ambientLight /> */}
        </Suspense>
      </Stage>

      <CameraControls />
      <Box args={[100, 373, 100]} position={[-1400, 140, 1000]}>
        <meshStandardMaterial attach="material" color="blue" />
      </Box>
    </Canvas>
  )
}

export default Scene
