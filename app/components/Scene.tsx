'use client'
import { Stage, useTexture } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { useEffect, useLayoutEffect, useState } from "react"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { TextureLoader, MeshBasicMaterial, MeshStandardMaterial } from 'three';
import { OBJECTS } from "../data/Objects"
import { color } from "framer-motion"

interface SceneProps {
  onChangeObject: (object: any) => void
  selectedObject: any
  texture: any
}

export const Scene = ({ onChangeObject, texture, selectedObject }: SceneProps) => {
  const { scene, nodes } = useLoader(GLTFLoader, './models/patriani_refatorado.glb')
  const textures = useTexture({ ...texture })
  console.log(nodes)

  useEffect(() => {
    if(Object.keys(texture).length !== 0 && selectedObject && OBJECTS[selectedObject?.name]) {
      const newTexture = new TextureLoader().load(texture.roughnessMap);
      const material = new MeshBasicMaterial({
        map: newTexture,
      });
      selectedObject['material'] = material;
      selectedObject['material'].needsUpdate = true;
    }
  }, [selectedObject, texture])

  // useLayoutEffect(() => {
  //   if (selectedObject) {
  //     const newMaterial = new MeshStandardMaterial({
  //       ...nodes[selectedObject?.name].material,
  //       ...textures,
  //       color,
  //     })

  //     nodes[selectedObject?.name].material = newMaterial
  //   }
  // }, [scene, nodes, texture, textures, selectedObject])

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