import useStore from '@/helpers/store'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

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
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        args={[75, 800 / 600, 1, 1000]}
        position={[0, -100, 50]}
      />
      <directionalLight position={[5, 5, 5]} />
      <mesh>
        <planeBufferGeometry args={[300, 300, 64, 64]} />
        <meshStandardMaterial
          attach='material'
          color='darkolivegreen'
          wireframe
        />
      </mesh>
    </>
  )
}
export default BoxComponent
