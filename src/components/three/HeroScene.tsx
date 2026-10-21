"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Edges, Float } from "@react-three/drei";
import * as THREE from "three";

const NAVY = "#192861";
const GREEN = "#7AC644";
const PLATFORM_TOP = 0.15;

/** 0 → 1 ease-out progress that starts `delay` seconds after mount. */
function rise(t: number, delay: number, duration = 1.3) {
  const p = THREE.MathUtils.clamp((t - delay) / duration, 0, 1);
  return 1 - Math.pow(1 - p, 4);
}

const LOBBY_H = 0.36;

/** Window grid on all four facades (the ground floor is left for the lobby). */
function Windows({ w, h, d, seed, base }: { w: number; h: number; d: number; seed: number; base: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);

  const slots = useMemo(() => {
    const out: { pos: [number, number, number]; rotY: number; tone: 0 | 1 | 2 }[] = [];
    // Deterministic pseudo-random value per window, so lit windows stay put between renders.
    const rand = (i: number) => {
      const x = Math.sin(seed * 999 + i * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    const rows = Math.max(1, Math.floor((h - base - 0.22) / 0.34) + 1);
    const o = 0.006;
    // Facades: front, right, back, left
    const faces: { span: number; place: (along: number, y: number) => [number, number, number]; rotY: number }[] = [
      { span: w, place: (a, y) => [a, y, d / 2 + o], rotY: 0 },
      { span: d, place: (a, y) => [w / 2 + o, y, -a], rotY: Math.PI / 2 },
      { span: w, place: (a, y) => [-a, y, -d / 2 - o], rotY: Math.PI },
      { span: d, place: (a, y) => [-w / 2 - o, y, a], rotY: -Math.PI / 2 },
    ];
    for (const f of faces) {
      const cols = Math.max(1, Math.floor(f.span / 0.26));
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const along = -f.span / 2 + (f.span / cols) * (c + 0.5);
          const y = base + 0.2 + r * 0.34;
          if (y > h - 0.12) continue;
          const roll = rand(out.length);
          out.push({ pos: f.place(along, y), rotY: f.rotY, tone: roll > 0.84 ? 1 : roll > 0.7 ? 2 : 0 });
        }
      }
    }
    return out;
  }, [w, h, d, seed, base]);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Object3D();
    const tones = [new THREE.Color(NAVY), new THREE.Color(GREEN), new THREE.Color("#4f68c2")];
    slots.forEach((s, i) => {
      m.position.set(...s.pos);
      m.rotation.set(0, s.rotY, 0);
      m.updateMatrix();
      mesh.setMatrixAt(i, m.matrix);
      mesh.setColorAt(i, tones[s.tone]);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [slots]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, slots.length]}>
      <planeGeometry args={[0.13, 0.2]} />
      <meshStandardMaterial roughness={0.15} metalness={0.35} />
    </instancedMesh>
  );
}

/** Thin horizontal ledges between floors, wrapping the whole building. */
function Ledges({ w, h, d }: { w: number; h: number; d: number }) {
  const ys: number[] = [];
  for (let y = LOBBY_H + 0.03; y < h - 0.2; y += 0.68) ys.push(y);
  return (
    <>
      {ys.map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[w + 0.035, 0.022, d + 0.035]} />
          <meshStandardMaterial color="#e3e8f5" roughness={0.5} />
        </mesh>
      ))}
    </>
  );
}

