'use client'
import { Stage, useTexture } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { TextureLoader, MeshBasicMaterial } from 'three';
import { OBJECTS } from "../data/Objects"

interface SceneProps {
  onChangeObject: (object: any) => void
  selectedObject: any
  texture: any
}

export const Scene = ({ onChangeObject, texture, selectedObject }: SceneProps) => {
  const { scene } = useLoader(GLTFLoader, './models/patriani_refatorado.glb')
  const textures = useTexture({ ...texture })

  useEffect(() => {
    if(Object.keys(texture).length !== 0 && selectedObject && OBJECTS[selectedObject?.name]) {
      const newTexture = new TextureLoader().load(texture.map);
      const material = new MeshBasicMaterial({
        map: newTexture,
      });
      selectedObject['material'] = material;
      selectedObject['material'].needsUpdate = true;
    } else {
      console.log('sem texturas!')
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