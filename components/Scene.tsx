import { useState, useRef, useEffect } from "react";

import { useFrame } from "@react-three/fiber";

import { Perf } from "r3f-perf";

import { motion } from "framer-motion-3d";

import { Physics, RigidBody, useRapier } from "@react-three/rapier";

import * as THREE from "three";
import Floor from "@/components/Floor";
import Draggable from "@/components/Draggable";

import { useKeyboardControls } from "@react-three/drei";

import { OrbitControls, PivotControls } from "@react-three/drei";

function Scene(props) {
  const [isDragging, setIsDragging] = useState(false);
  const pointLightRef = useRef(null);
  const playerRef = useRef(null);

  const { rapier, world } = useRapier();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    if (pointLightRef.current) {
      // console.log(pointLightRef.current.intensity);
      if (pointLightRef.current.intensity < 20) {
        pointLightRef.current.intensity += 0.1;
      }
    }

    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 26.6 * delta;
    const torqueStrength = 0.2 * delta;
    // const torqueStrength = 0;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (playerRef.current) {
      playerRef.current.applyImpulse(impulse);
      playerRef.current.applyTorqueImpulse(torque);
    }
  });

  useEffect(() => {
    const unsubscribe = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const jump = () => {
    if (playerRef.current) {
      const origin = playerRef.current.translation();
      origin.y -= 0.71;
      const direction = { x: 0, y: -1, z: 0 };
      const ray = new rapier.Ray(origin, direction);
      const hit = world.castRay(ray, 10, true);

      console.log(hit);

      if (hit == null || hit.timeOfImpact < 0.015)
        playerRef.current.applyImpulse({ x: 0, y: 5.5, z: 0 });
    }
  };

  return (
    <>
      {/*<ambientLight color={"white"} intensity={Math.PI / 6} />*/}
      <directionalLight
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />

      {/*<PivotControls*/}
      {/*  depthTest={false}*/}
      {/*  fixed={true}*/}
      {/*  scale={100}*/}
      {/*  anchor={[0, 0, 0]}*/}
      {/*>*/}

      <Perf />
      <RigidBody
        colliders={"ball"}
        ref={playerRef}
        canSleep={false}
        restitution={0.5}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <mesh position={[0, 3, 0]}>
          <pointLight
            castShadow
            intensity={0}
            color={"white"}
            ref={pointLightRef}
          />
          <sphereGeometry args={[0.7, 30, 10]} />
          <motion.meshPhongMaterial
            emissive={"yellow"}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 2,
            }}
          />
        </mesh>
      </RigidBody>

      {/*</PivotControls>*/}
      <RigidBody>
        <Draggable
          setIsDragging={setIsDragging}
          floorPlane={new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)}
        >
          {/*<RigidBody>*/}
          {/*<PivotControls depthTest={false} fixed={true} scale={100}>*/}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="limegreen" />
          </mesh>
          {/*</PivotControls>*/}
          {/*</RigidBody>*/}
        </Draggable>
      </RigidBody>

      <RigidBody type={"fixed"}>
        <Floor position={[0, -1, 0]} />
      </RigidBody>

      <OrbitControls enabled={!isDragging} makeDefault />
    </>
  );
}

export default Scene;
