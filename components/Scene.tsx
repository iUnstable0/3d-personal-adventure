import { useState, useRef, useEffect } from "react";

import { Text3D, Center, useGLTF } from "@react-three/drei";

import { DateTime } from "luxon";

import { RigidBody } from "@react-three/rapier";

function Scene(props: any) {
	const [cubes, setCubes] = useState(10);

	const model = useGLTF("./hamburger-draco.glb");

	const getAge = () => {
		const birthday = DateTime.local(2007, 4, 8);
		const now = DateTime.local();

		const duration = now
			.diff(birthday, [
				"years",
				"months",
				"days",
				"hours",
				"minutes",
				"seconds",
				"milliseconds",
			])
			.toObject();

		return `I'm ${duration.years} years, ${duration.months} months, ${duration.days} days, ${duration.hours} hours, ${duration.minutes} minutes, and ${duration.seconds} seconds old`;
	};

	const [age, setAge] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			setAge(getAge());
		}, 1);

		// let shuffledGreetings = [...greetings];

		// for (let i = shuffledGreetings.length - 1; i > 0; i--) {
		// 	const j = Math.floor(Math.random() * (i + 1));
		// 	[shuffledGreetings[i], shuffledGreetings[j]] = [
		// 		shuffledGreetings[j],
		// 		shuffledGreetings[i],
		// 	];
		// }

		// setGreetings(shuffledGreetings);

		// return () => clearInterval(interval);
	}, []);

	return (
		<>
			{[...Array(cubes)].map((_, i) => (
				<RigidBody key={i} restitution={0.5}>
					<mesh castShadow receiveShadow position-y={i * 2 + 10}>
						<boxGeometry args={[0.4, 0.4, 0.4]} />
						<meshStandardMaterial color={[5, 2, 1]} />
					</mesh>
				</RigidBody>
			))}
			<RigidBody type={"fixed"}>
				<mesh castShadow receiveShadow position-y={2} position-x={6}>
					<Text3D font="./helvetiker_regular.typeface.json">Hello!</Text3D>
				</mesh>
			</RigidBody>

			<RigidBody type={"fixed"}>
				<mesh castShadow receiveShadow position-y={6}>
					<Text3D font="./helvetiker_regular.typeface.json">{age}</Text3D>
				</mesh>
			</RigidBody>

			<primitive object={model.scene} />

			<RigidBody type={"fixed"}>
				<mesh castShadow receiveShadow position-y={-1}>
					<boxGeometry args={[400, 4, 400]} />
					<meshPhysicalMaterial color="grey" />
				</mesh>
			</RigidBody>
			{/*<OrbitControls makeDefault />*/}
		</>
	);
}

export default Scene;
