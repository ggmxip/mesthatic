import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

function seed(i, salt) {
  const v = Math.sin((i + 1) * 9301 + salt * 49297) * 233280
  return v - Math.floor(v)
}

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
    const speed = 0.02

    meshRef.current.rotation.x = t * speed + py * 0.05
    meshRef.current.rotation.y = t * speed * 1.3 + px * 0.08

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
        <torusGeometry args={[2, 0.45, 24, 48]} />
        <MeshDistortMaterial
          color="#fafafa"
          metalness={1}
          roughness={0.02}
          clearcoat={2}
          clearcoatRoughness={0}
          envMapIntensity={5}
          distort={0.025}
          speed={0.6}
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
        opacity={0.18}
      />
    </mesh>
  )
}

function Stars() {
  const starsRef = useRef()
  const count = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seed(i, 10) - 0.5) * 40
      pos[i * 3 + 1] = (seed(i, 11) - 0.5) * 40
      pos[i * 3 + 2] = -15 - seed(i, 12) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.z = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

function Lights() {
  const cyanRef = useRef()
  const purpleRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (cyanRef.current) cyanRef.current.intensity = 30 + Math.sin(t * 0.7) * 20
    if (purpleRef.current) purpleRef.current.intensity = 30 + Math.sin(t * 0.5 + 2) * 20
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[8, 8, 8]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-8, -4, -4]} intensity={0.4} color="#6666ff" />
      <pointLight ref={purpleRef} position={[-4, 2, 4]} intensity={50} color="#aa3bff" />
      <pointLight ref={cyanRef} position={[4, -2, 4]} intensity={50} color="#00ffff" />
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
        dpr={[1, 1.5]}
        gl={{ preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#030303']} />

        <Stars />
        <Lights />
        <ChromeRing />
        <WireframeCore />

        <EffectComposer>
          <Bloom
            intensity={0.15}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
