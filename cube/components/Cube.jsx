"use client";
import React, {useRef } from "react";
import { Canvas } from "@react-three/fiber";
import "@scss/Cube.scss";
import { OrbitControls } from "@react-three/drei";
import { useSpring, useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";

export default function Cube() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const smoothProgress = useSpring(progress, { damping: 20 });

  return (
    <div ref={container} className="main">
      <div className="cube">
        <Canvas>
          <OrbitControls enableZoom={false} enablePan={false} />
          <ambientLight intensity={1} />
          <directionalLight position={[12,2, 10]} />
          <CubeTexture progress={smoothProgress} />
        </Canvas>
      </div>
    </div>
  );
}

function CubeTexture({ progress }) {
  const mesh = useRef(null);

  return (
    <motion.mesh ref={mesh} rotation-y={progress} rotation-x={progress}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial color={"blue"} />
    </motion.mesh>
  );
}
