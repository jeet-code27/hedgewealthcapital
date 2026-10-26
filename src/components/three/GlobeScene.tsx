"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const NAVY = "#192861";
const GREEN = "#7AC644";
const R = 2;

/** Lat/lon (degrees) to a point on the globe, oriented so North America faces the camera at rest. */
function toVec(lat: number, lon: number, r = R) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

// Office (Canton, MA) and a spread of U.S. metros to illustrate nationwide lending.
const HQ: [number, number] = [42.16, -71.14];
const CITIES: [number, number][] = [
  [40.71, -74.0],
  [39.29, -76.61],
  [33.75, -84.39],
  [25.76, -80.19],
  [41.88, -87.63],
  [32.78, -96.8],
  [29.76, -95.37],
  [39.74, -104.99],
  [33.45, -112.07],
  [34.05, -118.24],
  [47.61, -122.33],
  [36.17, -86.78],
  [44.98, -93.27],
  [35.23, -80.84],
];

function Dots() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 2600;
  const positions = useMemo(() => {
    // Fibonacci sphere for an even dot grid.
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push(new THREE.Vector3(Math.cos(t) * rad * R, y * R, Math.sin(t) * rad * R));
    }
    return pts;
  }, []);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Object3D();
    positions.forEach((p, i) => {
      m.position.copy(p);
      m.lookAt(0, 0, 0);
      m.updateMatrix();
      mesh.setMatrixAt(i, m.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [positions]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <circleGeometry args={[0.014, 6]} />
      <meshBasicMaterial color={NAVY} transparent opacity={0.32} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

function Arc({ from, to, delay }: { from: THREE.Vector3; to: THREE.Vector3; delay: number }) {
  const ref = useRef<{ material: { dashOffset: number } } | null>(null);
  const points = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5);
    const lift = 1 + from.distanceTo(to) * 0.35;
    mid.normalize().multiplyScalar(R * lift);
    return new THREE.QuadraticBezierCurve3(from, mid, to).getPoints(40);
  }, [from, to]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.material.dashOffset -= dt * (0.6 + delay * 0.1);
  });

  return (
    <Line
      ref={ref as never}
      points={points}
      color={GREEN}
      lineWidth={1.6}
      dashed
      dashSize={0.18}
      gapSize={0.12}
      transparent
      opacity={0.9}
    />
  );
}

function Marker({ position, hq, phase = 0 }: { position: THREE.Vector3; hq?: boolean; phase?: number }) {
  const ring = useRef<THREE.Mesh>(null);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), position.clone().normalize()), [position]);

  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = (clock.elapsedTime * 0.8 + phase) % 1;
    ring.current.scale.setScalar(1 + t * 1.6);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - t);
  });

  return (
    <group position={position} quaternion={quat}>
      <mesh>
        <circleGeometry args={[hq ? 0.07 : 0.045, 20]} />
        <meshBasicMaterial color={hq ? NAVY : GREEN} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring} position={[0, 0, 0.002]}>
        <ringGeometry args={[0.05, 0.07, 28]} />
        <meshBasicMaterial color={GREEN} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Globe() {
  const hq = useMemo(() => toVec(...HQ, R + 0.01), []);
  const cities = useMemo(() => CITIES.map(([la, lo]) => toVec(la, lo, R + 0.01)), []);

  return (
    // Tilted so the continental U.S. sits front and centre.
    <group rotation={[0.55, 0.15, 0]}>
      <mesh>
        <sphereGeometry args={[R - 0.02, 64, 64]} />
        <meshBasicMaterial color="#f7f9fd" />
      </mesh>
      <mesh>
        <sphereGeometry args={[R * 1.08, 48, 48]} />
        <meshBasicMaterial color={GREEN} transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      {[-60, -30, 0, 30, 60].map((lat) => {
        const r = R * Math.cos(THREE.MathUtils.degToRad(lat)) + 0.004;
        return (
          <mesh key={`lat${lat}`} position={[0, R * Math.sin(THREE.MathUtils.degToRad(lat)), 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r, 0.004, 6, 120]} />
            <meshBasicMaterial color={NAVY} transparent opacity={0.12} />
          </mesh>
        );
      })}
      {[0, 30, 60, 90, 120, 150].map((lon) => (
        <mesh key={`lon${lon}`} rotation={[0, THREE.MathUtils.degToRad(lon), 0]}>
          <torusGeometry args={[R + 0.004, 0.004, 6, 120]} />
          <meshBasicMaterial color={NAVY} transparent opacity={0.12} />
        </mesh>
      ))}
      <Dots />
      {cities.map((c, i) => (
        <group key={i}>
          <Marker position={c} phase={i * 0.37} />
          <Arc from={hq} to={c} delay={i} />
        </group>
      ))}
      <Marker position={hq} hq />
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
      <Canvas dpr={[1, 1.75]} frameloop={visible ? "always" : "never"} camera={{ position: [0, 0, 7.4], fov: 40 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 5, 6]} intensity={1.2} />
        <Globe />
        <OrbitControls enabled={finePointer} enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} rotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
