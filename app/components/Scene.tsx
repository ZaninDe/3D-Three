'use client'
import { Stage, useTexture } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { useEffect, useLayoutEffect, useState } from "react"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { TextureLoader, MeshBasicMaterial, RepeatWrapping } from 'three';
import { OBJECTS } from "../data/Objects"

interface SceneProps {
  onChangeObject: (object: any) => void
  selectedObject: any
  texture: any
}

export const Scene = ({ onChangeObject, texture, selectedObject }: SceneProps) => {
  const { scene, nodes } = useLoader(GLTFLoader, './models/patriani_refatorado.glb')

  useEffect(() => {
    if(selectedObject && texture) {
      console.log(texture)
      const newTexture = new TextureLoader().load(texture);
      newTexture.repeat.set(8, 8);
      newTexture.wrapS = RepeatWrapping;
      newTexture.wrapT = RepeatWrapping;

      const material = new MeshBasicMaterial({
        map: newTexture,
      });
      selectedObject['material'] = material;
      selectedObject['material'].needsUpdate = true;
    }
  }, [selectedObject, texture])

  useEffect(() => {
    console.log(selectedObject?.name)
  },[selectedObject, nodes])

  return (
    <Stage adjustCamera intensity={1}>
      <mesh>
        <primitive onClick={(e: any) => onChangeObject(e.object)} object={scene} />
      </mesh>
    </Stage>
  )
}