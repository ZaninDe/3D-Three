'use client'
import dynamic from "next/dynamic";
import { Loader } from "../components/Loader";
import { Model } from "../components/canvas/Model";
import { useEffect, useRef, useState } from "react";

const Common = dynamic(() => import('../components/Loader').then((mod) => mod.Common), { ssr: false })

export default function New() {
  const ref = useRef(null)
  const [cameraPosition, setCameraPosition] = useState()
  const [screenShot, setScreenShot] = useState()

  function getCookie(name: string) {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='));
  
    if (cookieValue) {
      return cookieValue.split('=')[1];
    }
    return null;
  }

  useEffect(() => {
    const cameraPosition = localStorage.getItem('cameraPosition')
    if(cameraPosition) {
      const position = JSON.parse(cameraPosition)
      console.log(position)
      setCameraPosition(position)
    } else {
      console.log('não existe')
    }
  }, [])

  function handleGetPosition() {
    const position = ref.current.getCurrentCameraPositon()
    console.log(position)
    setCameraPosition(position)

    localStorage.setItem('cameraPosition', JSON.stringify(position));
  }

  function handleSetCameraPosition() {
    if (cameraPosition) {
      console.log('cameraPosition', cameraPosition)
      ref.current.setCurrentCameraPositon(cameraPosition)
    }
  }

  function handleExportImage() {
    const imgData = ref.current.takeScreenshot()
    setScreenShot(imgData)
  }

  return (
    <div className="w-screen h-screen">
      <div className="flex gap-2">
      <button onClick={handleGetPosition}> get position</button>
      <button onClick={handleSetCameraPosition}> set position</button>
      <button onClick={handleExportImage}> Export Image</button>
      </div>
      <Loader>
        <Model ref={ref} />
        <Common />
      </Loader>
      {screenShot && <img src={screenShot} width={200} height={200} />}
    </div>
  )
}