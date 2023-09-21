'use client'
import { Stage, useGLTF, useTexture } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { TextureLoader, MeshBasicMaterial, RepeatWrapping, BoxGeometry, Mesh } from 'three';
import { OBJECTS } from "../data/Objects"

interface SceneProps {
  onChangeObject: (e: any) => void
  customObject: any
  selectedObject: any
  texture: any
}

export const Scene = ({ onChangeObject, texture, selectedObject, customObject }: SceneProps) => {
  const { scene, nodes } = useLoader(GLTFLoader, './models/patriani_refatorado.glb')
  // const newObject = useGLTF('/models/futuristic_faucet.glb')
  const newObject = useGLTF('/models/modern_kitchen_tap.glb')
  
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

  const handleClick = (e: any) => {
    const currentObj = e.object
    if(currentObj.name === 'mesh_57') {
      scene.add(newObject.scene)
      currentObj.parent.remove(currentObj)
      newObject.scene.position.set(3.5, 0.6, -3.3)
      newObject.scene.rotation.set(0, 0.5, 0);
      newObject.scene.scale.set(0.7, 0.7, 0.7);
      
      // newObject.scene.position.set(3.5, 0.61, -3.3)
      // newObject.scene.rotation.set(0, 2.2, 0);
      // newObject.scene.scale.set(0.01, 0.01, 0.01);
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
        <primitive onClick={(e: any) => handleClick(e)} object={scene} />
      </mesh>
    </Stage>
  )
}