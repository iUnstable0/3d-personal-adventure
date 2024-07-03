import React, { useState, useRef, useEffect } from "react";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Vector3 } from "three";

interface DraggableProps {
  children: React.ReactNode;
  setIsDragging: (isDragging: boolean) => void;
  floorPlane: THREE.Plane;
}

function Draggable({ children, setIsDragging, floorPlane }: DraggableProps) {
  const groupRef = useRef<THREE.Group>();
  const [initialPos, setInitialPos] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [pos, setPos] = useState<[number, number, number]>(initialPos);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const planeIntersectPoint = new Vector3();

  useEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current);
      const center = box.getCenter(new THREE.Vector3());
      setInitialPos([center.x, center.y, center.z]);
      setPos([center.x, center.y, center.z]);
    }
  }, [children]);

  const [spring, api] = useSpring(() => ({
    position: pos,
    scale: 1,
    // rotation: [0, 0, 0] as [number, number, number],
    config: { friction: 10 },
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      setIsDragging(active);

      if (active) {
        const threeEvent = event as unknown as ThreeEvent<PointerEvent>;
        if (threeEvent.ray) {
          threeEvent.ray.intersectPlane(floorPlane, planeIntersectPoint);
          setPos([
            planeIntersectPoint.x,
            planeIntersectPoint.y,
            planeIntersectPoint.z,
          ]);
        }
      }

      api.start({
        position: pos,
        scale: active ? 1.2 : 1,
        // rotation: [y / aspect, x / aspect, 0] as [number, number, number],
      });
      return timeStamp;
    },
    { delay: true },
  );

  return (
    <animated.group
      ref={groupRef}
      position={spring.position as any}
      scale={spring.scale}
      // rotation={spring.rotation as any}
      {...(bind() as any)}
    >
      {children}
    </animated.group>
  );
}

export default Draggable;
