'use client'
import { Suspense } from "react";
import ModelCanvas from "./components/canvas/Model";
import EarthCanvas from "./components/canvas/Model";
import { Scene } from "./components/Scene";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Home() {
  return (
   <div className="w-screen h-screen">
    <Canvas dpr={[1, 2]} camera={{ fov: 50 }}>
     <Suspense fallback={null}>
      <Scene />
     </Suspense>
     <OrbitControls enableZoom={true} enablePan={true} />
     </Canvas>
   </div>
  )
}
