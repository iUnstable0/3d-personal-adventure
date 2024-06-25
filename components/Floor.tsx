import React from "react";
// import { BoxGeometry } from "three";

function Floor(props) {
  return (
    <mesh {...props} receiveShadow>
      <boxGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial color="white" />
    </mesh>
  );
}

export default Floor;
