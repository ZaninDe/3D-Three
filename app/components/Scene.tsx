'use client'
import { Stage } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface SceneProps  {
  onChangeObject: (object: any) => void
  texture: string
}

export const Scene = ({ onChangeObject, texture }: SceneProps) => {
  const { scene } = useLoader(GLTFLoader, './models/patriani_refatorado.glb')

  const changeColor = (object: any) => {
    console.log(object)
  }

  return (
    <Stage adjustCamera intensity={1}>
      <mesh>
        <primitive onClick={(e: any) => onChangeObject(e.object)} object={scene} />
      </mesh>
    </Stage>
  )
}