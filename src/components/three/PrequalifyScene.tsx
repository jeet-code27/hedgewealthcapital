"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, ContactShadows, Edges, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const NAVY = "#192861";
const GREEN = "#7AC644";

/** Triangular prism for a gable roof, ridge running along Z. */
function useRoofGeometry(width: number, height: number, depth: number) {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-width / 2, 0);
    s.lineTo(width / 2, 0);
    s.lineTo(0, height);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false });
    g.translate(0, 0, -depth / 2);
    return g;
  }, [width, height, depth]);
}

function Window({ position, rotationY = 0 }: { position: [number, number, number]; rotationY?: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh>
        <boxGeometry args={[0.36, 0.36, 0.03]} />
        <meshStandardMaterial color={NAVY} roughness={0.2} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.36, 0.03, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.03, 0.36, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function House() {
  const roof = useRoofGeometry(2.3, 0.95, 2.0);
  const W = 1.9;
  const H = 1.2;
  const D = 1.6;

  return (
    <group>
      {/* Platform */}
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <cylinderGeometry args={[2.1, 2.1, 0.16, 72]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.95, 2.0, 72]} />
        <meshBasicMaterial color={GREEN} />
      </mesh>
      {/* Path */}
      <mesh position={[0, 0.004, 1.35]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 0.9]} />
        <meshStandardMaterial color="#e8ebf5" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
        <Edges color={NAVY} lineWidth={1.5} />
      </mesh>
      {/* Roof */}
      <mesh geometry={roof} position={[0, H, 0]} castShadow>
        <meshStandardMaterial color={GREEN} roughness={0.45} flatShading />
        <Edges color="#4d8c22" lineWidth={1.2} />
      </mesh>
      {/* Chimney */}
      <mesh position={[0.55, H + 0.75, -0.35]} castShadow>
        <boxGeometry args={[0.22, 0.55, 0.22]} />
        <meshStandardMaterial color={NAVY} />
      </mesh>

      {/* Front: door + windows */}
      <mesh position={[0, 0.34, D / 2 + 0.016]}>
        <boxGeometry args={[0.38, 0.68, 0.03]} />
        <meshStandardMaterial color={NAVY} roughness={0.3} />
      </mesh>
      <mesh position={[0.12, 0.34, D / 2 + 0.04]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={0.5} />
      </mesh>
      <Window position={[-0.58, 0.68, D / 2 + 0.016]} />
      <Window position={[0.58, 0.68, D / 2 + 0.016]} />
      {/* Side windows */}
      <Window position={[W / 2 + 0.016, 0.68, -0.35]} rotationY={Math.PI / 2} />
      <Window position={[W / 2 + 0.016, 0.68, 0.35]} rotationY={Math.PI / 2} />

      {/* Shrubs */}
      {[
        [-1.25, 0.9],
        [1.25, 0.95],
        [-1.4, -0.6],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.18, z]} castShadow>
          <icosahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color={GREEN} flatShading roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/** Approval badge that always faces the camera. */
function Badge() {
  return (
    <Float speed={2.4} floatIntensity={0.8} rotationIntensity={0}>
      <Billboard position={[0, 3.05, 0]}>
        <mesh>
          <circleGeometry args={[0.46, 48]} />
          <meshBasicMaterial color={GREEN} />
        </mesh>
        <mesh position={[0, 0, -0.01]}>
          <circleGeometry args={[0.54, 48]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Checkmark: short arm + long arm meeting at the bottom vertex */}
        <group position={[-0.02, -0.02, 0.02]}>
          <RoundedBox args={[0.26, 0.09, 0.02]} radius={0.04} position={[-0.11, -0.03, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <meshBasicMaterial color="#ffffff" />
          </RoundedBox>
          <RoundedBox args={[0.46, 0.09, 0.02]} radius={0.04} position={[0.09, 0.05, 0]} rotation={[0, 0, Math.PI / 4]}>
            <meshBasicMaterial color="#ffffff" />
          </RoundedBox>
        </group>
      </Billboard>
    </Float>
  );
}

function Coins() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.5;
  });
  return (
    <group ref={ref} position={[0, 1.2, 0]}>
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <Float key={i} speed={3} floatIntensity={0.6} rotationIntensity={1.5}>
            <mesh position={[Math.cos(a) * 2.35, Math.sin(i * 1.7) * 0.4, Math.sin(a) * 2.35]} rotation={[Math.PI / 2.4, 0, 0]} castShadow>
              <cylinderGeometry args={[0.17, 0.17, 0.05, 32]} />
              <meshStandardMaterial color={i % 2 ? GREEN : "#ffffff"} metalness={0.5} roughness={0.25} />
              <Edges color={NAVY} lineWidth={1} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.55 + Math.sin(t * 0.35) * 0.3 + pointer.current.x * 0.35, 0.05);
  });

  return (
    <group ref={group} position={[0, -0.9, 0]}>
      <House />
      <Coins />
      <Badge />
    </group>
  );
}

export default function PrequalifyScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        shadows="percentage"
        dpr={[1, 1.75]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 2.6, 7.4], fov: 36 }}
        onCreated={({ camera }) => camera.lookAt(0, 0.4, 0)}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <hemisphereLight args={["#ffffff", "#9fb0e6", 0.6]} />
        <directionalLight position={[4, 7, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004} />
        <Scene />
        <ContactShadows position={[0, -1.0, 0]} opacity={0.5} scale={8} blur={2.4} far={3} color="#000000" />
      </Canvas>
    </div>
  );
}
