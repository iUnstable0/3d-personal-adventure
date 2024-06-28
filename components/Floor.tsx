import React from "react";
// import { BoxGeometry } from "three";

function Floor(props) {
  return (
    <mesh {...props} receiveShadow>
      <boxGeometry args={[40, 4, 40]} />
      <meshPhysicalMaterial color="white" />
    </mesh>
  );
}

export default Floor;
