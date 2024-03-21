import { useEffect, useState } from 'react';
import img1 from '../../../imgs/1.jpg';
import img2 from '../../../imgs/2.jpg';
import img3 from '../../../imgs/3.jpg';
import { ActualPhoto } from '../../actual-photo';
import { useRainEffect } from '../../hooks/rain';
import { ArrowUp } from './components/arrow-up';
import { PortfolioBigButton } from './components/portfolio-big-button';
import styles from './main.module.css';
import { getMousPosition } from './utils';

export const Main = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [scroll, setScroll] = useState(0);
	const imgs = [img1, img2, img3];

	useRainEffect('rain', window.innerWidth, window.innerHeight);

	useEffect(() => {
		const handleScroll = () => {
			setScroll(window.scrollY);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
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
					</div>
					<h3 className={styles.secondText}>Photographer</h3>
				</div>
			</div>
			<div className={styles.separation} />
			<div className={styles.photoBlock}>
				<ActualPhoto imgs={imgs} />
			</div>
			{scroll > 150 && <ArrowUp />}
			<div className={styles.separation} />
			<PortfolioBigButton />
		</>
	);
};
