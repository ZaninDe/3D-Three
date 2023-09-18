'use client'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Mesh, Color, TextureLoader, MeshBasicMaterial } from 'three';
import { OBJECTS } from '../data/Objects';

export const Model = () => {
  const modelRef = useRef<Mesh>();
  const [model, setModel] = useState<Mesh | undefined>(undefined);
  const { scene, nodes, materials } = useLoader(GLTFLoader, './models/patriani_refatorado.glb')
  const [textures, setTextures] = useState<string[] | undefined>([])




  function changeColor(object: any) {
    const texture = new TextureLoader().load('./models/textures/Material_baseColor.jpeg');
    const material = new MeshBasicMaterial({
      map: texture,
    });
    object['material'] = material;
    object['material'].needsUpdate = true;

    const currentValue = object.name; // Suponhamos que esta seja a variável que você deseja verificar

    const index = Object.keys(OBJECTS[0]).find(key => key === currentValue);

    if (index) {
      setTextures(OBJECTS[0][index])
    } else {
      return
    }
  }
  return (
    <>

      <primitive onClick={(e) => changeColor(e.object)} object={scene} />
    </>
  )
}

