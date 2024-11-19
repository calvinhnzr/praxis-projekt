import React, { useRef, useState, Suspense } from "react"
import * as THREE from "three"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import {
  Box,
  CameraControls,
  PerspectiveCamera,
  Plane,
  Stage,
  Grid,
} from "@react-three/drei"
import { useControls } from "leva"

const Scene = () => {
  const { gridSize, ...gridConfig } = useControls({
    gridSize: [10.5, 10.5],
    cellSize: { value: 0.5, min: 0, max: 10, step: 0.1 },
    cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
    cellColor: "#6f6f6f",
    sectionSize: { value: 3, min: 0, max: 10, step: 0.1 },
    sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
    sectionColor: "#cd4d4d",
    fadeDistance: { value: 25, min: 0, max: 100, step: 1 },
    fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    followCamera: false,
    infiniteGrid: true,
  })

  return (
    <Canvas shadows camera={{ position: [10, 12, 12], fov: 25 }}>
      <ambientLight intensity={Math.PI / 2} />
      <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />

      <CameraControls />
      <group>
        <Plane args={[1, 1]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#CED8F7" />
        </Plane>
      </group>
    </Canvas>
  )
}

export default Scene
