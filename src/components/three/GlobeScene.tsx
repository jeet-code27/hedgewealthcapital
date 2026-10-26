"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import land from "@/lib/globe-land.json";

const NAVY = "#192861";
const GREEN = "#7AC644";
const R = 2;

/** Lat/lon (degrees) to a point on the globe; lon -98 faces +Z (the camera) before tilting. */
function toVec(lat: number, lon: number, r = R) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

const isUS = (lat: number, lon: number) => lat > 24.5 && lat < 49.5 && lon > -125 && lon < -66.5;

// Office (Canton, MA) and a spread of U.S. metros to illustrate nationwide lending.
const HQ: [number, number] = [42.16, -71.14];
const CITIES: [number, number][] = [
  [25.76, -80.19],
  [33.75, -84.39],
  [41.88, -87.63],
  [32.78, -96.8],
  [29.76, -95.37],
  [39.74, -104.99],
  [33.45, -112.07],
  [34.05, -118.24],
  [37.77, -122.42],
  [47.61, -122.33],
  [44.98, -93.27],
  [36.17, -86.78],
];

/** Every land point from the world map as a dot; the continental U.S. glows green. */
function LandDots() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const pts = useMemo(() => {
    const out: { v: THREE.Vector3; us: boolean }[] = [];
    for (let i = 0; i < land.length; i += 2) out.push({ v: toVec(land[i], land[i + 1], R + 0.005), us: isUS(land[i], land[i + 1]) });
    return out;
  }, []);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Object3D();
    const base = new THREE.Color("#aebcf0");
    const green = new THREE.Color(GREEN);
    pts.forEach((p, i) => {
      m.position.copy(p.v);
      m.lookAt(0, 0, 0);
      m.scale.setScalar(p.us ? 1.25 : 1);
      m.updateMatrix();
      mesh.setMatrixAt(i, m.matrix);
      mesh.setColorAt(i, p.us ? green : base);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [pts]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, pts.length]}>
      <circleGeometry args={[0.019, 8]} />
      <meshBasicMaterial side={THREE.DoubleSide} toneMapped={false} />
    </instancedMesh>
  );
}

/** Soft rim light around the globe edge (fresnel), drawn on the back faces of a slightly larger sphere. */
function Atmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { color: { value: new THREE.Color(GREEN) } },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 color;
          varying vec3 vNormal;
          void main() {
            float i = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
            gl_FragColor = vec4(color, clamp(i * 1.2, 0.0, 0.6));
          }`,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      }),
    [],
  );
  return (
    <mesh scale={1.09}>
      <sphereGeometry args={[R, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function Arc({ from, to, index }: { from: THREE.Vector3; to: THREE.Vector3; index: number }) {
  const line = useRef<{ material: { dashOffset: number } } | null>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(R * (1 + from.distanceTo(to) * 0.28));
    return new THREE.QuadraticBezierCurve3(from, mid, to);
  }, [from, to]);
  const points = useMemo(() => curve.getPoints(48), [curve]);

  useFrame(({ clock }, dt) => {
    if (line.current) line.current.material.dashOffset -= dt * 0.5;
    if (pulse.current) {
      const t = (clock.elapsedTime * 0.35 + index * 0.21) % 1;
      pulse.current.position.copy(curve.getPoint(t));
      pulse.current.scale.setScalar(0.6 + Math.sin(t * Math.PI) * 0.6);
    }
  });

  return (
    <>
      <Line ref={line as never} points={points} color={GREEN} lineWidth={1.4} dashed dashSize={0.08} gapSize={0.06} transparent opacity={0.85} />
      <mesh ref={pulse}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#d9f7c4" toneMapped={false} />
      </mesh>
    </>
  );
}

function Marker({ position, hq, phase = 0 }: { position: THREE.Vector3; hq?: boolean; phase?: number }) {
  const ring = useRef<THREE.Mesh>(null);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), position.clone().normalize()), [position]);

  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = (clock.elapsedTime * 0.7 + phase) % 1;
    ring.current.scale.setScalar(1 + t * 2);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.8 * (1 - t);
  });

  return (
    <group position={position} quaternion={quat}>
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[hq ? 0.065 : 0.04, 24]} />
        <meshBasicMaterial color={hq ? "#ffffff" : GREEN} toneMapped={false} />
      </mesh>
      <mesh ref={ring} position={[0, 0, 0.012]}>
        <ringGeometry args={[0.055, 0.075, 32]} />
        <meshBasicMaterial color={GREEN} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

function Globe() {
  const spin = useRef<THREE.Group>(null);
  const hq = useMemo(() => toVec(...HQ, R + 0.02), []);
  const cities = useMemo(() => CITIES.map(([la, lo]) => toVec(la, lo, R + 0.02)), []);

  // Gentle sway that keeps North America in view.
  useFrame(({ clock }) => {
    if (spin.current) spin.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.45;
  });

  return (
    <group rotation={[0.62, 0, 0]}>
      <group ref={spin}>
        <mesh>
          <sphereGeometry args={[R, 96, 96]} />
          <meshStandardMaterial color={NAVY} roughness={0.55} metalness={0.15} emissive="#0d1640" emissiveIntensity={0.6} />
        </mesh>
        <LandDots />
        {cities.map((c, i) => (
          <group key={i}>
            <Arc from={hq} to={c} index={i} />
            <Marker position={c} phase={i * 0.29} />
          </group>
        ))}
        <Marker position={hq} hq />
      </group>
      <Atmosphere />
    </group>
  );
}

export default function GlobeScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    // Drag-to-rotate only with a mouse, so touch users can still scroll past the globe.
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", update);
    };
  }, []);

  return (
    <div ref={wrap} className={`absolute inset-0 ${finePointer ? "cursor-grab active:cursor-grabbing" : ""}`}>
      <Canvas dpr={[1, 2]} frameloop={visible ? "always" : "never"} camera={{ position: [0, 0, 7.1], fov: 40 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[-4, 3, 5]} intensity={2.2} color="#dfe7ff" />
        <pointLight position={[4, -2, 3]} intensity={6} color={GREEN} distance={10} />
        <Globe />
        <OrbitControls
          enabled={finePointer}
          enableZoom={false}
          enablePan={false}
          enableDamping
          rotateSpeed={0.5}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.7}
        />
      </Canvas>
    </div>
  );
}
