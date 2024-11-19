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

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <Grid scale={100} />

      <CameraControls />
      <Box args={[100, 294, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" color="blue" />
      </Box>
    </Canvas>
  )
}

export default Scene
