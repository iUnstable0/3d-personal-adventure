import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";

function Light(props: any) {
	const light = useRef<any>();

	useFrame((state) => {
		light.current.position.x = state.camera.position.x + 2.5 - 4;
		light.current.target.position.x = state.camera.position.x - 4;
		light.current.position.z = state.camera.position.z - 7.25 + 1;
		light.current.target.position.z = state.camera.position.z - 7.25;

		light.current.target.updateMatrixWorld();
	});

	return (
		<>
			<directionalLight
				castShadow
				position={[0, 4, 0]} // Adjusted initial position
				intensity={1.5}
				shadow-mapSize={[1024, 1024]}
				shadow-camera-near={1}
				shadow-camera-far={10}
				shadow-camera-top={10}
				shadow-camera-right={10}
				shadow-camera-bottom={-10}
				shadow-camera-left={-10}
				ref={light}
			/>
			<ambientLight intensity={0.5} />
		</>
	);
}

export default Light;
