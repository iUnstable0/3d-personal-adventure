import { useState } from "react";

import { useRouter } from "next/router";

import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import styles from "@/styles/Home.module.scss";

import { motion, AnimatePresence } from "framer-motion";

import "@fontsource/quicksand";
import "@fontsource/quicksand/300.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/600.css";
import "@fontsource/quicksand/700.css";

import "@fontsource/ubuntu";
import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	const [welcomeBlurVisible, setWelcomeBlurVisible] = useState<any>(
		pageProps.firstTimeVisit
	);

	return (
		<>
			<AnimatePresence>
				{welcomeBlurVisible && (
					<motion.div
						key={`blur_${router.pathname}`}
						className={styles.welcomeBlur}
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						exit={{
							opacity: 0,
						}}
						transition={{
							duration: 0.15,
						}}
						onClick={() => {
							setWelcomeBlurVisible(false);
						}}
					>
						<h1 className={styles.welcomeTitle}>Welcome!</h1>
						<h2 className={styles.welcomeDescription}>
							This website is still under development. Expect bugs!
						</h2>
						{/*<h2 className={styles.welcomeDescription}>*/}
						{/*	Note that this website doesnt work on Firefox (it sucks)*/}
						{/*	<br />*/}
						{/*	Theres also an issue with blurring on Chrome and other*/}
						{/*	chromium-based browsers.*/}
						{/*</h2>*/}
						{/*<h2 className={styles.welcomeDescription}>*/}
						{/*	The only browser that works perfectly is Safari (and other*/}
						{/*	browsers if you{"'"}re on iOS).*/}
						{/*</h2>*/}
						<h2 className={styles.welcomeHint}>Click anywhere to enter.</h2>
					</motion.div>
				)}
			</AnimatePresence>

			<Component {...pageProps} />
		</>
	);
}
