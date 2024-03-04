import styles from './main.module.css';
import { Menu } from '../menu';
import { useState } from 'react';
import { useRainEffect } from '../hooks/rain';

export const Main = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useRainEffect('rain', window.innerWidth, window.innerHeight);

	const getMousPosition = (
		event: React.MouseEvent<HTMLDivElement>,
		setPosition: React.Dispatch<
			React.SetStateAction<{
				x: number;
				y: number;
			}>
		>,
	) => {
		setPosition({
			x: (event.clientY - window.innerHeight / 2) * -0.0005,
			y: (event.clientX - window.innerWidth / 2) * -0.0005,
		});
	};
	return (
		<div className={styles.main}>
			<div
				onMouseMove={(event) => getMousPosition(event, setPosition)}
				className={styles.container}
				style={{
					transform: `rotateX(${position.x}deg) rotateY(${position.y}deg)`,
				}}
			>
				<canvas className="rain" />
				<div className={styles.backImg} />
				<div className={styles.overlay} />
				<div className={styles.center}>
					<h1 className={styles.mainText}>Konstantin Kozhevnikov</h1>
					<Menu />
				</div>
				<h3 className={styles.secondText}>Photographer</h3>
			</div>
		</div>
	);
};
