import React from "react";

function LightBulb(props) {
  return (
    <mesh {...props}>
      <pointLight castShadow intensity={10} color={"white"} />
      <sphereGeometry args={[0.2, 30, 10]} />
      <meshPhongMaterial emissive={"yellow"} />
    </mesh>
  );
}

export default LightBulb;
