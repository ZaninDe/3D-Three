'use client'
import { Suspense, useEffect, useState } from "react";
import { Scene } from "./components/Scene";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJECTS } from "./data/Objects";
import  Image from 'next/image'

export default function Home() {
  const [textures, setTextures] = useState<any>([])
  const [currentTexture, setCurrentTexture] = useState<string[]>()
  const [currentObject, setCurrentObject] = useState<any>()
  const [textureObj, settextureObj] = useState({})

  useEffect(() => {
    if (currentObject && OBJECTS[currentObject?.name]) {
      setTextures(OBJECTS[currentObject?.name])
    } else {
      setTextures([])
      setCurrentObject(undefined)
    }
  }, [currentObject])

  useEffect(() => {
    if(currentTexture) {
      settextureObj( {
      map: currentTexture[0],
      normalMap: currentTexture[1],
      roughnessMap: currentTexture[2],
      metalnessMap: currentTexture[3],
    })
    console.log(textureObj)
    }

  },[currentTexture])
  return (
    <div className="w-screen h-screen">
      {
        currentObject && textures &&(
          <div className="absolute top-10 left-10 flex flex-col gap-4 z-10">
            {
             Object.keys(textures).map((item) => (
              <div key={item} className="cursor-pointer" onClick={() => setCurrentTexture(textures[item])}>
                <Image 
                  src={textures[item][0]} 
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
          <Scene onChangeObject={setCurrentObject} texture={textureObj} selectedObject={currentObject}/>
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  )
}