function Building({
  position,
  size,
  delay,
  seed = 1,
  roof,
  antenna,
}: {
  position: [number, number];
  size: [number, number, number];
  delay: number;
  seed?: number;
  roof?: boolean;
  antenna?: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const [w, h, d] = size;

  useFrame(({ clock }) => {
    if (ref.current) ref.current.scale.y = Math.max(rise(clock.elapsedTime, delay), 0.001);
  });

  return (
    <group ref={ref} position={[position[0], PLATFORM_TOP, position[1]]}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color="#ffffff" roughness={0.45} />
        <Edges color={NAVY} lineWidth={1.4} />
      </mesh>

      {/* Glass lobby with a green entrance on the front (houses get a door instead) */}
      {roof ? (
        <mesh position={[0, 0.17, d / 2 + 0.012]}>
          <boxGeometry args={[0.16, 0.34, 0.02]} />
          <meshStandardMaterial color={NAVY} />
        </mesh>
      ) : (
      <>
      <mesh position={[0, LOBBY_H / 2, 0]}>
        <boxGeometry args={[w + 0.02, LOBBY_H, d + 0.02]} />
        <meshStandardMaterial color={NAVY} roughness={0.15} metalness={0.4} />
      </mesh>
      <mesh position={[0, LOBBY_H + 0.015, 0]}>
        <boxGeometry args={[w + 0.08, 0.03, d + 0.08]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, LOBBY_H * 0.42, d / 2 + 0.014]}>
        <boxGeometry args={[Math.min(0.3, w * 0.35), LOBBY_H * 0.84, 0.01]} />
        <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={0.35} />
      </mesh>
      </>
      )}

      {h > 1.2 && <Ledges w={w} h={h} d={d} />}

      {roof ? (
        <mesh position={[0, h + 0.28, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[Math.max(w, d) * 0.78, 0.56, 4]} />
          <meshStandardMaterial color={NAVY} roughness={0.5} />
        </mesh>
      ) : (
        <>
          {/* Parapet crown */}
          <mesh position={[0, h + 0.03, 0]}>
            <boxGeometry args={[w + 0.05, 0.06, d + 0.05]} />
            <meshStandardMaterial color={NAVY} />
          </mesh>
          {/* Rooftop plant boxes */}
          <mesh position={[-w * 0.18, h + 0.13, -d * 0.12]} castShadow>
            <boxGeometry args={[w * 0.32, 0.16, d * 0.3]} />
            <meshStandardMaterial color="#eef1f8" />
            <Edges color={NAVY} lineWidth={1} />
          </mesh>
          <mesh position={[w * 0.22, h + 0.1, d * 0.18]} castShadow>
            <boxGeometry args={[w * 0.22, 0.1, d * 0.22]} />
            <meshStandardMaterial color={GREEN} />
          </mesh>
          {antenna && (
            <group position={[w * 0.2, h, -d * 0.2]}>
              <mesh position={[0, 0.35, 0]}>
                <cylinderGeometry args={[0.012, 0.018, 0.7, 6]} />
                <meshStandardMaterial color={NAVY} />
              </mesh>
              <mesh position={[0, 0.72, 0]}>
                <sphereGeometry args={[0.035, 12, 12]} />
                <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={0.8} />
              </mesh>
            </group>
          )}
        </>
      )}
      <Windows w={w} h={h} d={d} seed={seed} base={roof ? 0.05 : LOBBY_H} />
    </group>
  );
}

/** A tower that keeps building itself floor by floor, on a loop. */
function Construction({ position }: { position: [number, number] }) {
  const floors = 7;
  const slabs = useRef<(THREE.Mesh | null)[]>([]);
  const columnsRef = useRef<THREE.Group>(null);
  const w = 0.85;
  const gap = 0.32;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (columnsRef.current) columnsRef.current.scale.y = Math.max(rise(t, 1.1), 0.001);
    const cycle = ((t - 1.6) * 0.9) % (floors + 3);
    slabs.current.forEach((m, i) => {
      if (!m) return;
      const k = THREE.MathUtils.clamp(cycle - i, 0, 1);
      m.scale.setScalar(t < 1.6 ? 0.001 : Math.max(k, 0.001));
    });
  });

  return (
    <group position={[position[0], PLATFORM_TOP, position[1]]}>
      <group ref={columnsRef}>
        {[
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ].map(([x, z], i) => (
          <mesh key={i} position={[(x * w) / 2, (floors * gap) / 2, (z * w) / 2]} castShadow>
            <boxGeometry args={[0.05, floors * gap, 0.05]} />
            <meshStandardMaterial color={NAVY} />
          </mesh>
        ))}
      </group>
      {Array.from({ length: floors }).map((_, i) => (
        <mesh key={i} ref={(m) => void (slabs.current[i] = m)} position={[0, (i + 1) * gap, 0]} castShadow>
          <boxGeometry args={[w + 0.08, 0.05, w + 0.08]} />
          <meshStandardMaterial color="#ffffff" />
          <Edges color={GREEN} lineWidth={1.6} />
        </mesh>
      ))}
    </group>
  );
}

function Crane({ position }: { position: [number, number] }) {
  const jib = useRef<THREE.Group>(null);
  const root = useRef<THREE.Group>(null);
  const height = 3.1;

  useFrame(({ clock }, dt) => {
    if (root.current) root.current.scale.y = Math.max(rise(clock.elapsedTime, 0.9), 0.001);
    if (jib.current) jib.current.rotation.y += dt * 0.35;
  });

  return (
    <group ref={root} position={[position[0], PLATFORM_TOP, position[1]]}>
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[0.09, height, 0.09]} />
        <meshStandardMaterial color={GREEN} roughness={0.4} />
      </mesh>
      <group ref={jib} position={[0, height, 0]}>
        <mesh position={[0.55, 0, 0]} castShadow>
          <boxGeometry args={[1.7, 0.07, 0.07]} />
          <meshStandardMaterial color={GREEN} roughness={0.4} />
        </mesh>
        <mesh position={[-0.45, -0.06, 0]}>
          <boxGeometry args={[0.22, 0.16, 0.16]} />
          <meshStandardMaterial color={NAVY} />
        </mesh>
        <mesh position={[1.2, -0.45, 0]}>
          <boxGeometry args={[0.012, 0.9, 0.012]} />
          <meshStandardMaterial color={NAVY} />
        </mesh>
        <mesh position={[1.2, -0.92, 0]}>
          <boxGeometry args={[0.14, 0.08, 0.14]} />
          <meshStandardMaterial color={NAVY} />
        </mesh>
      </group>
    </group>
  );
}

