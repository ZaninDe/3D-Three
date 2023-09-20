'use client'
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { ReactNode, Suspense } from "react"

interface LoaderProps {
  children: ReactNode
}

export const Common = ({ color = 'white' }: { color?: string }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <ambientLight intensity={0.5} />
    <pointLight position={[20, 30, 10]} intensity={1} />
    <pointLight position={[-10, -10, -10]} color='blue' />
    <PerspectiveCamera makeDefault fov={20} position={[-15, 0, -2]} />
  </Suspense>
)

export const Loader = ({ children }: LoaderProps) => {
  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <mesh>{children}</mesh>
      <OrbitControls enableZoom={true} enablePan={true} />
    </Canvas>
  )
}