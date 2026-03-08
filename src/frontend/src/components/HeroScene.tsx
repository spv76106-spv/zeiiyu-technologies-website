import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";

function Particles({ count = 120 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      // Mostly gold, occasional amber/copper
      const isGold = Math.random() > 0.3;
      if (isGold) {
        // Gold (R:0.83, G:0.71, B:0.06)
        col[i * 3] = 0.83;
        col[i * 3 + 1] = 0.71;
        col[i * 3 + 2] = 0.06;
      } else {
        // Amber (R:0.94, G:0.78, B:0.15)
        col[i * 3] = 0.94;
        col[i * 3 + 1] = 0.78;
        col[i * 3 + 2] = 0.15;
      }
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.02) * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function SensorNode({
  position,
  color,
  delay = 0,
}: {
  position: [number, number, number];
  color: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime + delay;
    const scale = 1 + Math.sin(t * 1.8) * 0.3;
    meshRef.current.scale.setScalar(scale);
    (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.8 + Math.sin(t * 1.8) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        roughness={0}
        metalness={0.5}
      />
    </mesh>
  );
}

function SmartCase() {
  const caseRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!caseRef.current) return;
    caseRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.25;
    caseRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    caseRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  const sensorNodes: {
    pos: [number, number, number];
    color: string;
    delay: number;
  }[] = [
    { pos: [0.22, 0.8, 0.12], color: "#d4960a", delay: 0 },
    { pos: [-0.22, 0.6, 0.12], color: "#f0b429", delay: 0.5 },
    { pos: [0.18, 0.1, 0.12], color: "#d4960a", delay: 1.0 },
    { pos: [-0.18, -0.2, 0.12], color: "#f0b429", delay: 1.5 },
    { pos: [0.0, -0.8, 0.12], color: "#d4960a", delay: 2.0 },
    { pos: [0.22, -0.5, 0.12], color: "#b07d0e", delay: 2.5 },
    { pos: [-0.1, 0.35, 0.12], color: "#b07d0e", delay: 3.0 },
  ];

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={caseRef}>
        {/* Phone case body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.52, 2.2, 0.1]} />
          <meshStandardMaterial
            color="#0d0a01"
            roughness={0.2}
            metalness={0.8}
            envMapIntensity={1}
          />
        </mesh>

        {/* Edge glow — top */}
        <mesh position={[0, 1.12, 0]}>
          <boxGeometry args={[0.52, 0.04, 0.12]} />
          <meshStandardMaterial
            color="#d4960a"
            emissive="#d4960a"
            emissiveIntensity={1.5}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Edge glow — bottom */}
        <mesh position={[0, -1.12, 0]}>
          <boxGeometry args={[0.52, 0.04, 0.12]} />
          <meshStandardMaterial
            color="#f0b429"
            emissive="#f0b429"
            emissiveIntensity={1.5}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Edge glow — left */}
        <mesh position={[-0.28, 0, 0]}>
          <boxGeometry args={[0.04, 2.2, 0.12]} />
          <meshStandardMaterial
            color="#d4960a"
            emissive="#d4960a"
            emissiveIntensity={1.0}
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Edge glow — right */}
        <mesh position={[0.28, 0, 0]}>
          <boxGeometry args={[0.04, 2.2, 0.12]} />
          <meshStandardMaterial
            color="#f0b429"
            emissive="#f0b429"
            emissiveIntensity={1.0}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Sensor grid lines */}
        {([-0.6, -0.2, 0.2, 0.6] as const).map((y) => (
          <mesh key={y} position={[0, y, 0.07]}>
            <boxGeometry args={[0.44, 0.005, 0.01]} />
            <meshStandardMaterial
              color="#d4960a"
              emissive="#d4960a"
              emissiveIntensity={0.3}
              transparent
              opacity={0.4}
            />
          </mesh>
        ))}

        {/* Sensor nodes */}
        {sensorNodes.map((node) => (
          <SensorNode
            key={`${node.pos[0]}-${node.pos[1]}`}
            position={node.pos}
            color={node.color}
            delay={node.delay}
          />
        ))}

        {/* Camera hole */}
        <mesh position={[0.05, 0.9, 0.065]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 24]} />
          <meshStandardMaterial color="#000010" roughness={0} metalness={1} />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.3} color="#0d0a01" />
      <pointLight position={[-3, 2, 3]} intensity={2} color="#d4960a" />
      <pointLight position={[3, -2, 2]} intensity={1.5} color="#f0b429" />
      <pointLight position={[0, 3, 1]} intensity={0.8} color="#ffffff" />

      <Particles count={150} />
      <SmartCase />
    </Canvas>
  );
}
