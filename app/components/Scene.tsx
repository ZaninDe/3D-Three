'use client'
import { Stage, useTexture } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { TextureLoader, MeshBasicMaterial, RepeatWrapping, BoxGeometry, Mesh } from 'three';
import { OBJECTS } from "../data/Objects"

interface SceneProps {
  onChangeObject: (object: any) => void
  selectedObject: any
  texture: any
}

export const Scene = ({ onChangeObject, texture, selectedObject }: SceneProps) => {
  const { scene, nodes } = useLoader(GLTFLoader, './models/patriani_refatorado.glb')
  

  function replaceNode(object: any) {
    const nodeToReplace = object;
    if (nodeToReplace) {
      nodeToReplace.parent.remove(nodeToReplace);
      const newNode = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0xff0000 }));
      newNode.position.copy(nodeToReplace.position);
      newNode.rotation.copy(nodeToReplace.rotation);
      scene.add(newNode);
    }
  }
  
  useEffect(() => {
    if(selectedObject && texture) {
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


  return (
    <Stage adjustCamera intensity={1}>
      <mesh>
        <primitive onClick={(e: any) => onChangeObject(e.object)} object={scene} />
      </mesh>
    </Stage>
  )
}