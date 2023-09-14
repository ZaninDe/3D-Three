'use client'
import { Suspense, useEffect, useState } from "react";
import { Scene } from "./components/Scene";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJECTS } from "./data/Objects";
import  Image from 'next/image'

export default function Home() {
  const [textures, setTextures] = useState<string[] | undefined>([])
  const [currentTexture, setCurrentTexture] = useState('')
  const [currentObject, setCurrentObject] = useState<any>()

  useEffect(() => {
    if (currentObject) 
      console.log(currentObject.name)

      const index = Object.keys(OBJECTS[0]).find(key => key === currentObject?.name);
      console.log(currentObject)

    if (index)  {
      setTextures(OBJECTS[0][index])
      console.log(currentObject)
    }
      
    else {
      setCurrentObject(undefined)
      setTextures([])
      setCurrentTexture('')
    }

  }, [currentObject])
  return (
    <div className="w-screen h-screen">
      {
        currentObject && textures &&(
          <div className="absolute top-10 left-10 flex gap-4 z-10">
            {
              textures.map((item) => (
                <div key={item} className="cursor-pointer" onClick={() => setCurrentTexture(item)}>
                  <Image 
                    src={item} 
                    alt="texture image" 
                    width={100} 
                    height={100}
                    className={`w-24 h-24 rounded-md border-2 ${item === currentTexture ? 'border-rose-600' : 'border-black'}`}
                  />
                </div>
              ))
            }
          </div>
        )
      }
      <Canvas dpr={[2, 1]} camera={{ fov: 50 }}>
        <Suspense fallback={null}>
          <Scene onChangeObject={setCurrentObject} texture={currentTexture} selectedObject={currentObject}/>
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  )
}