function Tree({ position, scale = 1, delay }: { position: [number, number]; scale?: number; delay: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.scale.setScalar(Math.max(rise(clock.elapsedTime, delay, 0.9), 0.001) * scale);
  });
  return (
    <group ref={ref} position={[position[0], PLATFORM_TOP, position[1]]}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.025, 0.035, 0.24, 6]} />
        <meshStandardMaterial color={NAVY} />
      </mesh>
      <mesh position={[0, 0.36, 0]} castShadow>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color={GREEN} roughness={0.6} flatShading />
      </mesh>
    </group>
  );
}

function City() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const spin = useRef(-0.5);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    spin.current += dt * 0.07;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, spin.current + pointer.current.x * 0.35 + scroll * 0.8, 0.06);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.current.y * 0.06, 0.06);
    g.position.y = THREE.MathUtils.lerp(g.position.y, -scroll * 0.6, 0.08);
  });

  return (
    <group ref={group}>
      {/* Platform */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[3.4, 3.4, 0.3, 96]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      <mesh position={[0, PLATFORM_TOP + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.18, 3.26, 96]} />
        <meshBasicMaterial color={GREEN} />
      </mesh>
      <mesh position={[0, -0.151, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.38, 3.42, 96]} />
        <meshBasicMaterial color={NAVY} side={THREE.DoubleSide} />
      </mesh>

      {/* Logo-inspired towers */}
      <Building position={[-0.25, -0.65]} size={[1.05, 3.6, 1.05]} delay={0.2} seed={3} antenna />
      <Building position={[1.0, -0.35]} size={[0.9, 2.5, 1.0]} delay={0.4} seed={7} />
      <Building position={[-1.45, -0.15]} size={[0.85, 1.8, 0.9]} delay={0.55} seed={11} />
      {/* Multifamily block */}
      <Building position={[0.75, 1.25]} size={[1.6, 1.05, 0.85]} delay={0.75} seed={17} />
      {/* Fix & flip house */}
      <Building position={[-1.25, 1.35]} size={[0.85, 0.62, 0.8]} delay={0.9} seed={23} roof />
      {/* Ground-up construction */}
      <Construction position={[2.1, 0.7]} />
      <Crane position={[2.55, -0.85]} />

      <Tree position={[-2.4, 0.35]} delay={1.2} />
      <Tree position={[-0.2, 2.45]} delay={1.3} scale={0.9} />
      <Tree position={[-2.0, 2.0]} delay={1.35} scale={0.8} />
      <Tree position={[1.9, 2.15]} delay={1.4} />
      <Tree position={[-0.9, -2.3]} delay={1.45} scale={0.85} />
      <Tree position={[2.6, 1.75]} delay={1.5} scale={0.7} />

      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.4}>
        <mesh position={[-2.3, 3.2, -1]} castShadow>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color={GREEN} flatShading roughness={0.3} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={1.5} floatIntensity={1.2}>
        <mesh position={[-2.7, 2.4, 1.4]} rotation={[1.2, 0, 0.3]} castShadow>
          <torusGeometry args={[0.2, 0.07, 16, 40]} />
          <meshStandardMaterial color={NAVY} roughness={0.25} metalness={0.4} />
        </mesh>
      </Float>
      <Float speed={2.4} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[0.4, 4.5, -1.6]} castShadow>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color="#ffffff" />
          <Edges color={NAVY} lineWidth={1.4} />
        </mesh>
      </Float>
    </group>
  );
}

/** Pulls the camera back on narrow (portrait) canvases so the whole city fits. */
function ResponsiveCamera() {
  const camera = useThree((s) => s.camera);
  const { width, height } = useThree((s) => s.size);

  useEffect(() => {
    const f = width / height < 1 ? 1.3 : 1;
    camera.position.set(8.4 * f, 6.4 * f, 9.7 * f);
    camera.lookAt(0, 1.1, 0);
  }, [camera, width, height]);

  return null;
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering when the hero is off-screen.
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
        camera={{ position: [8.4, 6.4, 9.7], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.75} />
        <hemisphereLight args={["#ffffff", "#c9d3f0", 0.7]} />
        <directionalLight
          position={[5, 9, 4]}
          intensity={1.7}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
          shadow-bias={-0.0004}
        />
        <directionalLight position={[-6, 4, -3]} intensity={0.4} color="#dfe7ff" />
        <ResponsiveCamera />
        <City />
        <ContactShadows position={[0, -0.35, 0]} opacity={0.35} scale={12} blur={2.6} far={4} color={NAVY} />
      </Canvas>
    </div>
  );
}
