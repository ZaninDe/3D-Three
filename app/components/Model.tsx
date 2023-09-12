'use client'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Mesh, Color } from 'three';

export const Model = () => {
  const modelRef = useRef<Mesh>();
  const [model, setModel] = useState<Mesh | undefined>(undefined);
  const { scene, nodes, materials } = useLoader(GLTFLoader,'./models/patriani_refatorado.glb')

  useEffect(() => {
    if (nodes && nodes[0]) {
      setModel(nodes[0] as Mesh);
    } else {
      console.log('without nodes')
    }
  }, [nodes]);

  console.dir(nodes)

  // console.log(materials)

  

  // Função para alterar a cor do modelo
  const changeColor = () => {
    if (model) {
      model.material.color = new Color(0xff0000); // Altere para a cor desejada
    }
  };
  return (
    <>
    <primitive object={scene}/>
    </>
  )
}

