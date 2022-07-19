import useStore from '@/helpers/store'
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { PerspectiveCamera, Sky } from '@react-three/drei'
import * as THREE from 'three'
// import { Controls, useControl } from 'react-three-gui'
import { useControls } from 'leva'
import img from '../../../public/img/textrue.jpeg'
import heightMap from '../../../public/img/hm_himalaya.jpeg'
import alphaMap from '../../../public/img/alpha.jpg'
import seaTexture from '../../../public/img/seaTexture.jpg'
import seaMap from '../../../public/img/seaheightmap.png'

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
    seaColor,
  } = useControls({
    geometryColor: { value: '#c1c0c0', label: 'Plane Color' },
    lightColor: { value: 'white', label: 'Light Color' },
    seaColor: { value: '#009fff', label: 'Sea Color' },
    lightIntensity: { value: 1, label: 'Light Intensity' },
    planeSize: { value: 3, label: 'Plane Size' },
    wireFrame: { value: false, label: 'Wire Frame' },
    lightX: { value: 1, label: 'Light X' },
    lightY: { value: 2, label: 'Light Y' },
    lightZ: { value: 1, label: 'Light Z' },
  })

  const cameraRef = useRef(null)
  const planeRef = useRef(null)
  const seaRef = useRef(null)

  const [seaRise, setSeaRise] = useState(true)

  const imgTex = useLoader(THREE.TextureLoader, img.src)
  const heightMapLoader = useLoader(THREE.TextureLoader, heightMap.src)
  const alphaMapLoader = useLoader(THREE.TextureLoader, alphaMap.src)

  const seaTextureLoader = useLoader(THREE.TextureLoader, seaTexture.src)
  const seaMapLoader = useLoader(THREE.TextureLoader, seaMap.src)

  useFrame(() => {
    cameraRef.current.rotation.z += 0.003
    if (seaRise) {
      seaRef.current.position.y += 0.0005
      if (seaRef.current.position.y > 0.05) {
        setSeaRise(false)
      }
    } else {
      seaRef.current.position.y -= 0.0005
      if (seaRef.current.position.y < 0.02) {
        setSeaRise(true)
      }
    }
  })

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        args={[75, 800 / 600, 1, 1000]}
        position={[0, 2, 4]}
      />
      {/* <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      /> */}
      <ambientLight />
      <spotLight
        args={[lightColor, lightIntensity]}
        position={[lightX, lightY, lightZ]}
      />
      <axesHelper args={[10, 10, 10]} />
      <mesh
        position={[0, -0.2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        ref={planeRef}
      >
        <planeBufferGeometry args={[planeSize, planeSize, 64, 64]} />
        <meshStandardMaterial
          attach='material'
          color={geometryColor}
          wireframe={wireFrame}
          map={imgTex}
          displacementMap={heightMapLoader}
          displacementScale={0.9}
          alphaMap={alphaMapLoader}
          transparent={true}
          // depthTest={false}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={seaRef}>
        <planeBufferGeometry args={[planeSize + 3, planeSize + 3, 256, 256]} />
        <meshStandardMaterial
          attach='material'
          map={seaTextureLoader}
          // attach='material'
          color={seaColor}
          displacementMap={seaMapLoader}
          wireframe={wireFrame}
          displacementScale={0.1}
          // opacity={0.5}
        />
      </mesh>
    </>
  )
}
export default BoxComponent
