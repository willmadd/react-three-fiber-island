import useStore from '@/helpers/store'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import {
  Cloud,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from '@react-three/drei'
// import { Controls, useControl } from 'react-three-gui'
import { useControls } from 'leva'

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

  const { geometryColor } = useControls({
    geometryColor: { value: '#000', label: 'background' },
  })

  const cameraRef = useRef(null)
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      {/* <mesh
        ref={mesh}
        onClick={() => router.push(route)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color={route === '/' ? 'orange' : 'hotpink'} />
      </mesh>
      <directionalLight position={[5, 5, 5]} />
      <ambientLight /> */}
      {/* <ambientLight /> */}
      {/* <DatGui /> */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        args={[75, 800 / 600, 1, 1000]}
        position={[0, 2, 4]}
      />
      <Stars />
      {/* <Cloud /> */}
      {/* <ambientLight /> */}
      <directionalLight position={[5, 5, 5]} />
      <axesHelper args={[10, 10, 10]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry args={[6, 6, 64, 64]} />
        <meshStandardMaterial
          attach='material'
          color={geometryColor}
          wireframe={false}
        />
      </mesh>
    </>
  )
}
export default BoxComponent