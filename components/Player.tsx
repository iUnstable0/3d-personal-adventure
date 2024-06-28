import { useState, useRef, useEffect } from "react";

import { useFrame } from "@react-three/fiber";

import { useKeyboardControls } from "@react-three/drei";

function Player(props) {
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    const {
      forward,
      backward,
      leftward,
      rightward,
    }: {
      forward: boolean;
      backward: boolean;
      leftward: boolean;
      rightward: boolean;
    } = getKeys();

    const impulse;
  });
}

export default Player;
