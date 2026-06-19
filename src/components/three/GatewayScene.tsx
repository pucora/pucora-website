import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Float, Line } from '@react-three/drei'

const ACCENT = new THREE.Color('#00D4AA')
const INDIGO = new THREE.Color('#4F46E5')

interface GatewaySceneProps {
  interactive?: boolean
  particleCount?: number
}

function ParticleNetwork({ count = 120 }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const groupRef = useRef<THREE.Group>(null)

  const { positions, connections } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const pts: THREE.Vector3[] = []

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.2 + Math.random() * 1.8
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      pts.push(new THREE.Vector3(x, y, z))
    }

    const lines: [THREE.Vector3, THREE.Vector3][] = []
    const maxDist = 1.35
    const maxLines = 90
    for (let i = 0; i < pts.length && lines.length < maxLines; i++) {
      const neighbors: { j: number; dist: number }[] = []
      for (let j = 0; j < pts.length; j++) {
        if (i === j) continue
        const dist = pts[i].distanceTo(pts[j])
        if (dist < maxDist) neighbors.push({ j, dist })
      }
      neighbors.sort((a, b) => a.dist - b.dist)
      for (const { j } of neighbors.slice(0, 2)) {
        if (i < j) lines.push([pts[i].clone(), pts[j].clone()])
      }
    }

    return { positions: pos, connections: lines }
  }, [count])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial
      mat.opacity = 0.55 + Math.sin(state.clock.elapsedTime * 2) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color={ACCENT}
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {connections.map(([a, b], i) => (
        <Line
          key={i}
          points={[a, b]}
          color={i % 3 === 0 ? '#00D4AA' : '#4F46E5'}
          transparent
          opacity={0.12}
          lineWidth={1}
        />
      ))}
    </group>
  )
}

function CentralCore() {
  const coreRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.3
      coreRef.current.rotation.y = t * 0.5
      const scale = 1 + Math.sin(t * 2) * 0.06
      coreRef.current.scale.setScalar(scale)
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={0.8}
            wireframe
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh ref={ringRef}>
          <torusGeometry args={[0.85, 0.02, 16, 64]} />
          <meshStandardMaterial color={INDIGO} emissive={INDIGO} emissiveIntensity={0.5} transparent opacity={0.7} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={ACCENT}
            emissiveIntensity={1.2}
            transparent
            opacity={0.85}
          />
        </mesh>
        <pointLight color={ACCENT} intensity={2} distance={4} />
        <pointLight color={INDIGO} intensity={1} distance={3} position={[1, 1, 1]} />
      </group>
    </Float>
  )
}

function OrbitingNodes() {
  const groupRef = useRef<THREE.Group>(null)
  const nodes = useMemo(
    () =>
      ['REST', 'gRPC', 'WS', 'Kafka', 'SOAP'].map((_, i) => ({
        angle: (i / 5) * Math.PI * 2,
        radius: 2.8,
        color: i % 2 === 0 ? ACCENT : INDIGO,
      })),
    [],
  )

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -state.clock.elapsedTime * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => {
        const x = Math.cos(node.angle) * node.radius
        const z = Math.sin(node.angle) * node.radius
        return (
          <Float key={i} speed={2 + i * 0.3} floatIntensity={0.3}>
            <mesh position={[x, Math.sin(i) * 0.3, z]}>
              <octahedronGeometry args={[0.12, 0]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.6}
                transparent
                opacity={0.85}
              />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

function DataPulses() {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        const t = (state.clock.elapsedTime * 0.5 + i * 0.4) % 1
        mesh.position.lerpVectors(
          new THREE.Vector3(2.5, 0, 0),
          new THREE.Vector3(0, 0, 0),
          t,
        )
        const mat = mesh.material as THREE.MeshStandardMaterial
        mat.opacity = 1 - t
      })
    }
  })

  return (
    <group ref={ref}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[2.5, 0, i * 0.3 - 0.3]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={1}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

export function GatewayScene({ interactive = true, particleCount = 120 }: GatewaySceneProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!interactive || !groupRef.current) return
    const { x, y } = state.pointer
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.3, 0.05)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y * 0.15, 0.05)
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <ParticleNetwork count={particleCount} />
      <CentralCore />
      <OrbitingNodes />
      <DataPulses />
    </group>
  )
}
