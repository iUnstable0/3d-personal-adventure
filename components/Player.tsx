import { useState, useRef, useEffect } from "react";

import { useFrame } from "@react-three/fiber";

import { useKeyboardControls } from "@react-three/drei";

import { RigidBody } from "@react-three/rapier";

import * as THREE from "three";

function Player(props: any) {
	const playerRef = useRef<any>();

	const [smoothedCameraPosition] = useState(
		() => new THREE.Vector3(10, 10, 10)
	);
	const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

	const [subscribeKeys, getKeys] = useKeyboardControls();

	useFrame((state, delta) => {
		const { forward, backward, leftward, rightward } = getKeys();

		const impulse = { x: 0, y: 0, z: 0 };
		const torque = { x: 0, y: 0, z: 0 };

		const impulseStrength = 1.6 * delta;
		const torqueStrength = 0 * delta;

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
			// console.log(playerRef.current);
			playerRef.current.applyImpulse(impulse);
			playerRef.current.applyTorqueImpulse(torque);

			const position = playerRef.current.translation();

			const cameraPosition = new THREE.Vector3();
			cameraPosition.copy(position);
			cameraPosition.z += 14.25;
			cameraPosition.y += 4.65;
			// cameraPosition.z += 4.25;
			// cameraPosition.y += 2.65;

			const cameraTarget = new THREE.Vector3();
			cameraTarget.copy(position);
			cameraTarget.y += 0.25;

			smoothedCameraPosition.lerp(cameraPosition, 7 * delta);
			smoothedCameraTarget.lerp(cameraTarget, 7 * delta);

			state.camera.position.copy(smoothedCameraPosition);
			state.camera.lookAt(smoothedCameraTarget);
		}
	});

	return (
		<RigidBody
			colliders={"ball"}
			ref={playerRef}
			canSleep={false}
			restitution={0.5}
			friction={1}
			linearDamping={0.5}
			angularDamping={0.5}
		>
			<mesh {...props} castShadow>
				<pointLight intensity={10} color={[5, 2, 1]} castShadow />
				<sphereGeometry args={[0.3, 30, 10]} />
				<meshStandardMaterial
					color={[5, 2, 1]}
					emissive={[5, 2, 1]}
					emissiveIntensity={2}
				/>
			</mesh>
		</RigidBody>
	);
}

export default Player;
