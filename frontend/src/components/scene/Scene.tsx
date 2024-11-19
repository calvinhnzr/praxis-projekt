import React, { useRef, useState, Suspense, memo } from "react"
import * as THREE from "three"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import {
  Box,
  CameraControls,
  MapControls,
  PerspectiveCamera,
  Plane,
  Stage,
  Grid,
  Center,
  GizmoHelper,
  GizmoViewport,
  AccumulativeShadows,
  RandomizedLight,
  OrthographicCamera,
  OrbitControls,
  Environment,
  useGLTF,
  BakeShadows,
} from "@react-three/drei"

import SpruceTree from "./models/SpruceTree"

import { useControls, Leva } from "leva"

export const Scene = () => {
  const { gridSize, ...gridConfig } = useControls({
    gridSize: [10, 10],
    cellSize: { value: 1.2, min: 0, max: 10, step: 0.6 },
    cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
    cellColor: "#6f6f6f",
    sectionSize: { value: 1.2 * 5, min: 0, max: 10, step: 0.6 },
    sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
    sectionColor: "#cd4d4d",
    fadeDistance: { value: 200, min: 0, max: 100, step: 1 },
    fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    followCamera: false,
    infiniteGrid: true,
  })

  return (
    <Canvas
      shadows
      // orthographic
      camera={{
        // position: [0, 12, 0],
        position: [10, 12, 12],
        rotation: [-Math.PI / 2, 0, 0],
        fov: 25,
        // zoom: 100,
      }}
    >
      <mesh position={[6, 3.62 / 2, 0]} castShadow visible={true}>
        <boxGeometry args={[6, 3.62, 8.525]} />
        <meshStandardMaterial color="cornflowerblue" />
      </mesh>

      <SpruceTree position={[-2, 0, 0]} scale={0.2} />

      <group position={[3, 0, 0.6]} visible={false}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6, 1.2]} />
          <meshStandardMaterial color="#CED8F7" />
        </mesh>
      </group>

      <group>
        {/* <Leva hidden /> */}
        <MapControls
          enableRotate={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />

        <Environment preset="city" />
      </group>

      <group>
        <group visible={false}>
          <Center top position={[-2, 0, 2]}>
            <mesh castShadow>
              <sphereGeometry args={[0.5, 64, 64]} />
              <meshStandardMaterial color="coral" />
            </mesh>
          </Center>

          <Center top position={[2.5, 0, 2]}>
            <mesh castShadow rotation={[0, Math.PI / 4, 0]}>
              <boxGeometry args={[0.7, 0.7, 0.7]} />
              <meshStandardMaterial color="cornflowerblue" />
            </mesh>
          </Center>
        </group>
        <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />
        <Shadows />
      </group>
    </Canvas>
  )
}

const Shadows = memo(() => (
  <AccumulativeShadows
    temporal
    frames={100}
    color="#9d4b4b"
    colorBlend={0.5}
    alphaTest={0.9}
    scale={100}
  >
    <RandomizedLight
      // intensity={3}
      amount={8}
      radius={4}
      position={[5, 5, -10]}
    />
  </AccumulativeShadows>
))
