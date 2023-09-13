'use client'
import { Suspense, useEffect, useState } from "react";
import { Scene } from "./components/Scene";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJECTS } from "./data/Objects";

export default function Home() {
  const [textures, setTextures] = useState<string[] | undefined>([])
  const [currentObject, setCurrentObject] = useState<any>()

  useEffect(() => {
    if (currentObject) {
      const currentValue = currentObject.name;

      const index = Object.keys(OBJECTS[0]).find(key => key === currentValue);

      if (index) {
        setTextures(OBJECTS[0][index])
      }
    }
  }, [currentObject])
  return (
    <div className="w-screen h-screen">
      {
        textures && (
          <div>AQUI VAI AS OPCOES!!!</div>
        )
      }
      <Canvas dpr={[2, 1]} camera={{ fov: 50 }}>
        <Suspense fallback={null}>
          <Scene onChangeObject={setCurrentObject} />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  )
}
