"use client";

import { Suspense, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { useReducedMotion } from "motion/react";
import { desk } from "@/data/projects";

/**
 * The character as a real-time 3D object — Y2K/PS2-era style: smooth-shaded
 * rounded geometry, tapered limbs, and a three-light studio rig. Built
 * entirely from parametric primitives (rounded boxes, cylinders, spheres),
 * plus a GTA-flavored cardboard box prop. Drag spins the stage, the head
 * follows the cursor, idle breathing keeps it alive.
 *
 * Drop a real model at /public/objects/character.glb and it replaces the
 * primitive build automatically (normalized to the same height).
 */

const C = {
    skin: "#d9a184",
    skinShade: "#c8916f",
    tattoo: "#a08a86",
    tee: "#eceae3",
    jeans: "#23252b",
    shoe: "#191a1c",
    sole: "#eeece5",
    cap: "#5f7048",
    capDark: "#49573a",
    beard: "#6a5342",
    eye: "#1f1c19",
    watch: "#1e1e1e",
    box: "#b9946a",
    boxTape: "#d8c8a6",
    boxSeam: "#8f6f4c",
};

type V3 = [number, number, number];

/** Rounded box — the workhorse of the PS2 look. */
function RB({
    p,
    s,
    r = 0.03,
    c,
    rot,
    rough = 0.85,
}: {
    p: V3;
    s: V3;
    r?: number;
    c: string;
    rot?: V3;
    rough?: number;
}) {
    const geometry = useMemo(
        () => new RoundedBoxGeometry(s[0], s[1], s[2], 4, r),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [s[0], s[1], s[2], r],
    );
    return (
        <mesh geometry={geometry} position={p} rotation={rot} castShadow receiveShadow>
            <meshStandardMaterial color={c} roughness={rough} metalness={0} />
        </mesh>
    );
}

/** Tapered cylinder with an optional oval cross-section (scaleZ). */
function Cyl({
    p,
    rt,
    rb,
    h,
    c,
    sz = 1,
    rot,
    rough = 0.85,
}: {
    p: V3;
    rt: number;
    rb: number;
    h: number;
    c: string;
    sz?: number;
    rot?: V3;
    rough?: number;
}) {
    return (
        <mesh position={p} rotation={rot} scale={[1, 1, sz]} castShadow receiveShadow>
            <cylinderGeometry args={[rt, rb, h, 24]} />
            <meshStandardMaterial color={c} roughness={rough} metalness={0} />
        </mesh>
    );
}

function Sph({
    p,
    r,
    c,
    sc = [1, 1, 1],
    rough = 0.7,
}: {
    p: V3;
    r: number;
    c: string;
    sc?: V3;
    rough?: number;
}) {
    return (
        <mesh position={p} scale={sc} castShadow receiveShadow>
            <sphereGeometry args={[r, 24, 18]} />
            <meshStandardMaterial color={c} roughness={rough} metalness={0} />
        </mesh>
    );
}

function PrimitiveLukas({
    headRef,
    chestRef,
}: {
    headRef: RefObject<THREE.Group | null>;
    chestRef: RefObject<THREE.Group | null>;
}) {
    return (
        <group>
            {/* ——— sneakers ——— */}
            {[-0.16, 0.16].map((x) => (
                <group key={x} position={[x, 0, 0.03]}>
                    <RB p={[0, 0.035, 0]} s={[0.19, 0.07, 0.4]} r={0.025} c={C.sole} rough={0.6} />
                    <RB p={[0, 0.115, -0.015]} s={[0.17, 0.11, 0.35]} r={0.045} c={C.shoe} rough={0.5} />
                    {/* toe cap */}
                    <RB p={[0, 0.09, 0.15]} s={[0.15, 0.07, 0.1]} r={0.03} c={C.sole} rough={0.55} />
                </group>
            ))}

            {/* ——— baggy jeans ——— */}
            <Cyl p={[-0.13, 0.62, 0]} rt={0.125} rb={0.155} h={0.88} c={C.jeans} sz={0.92} />
            <Cyl p={[0.13, 0.62, 0]} rt={0.125} rb={0.155} h={0.88} c={C.jeans} sz={0.92} />
            <RB p={[0, 1.04, 0]} s={[0.43, 0.24, 0.28]} r={0.09} c={C.jeans} />

            {/* ——— chest group (breathes) ——— */}
            <group ref={chestRef}>
                {/* oversized tee — tapered oval trunk */}
                <Cyl p={[0, 1.4, 0]} rt={0.33} rb={0.285} h={0.6} c={C.tee} sz={0.66} />
                {/* shoulder caps */}
                <Sph p={[-0.27, 1.66, 0]} r={0.11} c={C.tee} sc={[1, 0.85, 0.9]} rough={0.85} />
                <Sph p={[0.27, 1.66, 0]} r={0.11} c={C.tee} sc={[1, 0.85, 0.9]} rough={0.85} />
                {/* short sleeves, angled out */}
                <Cyl p={[-0.35, 1.53, 0]} rt={0.105} rb={0.12} h={0.26} c={C.tee} rot={[0, 0, 0.32]} sz={0.9} />
                <Cyl p={[0.35, 1.53, 0]} rt={0.105} rb={0.12} h={0.26} c={C.tee} rot={[0, 0, -0.32]} sz={0.9} />
                {/* forearms — his left (viewer right) is the tattoo sleeve */}
                <Cyl p={[-0.415, 1.18, 0]} rt={0.055} rb={0.048} h={0.42} c={C.skin} rot={[0, 0, 0.08]} rough={0.6} />
                <Cyl p={[0.415, 1.18, 0]} rt={0.055} rb={0.048} h={0.42} c={C.tattoo} rot={[0, 0, -0.08]} rough={0.6} />
                {/* watch */}
                <Cyl p={[-0.428, 1.04, 0]} rt={0.062} rb={0.062} h={0.04} c={C.watch} rot={[0, 0, 0.08]} rough={0.4} />
                {/* fists */}
                <Sph p={[-0.44, 0.94, 0.01]} r={0.075} c={C.skin} sc={[1, 1.1, 1]} rough={0.6} />
                <Sph p={[0.44, 0.94, 0.01]} r={0.075} c={C.skin} sc={[1, 1.1, 1]} rough={0.6} />
                {/* neck */}
                <Cyl p={[0, 1.73, 0]} rt={0.07} rb={0.08} h={0.12} c={C.skinShade} rough={0.6} />
            </group>

            {/* ——— head group (pivots at the neck for cursor-follow) ——— */}
            <group ref={headRef} position={[0, 1.78, 0]}>
                {/* skull */}
                <RB p={[0, 0.13, 0]} s={[0.3, 0.34, 0.32]} r={0.12} c={C.skin} rough={0.6} />
                {/* beard hugging the jaw */}
                <RB p={[0, 0.035, 0.02]} s={[0.27, 0.15, 0.3]} r={0.1} c={C.beard} rough={0.9} />
                {/* nose */}
                <RB p={[0, 0.12, 0.16]} s={[0.05, 0.08, 0.06]} r={0.02} c={C.skinShade} rough={0.6} />
                {/* ears */}
                <RB p={[-0.155, 0.13, 0]} s={[0.035, 0.08, 0.055]} r={0.016} c={C.skinShade} rough={0.6} />
                <RB p={[0.155, 0.13, 0]} s={[0.035, 0.08, 0.055]} r={0.016} c={C.skinShade} rough={0.6} />
                {/* eyes + brows */}
                <Sph p={[-0.065, 0.17, 0.145]} r={0.021} c={C.eye} rough={0.3} />
                <Sph p={[0.065, 0.17, 0.145]} r={0.021} c={C.eye} rough={0.3} />
                <RB p={[-0.065, 0.215, 0.147]} s={[0.07, 0.016, 0.02]} r={0.007} c={C.beard} />
                <RB p={[0.065, 0.215, 0.147]} s={[0.07, 0.016, 0.02]} r={0.007} c={C.beard} />

                {/* ——— camo cap ——— */}
                {/* dome */}
                <mesh position={[0, 0.255, 0]} scale={[1, 0.72, 1.02]} castShadow>
                    <sphereGeometry args={[0.19, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
                    <meshStandardMaterial color={C.cap} roughness={0.9} metalness={0} />
                </mesh>
                {/* band */}
                <Cyl p={[0, 0.265, 0]} rt={0.186} rb={0.192} h={0.06} c={C.cap} sz={1.02} rough={0.9} />
                {/* camo patches */}
                <Sph p={[0.09, 0.36, 0.09]} r={0.05} c={C.capDark} sc={[1, 0.3, 1]} rough={0.95} />
                <Sph p={[-0.1, 0.37, -0.03]} r={0.045} c={C.capDark} sc={[1, 0.28, 1.2]} rough={0.95} />
                <Sph p={[0.02, 0.35, -0.13]} r={0.04} c={C.capDark} sc={[1.3, 0.3, 1]} rough={0.95} />
                {/* brim */}
                <RB p={[0, 0.25, 0.27]} s={[0.28, 0.035, 0.24]} r={0.017} c={C.cap} rot={[-0.12, 0, 0]} rough={0.9} />
                {/* top button */}
                <Sph p={[0, 0.395, 0]} r={0.022} c={C.capDark} sc={[1, 0.6, 1]} />
            </group>
        </group>
    );
}

/** GTA-style cardboard box prop (ref: SA model 1220 "cardboardbox2"). */
function CardboardBox({ position, rotationY }: { position: V3; rotationY: number }) {
    return (
        <group position={position} rotation={[0, rotationY, 0]}>
            <RB p={[0, 0.23, 0]} s={[0.6, 0.46, 0.6]} r={0.02} c={C.box} rough={0.95} />
            {/* top flap seam */}
            <RB p={[0, 0.462, 0]} s={[0.6, 0.012, 0.03]} r={0.005} c={C.boxSeam} />
            {/* packing tape across the seam and down the sides */}
            <RB p={[0, 0.468, 0]} s={[0.15, 0.014, 0.605]} r={0.005} c={C.boxTape} rough={0.5} />
            <RB p={[0, 0.35, 0.303]} s={[0.15, 0.24, 0.012]} r={0.005} c={C.boxTape} rough={0.5} />
            <RB p={[0, 0.35, -0.303]} s={[0.15, 0.24, 0.012]} r={0.005} c={C.boxTape} rough={0.5} />
        </group>
    );
}

function GLBCharacter({ url }: { url: string }) {
    const gltf = useLoader(GLTFLoader, url);
    const scene = useMemo(() => {
        const s = gltf.scene.clone(true);
        s.traverse((o) => {
            o.castShadow = true;
            o.receiveShadow = true;
        });
        const bounds = new THREE.Box3().setFromObject(s);
        const size = new THREE.Vector3();
        bounds.getSize(size);
        const scale = 2.0 / (size.y || 1);
        s.scale.setScalar(scale);
        const scaled = new THREE.Box3().setFromObject(s);
        s.position.x -= (scaled.min.x + scaled.max.x) / 2;
        s.position.z -= (scaled.min.z + scaled.max.z) / 2;
        s.position.y -= scaled.min.y;
        return s;
    }, [gltf]);
    return <primitive object={scene} />;
}

interface StageControls {
    rotY: number;
    dragging: boolean;
}

function Scene({
    controls,
    reduced,
    glbUrl,
}: {
    controls: RefObject<StageControls>;
    reduced: boolean;
    glbUrl: string | null;
}) {
    const root = useRef<THREE.Group>(null);
    const head = useRef<THREE.Group>(null);
    const chest = useRef<THREE.Group>(null);

    // Frame the full body + box: set the camera imperatively — the Canvas
    // constructor prop proved unreliable for position here.
    const camera = useThree((s) => s.camera);
    useEffect(() => {
        camera.position.set(0, 1.0, 5.6);
        camera.lookAt(0, 1.0, 0);
        camera.updateProjectionMatrix();
    }, [camera]);

    useFrame((state, delta) => {
        const c = controls.current;
        if (root.current) {
            const sway = reduced || c.dragging ? 0 : state.pointer.x * 0.1;
            root.current.rotation.y = THREE.MathUtils.damp(
                root.current.rotation.y,
                c.rotY + sway,
                4,
                delta,
            );
        }
        if (head.current) {
            const targetY = reduced || c.dragging ? 0 : state.pointer.x * 0.45;
            const targetX = reduced || c.dragging ? 0 : -state.pointer.y * 0.22;
            head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, targetY, 5, delta);
            head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, targetX, 5, delta);
        }
        if (chest.current && !reduced) {
            chest.current.position.y = Math.sin(state.clock.elapsedTime * 1.6) * 0.008;
        }
    });

    return (
        <>
            {/* Y2K studio rig: key + cool fill + warm rim */}
            <hemisphereLight args={["#ffffff", "#cfcabe", 0.55]} />
            <directionalLight
                position={[2.5, 4.5, 3]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <directionalLight position={[-3.5, 2, 1.5]} intensity={0.5} color="#dfe6ee" />
            <directionalLight position={[-1.5, 3.5, -3]} intensity={0.9} color="#fff4e0" />
            <group ref={root}>
                {glbUrl ? (
                    <Suspense fallback={<PrimitiveLukas headRef={head} chestRef={chest} />}>
                        <GLBCharacter url={glbUrl} />
                    </Suspense>
                ) : (
                    <PrimitiveLukas headRef={head} chestRef={chest} />
                )}
                <CardboardBox position={[-0.72, 0, 0.3]} rotationY={0.7} />
            </group>
            <mesh rotation-x={-Math.PI / 2} position={[0, 0.001, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <shadowMaterial opacity={0.16} />
            </mesh>
        </>
    );
}

/** Detect an optional drop-in GLB without letting the loader throw. */
function useOptionalGlb(url: string) {
    const [available, setAvailable] = useState<string | null>(null);
    useEffect(() => {
        let cancelled = false;
        fetch(url, { method: "HEAD" })
            .then((res) => {
                if (!cancelled && res.ok) setAvailable(url);
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, [url]);
    return available;
}

export function Character3D({ onCharacterClick }: { onCharacterClick: () => void }) {
    const reduced = useReducedMotion() ?? false;
    const controls = useRef<StageControls>({ rotY: 0, dragging: false });
    const lastX = useRef(0);
    const moved = useRef(0);
    const glbUrl = useOptionalGlb(desk.character.glb);

    return (
        <button
            type="button"
            aria-haspopup="dialog"
            aria-label={`${desk.character.alt} — drag to spin, click to open about`}
            className="block h-full w-full cursor-grab touch-none active:cursor-grabbing"
            onPointerDown={(e) => {
                controls.current.dragging = true;
                lastX.current = e.clientX;
                moved.current = 0;
                e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
                if (!controls.current.dragging) return;
                const dx = e.clientX - lastX.current;
                controls.current.rotY += dx * 0.012;
                moved.current += Math.abs(dx);
                lastX.current = e.clientX;
            }}
            onPointerUp={() => {
                controls.current.dragging = false;
            }}
            onPointerCancel={() => {
                controls.current.dragging = false;
            }}
            onClick={() => {
                if (moved.current < 8) onCharacterClick();
            }}
        >
            <Canvas
                shadows
                camera={{ fov: 30 }}
                gl={{ antialias: true, alpha: true }}
                className="pointer-events-none"
            >
                <Scene controls={controls} reduced={reduced} glbUrl={glbUrl} />
            </Canvas>
        </button>
    );
}
