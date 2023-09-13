'use client'
import { Suspense, useEffect, useState } from "react";
import { Scene } from "./components/Scene";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJECTS } from "./data/Objects";

export default function Home() {
  const [textures, setTextures] = useState<string[] | undefined>([])
  const [currentTexture, setCurrentTexture] = useState('')
  const [currentObject, setCurrentObject] = useState<any>()

  useEffect(() => {
    if (currentObject) 
      console.log(currentObject.name)

      const index = Object.keys(OBJECTS[0]).find(key => key === currentObject?.name);

    if (index) 
      setTextures(OBJECTS[0][index])
    else
      setTextures([])

  }, [currentObject])
  return (
    <div className="w-screen h-screen">
      {
        currentObject && textures &&(
          <div className="absolute top-10 left-10 flex gap-4">
            {
              textures.map((item) => (
                <div key={item} className="cursor-pointer" onClick={() => setCurrentTexture(item)}>{item}</div>
              ))
            }
          </div>
        )
      }
      <Canvas dpr={[2, 1]} camera={{ fov: 50 }}>
        <Suspense fallback={null}>
          <Scene onChangeObject={setCurrentObject} texture={currentTexture}/>
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  )
}
