import styles from './main.module.css';
import fon from '../../imgs/fon.jpg';
import { Menu } from '../menu';

export const Main = () => {
	return (
		<div className={styles.main}>
			<img className={styles.backImg} src={fon} alt="fog_forest" />
			<div className={styles.overlay}>
				<div className={styles.center}>
					<h1 className={styles.mainText}>Konstantin Kozhevnikov</h1>
					<Menu />
				</div>
				<h3 className={styles.secondText}>Photographer</h3>
			</div>
		</div>
	);
};
