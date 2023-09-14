'use client'
import { Stage } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { TextureLoader, MeshBasicMaterial } from 'three';

interface SceneProps {
  onChangeObject: (object: any) => void
  selectedObject: any
  texture: string
}

export const Scene = ({ onChangeObject, texture, selectedObject }: SceneProps) => {
  const { scene } = useLoader(GLTFLoader, './models/patriani_refatorado.glb')

  useEffect(() => {
    console.log(selectedObject, texture)
    if(selectedObject && texture !== '') {
      const newTexture = new TextureLoader().load(texture);
      const material = new MeshBasicMaterial({
        map: newTexture,
      });
      selectedObject['material'] = material;
      selectedObject['material'].needsUpdate = true;
    }

  }, [selectedObject, texture])

  return (
    <Stage adjustCamera intensity={1}>
      <mesh>
        <primitive onClick={(e: any) => onChangeObject(e.object)} object={scene} />
      </mesh>
    </Stage>
  )
}