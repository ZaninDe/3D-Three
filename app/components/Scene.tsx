'use client'
import { Stage } from "@react-three/drei"
import { Model } from "./Model"

export const Scene = () => {
  return (
    <Stage adjustCamera intensity={1}>
      <mesh>
        <Model />
      </mesh>
    </Stage>
  )
}