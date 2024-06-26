import { useState, useRef } from "react";

import { useFrame } from "@react-three/fiber";

import { motion } from "framer-motion-3d";
import * as THREE from "three";

import Floor from "@/components/Floor";
import Draggable from "@/components/Draggable";

import { OrbitControls } from "@react-three/drei";

function Scene(props) {
  const [isDragging, setIsDragging] = useState(false);
  const pointLightRef = useRef(null);

  useFrame(() => {
    if (pointLightRef.current) {
      // pointLightRef.current.intensity = Math.sin(performance.now() / 50) * 50;
    }
  });

  return (
    <>
      <ambientLight color={"white"} intensity={Math.PI / 24} />

      <mesh position={[0, 3, 0]}>
        <pointLight
          castShadow
          intensity={0}
          color={"white"}
          ref={pointLightRef}
        />
        <sphereGeometry args={[0.2, 30, 10]} />
        <motion.meshPhongMaterial
          emissive={"yellow"}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 10,
          }}
        />
      </mesh>

      <Draggable
        setIsDragging={setIsDragging}
        floorPlane={new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial color="white" />
        </mesh>
      </Draggable>

      <OrbitControls enabled={!isDragging} />
      <Floor position={[0, -1, 0]} />
    </>
  );
}

export default Scene;
