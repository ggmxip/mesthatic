import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

function ChromeRing() {
  const meshRef = useRef()
  const groupRef = useRef()
  const { pointer } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    const px = pointer.x
    const py = pointer.y
    const scrollY = window.scrollY || 0
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight)
    const scrollPct = Math.min(scrollY / maxScroll, 1)

    meshRef.current.rotation.x = t * 0.02 + py * 0.05
    meshRef.current.rotation.y = t * 0.026 + px * 0.08

    if (groupRef.current) {
      groupRef.current.rotation.x += (-py * 0.2 - groupRef.current.rotation.x) * 0.08
      groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.08
    }

    const scale = 1.4 - scrollPct * 0.4
    meshRef.current.scale.setScalar(scale)
    meshRef.current.position.x = Math.sin(t * 0.35) * 0.12 + px * 0.12
    meshRef.current.position.y = Math.cos(t * 0.28) * 0.08 + py * 0.1
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <torusGeometry args={[2, 0.45, 20, 32]} />
        <meshStandardMaterial
          color="#fafafa"
          metalness={1}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>
    </group>
  )
}

function WireframeCore() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * 0.08
    ref.current.rotation.y = t * 0.12
    const scrollY = window.scrollY || 0
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight)
    const scrollPct = Math.min(scrollY / maxScroll, 1)
    ref.current.position.y = -scrollPct * 1.5
  })
  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <icosahedronGeometry args={[1.6, 0]} />
      <meshBasicMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  )
}

function Stars() {
  const starsRef = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(150 * 3)
    for (let i = 0; i < 150; i++) {
      pos[i * 3] = (Math.sin((i + 1) * 9301) - 0.5) * 40
      pos[i * 3 + 1] = (Math.sin((i + 1) * 49297) - 0.5) * 40
      pos[i * 3 + 2] = -15 - Math.sin(i * 233280) * 20
    }
    return pos
  }, [])

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={150}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[8, 8, 8]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-8, -4, -4]} intensity={0.3} color="#6666ff" />
      <pointLight position={[-4, 2, 4]} intensity={30} color="#aa3bff" />
      <pointLight position={[4, -2, 4]} intensity={30} color="#00ffff" />
    </>
  )
}

export default function BackgroundScene() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <Canvas
        style={{ pointerEvents: 'none' }}
        camera={{ position: [0, 0, 8] }}
        dpr={[0.5, 1]}
      >
        <color attach="background" args={['#030303']} />
        <Stars />
        <Lights />
        <ChromeRing />
        <WireframeCore />
      </Canvas>
    </div>
  )
}
