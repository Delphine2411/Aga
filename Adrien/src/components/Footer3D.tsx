"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color, speed, distort, radius, radiusVarying }: {
    position: [number, number, number],
    color: string,
    speed: number,
    distort: number,
    radius: number,
    radiusVarying?: boolean
}) {
    const mesh = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        mesh.current.rotation.x = Math.cos(time / 4) * speed;
        mesh.current.rotation.y = Math.sin(time / 4) * speed;
        if (radiusVarying) {
            mesh.current.scale.setScalar(Math.sin(time) * 0.1 + 1);
        }
    });

    return (
        <Float speed={speed * 2} rotationIntensity={1} floatIntensity={1}>
            <Sphere ref={mesh} args={[radius, 64, 64]} position={position}>
                <MeshDistortMaterial
                    color={color}
                    speed={speed}
                    distort={distort}
                    radius={radius}
                    emissive={color}
                    emissiveIntensity={0.2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
}

export default function Footer3D() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                <FloatingShape
                    position={[-4, 2, 0]}
                    color="#1d6bc4ff"
                    speed={2}
                    distort={0.4}
                    radius={1.2}
                />
                <FloatingShape
                    position={[4, -2, 1]}
                    color="#0d5394ff"
                    speed={1.5}
                    distort={0.5}
                    radius={0.8}
                />
                <FloatingShape
                    position={[0, 3, -2]}
                    color="#1d6bc4ff"
                    speed={1}
                    distort={0.3}
                    radius={0.5}
                    radiusVarying
                />

                {/* Background particles or extra subtle elements can go here */}
            </Canvas>
        </div>
    );
}
