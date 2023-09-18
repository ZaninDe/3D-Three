'use client'
import { Suspense, useEffect, useState } from "react";
import { Scene } from "./components/Scene";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJECTS } from "./data/Objects";
import  Image from 'next/image'
import { OBJECTSTEXTURE } from "./data/ObjectsTextures";

export default function Home() {
  const [textures, setTextures] = useState<any>([])
  const [currentTexture, setCurrentTexture] = useState<string[]>()
  const [currentObject, setCurrentObject] = useState<any>()
  const [textureObj, settextureObj] = useState({})

  function handleObjectChange(object: any) {
     // @ts-ignore
     if (OBJECTSTEXTURE[object?.name]) {
      console.log(object)
      // @ts-ignore

      setTextures(OBJECTSTEXTURE[object?.name])
      setCurrentObject(object)

      } else {
        setTextures([])
        setCurrentObject(undefined)
      }
  }

  useEffect(() => {
    console.log(currentTexture)
  }, [currentObject])

  // useEffect(() => {
  //   // @ts-ignore
  //   if (currentObject && OBJECTSTEXTURE[currentObject?.name]) {
  //   // @ts-ignore
  //     setTextures(OBJECTSTEXTURE[currentObject?.name])
  //   } else {
  //     setTextures([])
  //     setCurrentObject(undefined)
  //   }
  // }, [currentObject])
  return (
    <div className="w-screen h-screen">
      {
        currentObject && textures && (
          <div className="absolute top-10 left-10 flex flex-col gap-4 z-10">
            {
             Object.keys(textures).map((item) => (
              <div key={item} className="cursor-pointer" onClick={() => setCurrentTexture(textures[item])}>
                <Image 
                  src={textures[item]} 
                  alt="texture image" 
                  width={100} 
                  height={100}
                  className={`w-24 h-24 rounded-md`}
                />
              </div>
            ))
            }
          </div>
        )
      }
      <Canvas dpr={[2, 1]} camera={{ fov: 50 }}>
        <Suspense fallback={null}>
          <Scene onChangeObject={handleObjectChange} texture={currentTexture} selectedObject={currentObject}/>
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  )
}
