import useStore from '@/helpers/store'
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef, useState } from 'react'
import {
  Cloud,
  OrbitControls,
  PerspectiveCamera,
  Sky,
  Stars,
} from '@react-three/drei'
import * as THREE from 'three'
// import { Controls, useControl } from 'react-three-gui'
import { useControls } from 'leva'
import img from '../../../public/img/textrue.jpeg'
import heightMap from '../../../public/img/hm_himalaya.jpeg'

const BoxComponent = ({ route }) => {
  const {
    geometryColor,
    planeSize,
    wireFrame,
    lightX,
    lightY,
    lightZ,
    lightColor,
    lightIntensity,
  } = useControls({
    geometryColor: { value: '#c1c0c0', label: 'Plane Color' },
    lightColor: { value: 'white', label: 'Light Color' },
    lightIntensity: { value: 3, label: 'Light Intensity' },
    planeSize: { value: 3, label: 'Plane Size' },
    wireFrame: { value: false, label: 'Wire Frame' },
    lightX: { value: 5, label: 'Light X' },
    lightY: { value: 5, label: 'Light Y' },
    lightZ: { value: 5, label: 'Light Z' },
  })

  const cameraRef = useRef(null)

  const planeRef = useRef(null)

  const imgTex = useLoader(THREE.TextureLoader, img.src)
  const heightMapLoader = useLoader(THREE.TextureLoader, heightMap.src)

  useFrame(() => {
    planeRef.current.rotation.z += 0.002
  })

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        args={[75, 800 / 600, 1, 1000]}
        position={[0, 2, 4]}
      />
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <pointLight
        args={[lightColor, lightIntensity]}
        position={[lightX, lightY, lightZ]}
      />
      <axesHelper args={[10, 10, 10]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={planeRef}>
        <planeBufferGeometry args={[planeSize, planeSize, 64, 64]} />
        <meshStandardMaterial
          attach='material'
          color={geometryColor}
          wireframe={wireFrame}
          map={imgTex}
          displacementMap={heightMapLoader}
        />
      </mesh>
    </>
  )
}
export default BoxComponent
