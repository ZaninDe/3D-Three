'use client'
import { useGLTF } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { forwardRef, useImperativeHandle, useRef } from "react"
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'

export const Model = forwardRef(function Model({}, ref) {
  const modelRef = useRef()
  const { scene } = useGLTF('/models/patriani_refatorado.glb')
  const customObject = useGLTF('/models/torneira.gltf')
  const { camera, gl } = useThree()

  useImperativeHandle(ref, () => {
    return {
      getCurrentCameraPositon() {
        // spread to avoid get ref
        const camPosition = { ...camera.position }
        return camPosition
      },
      setCurrentCameraPositon(position: any) {
        camera.position.set(position.x, position.y, position.z)
      },
      takeScreenshot() {
        const downloadImg = document.createElement('a')
        downloadImg.setAttribute('download', 'canvas.png')
        downloadImg.setAttribute('href', gl.domElement.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
        downloadImg.click()
      },
    }
  })

  return (
    <primitive object={scene} ref={ref} />
    )
})