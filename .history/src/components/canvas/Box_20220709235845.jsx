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
  const router = useStore((s) => s.router)
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) =>
    mesh.current
      ? (mesh.current.rotation.y = mesh.current.rotation.x += 0.01)
      : null
  )

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
    geometryColor: { value: '#807c00', label: 'Plane Color' },
    lightColor: { value: 'white', label: 'Light Color' },
    lightIntensity: { value: 3, label: 'Light Intensity' },
    planeSize: { value: 3, label: 'Plane Size' },
    wireFrame: { value: false, label: 'Wire Frame' },
    lightX: { value: 5, label: 'Light X' },
    lightY: { value: 5, label: 'Light Y' },
    lightZ: { value: 5, label: 'Light Z' },
  })

  const cameraRef = useRef(null)

  const imgTex = useLoader(THREE.TextureLoader, img.src)
  const heightMapLoader = useLoader(THREE.TextureLoader, heightMap.src)

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        args={[75, 800 / 600, 1, 1000]}
        position={[0, 2, 4]}
      />
      {/* <Stars /> */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <Cloud
        opacity={1}
        speed={0.4} // Rotation speed
        width={10} // Width of the full cloud
        depth={15.5} // Z-dir depth
        segments={20} // Number of particles\
      />
      {/* <ambientLight /> */}
      <pointLight
        args={[lightColor, lightIntensity]}
        position={[lightX, lightY, lightZ]}
      />
      <axesHelper args={[10, 10, 10]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
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
