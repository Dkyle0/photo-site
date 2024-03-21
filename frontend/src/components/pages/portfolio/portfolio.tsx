import img3 from '../../../imgs/landscape.jpg';
import img1 from '../../../imgs/portrair.jpg';
import img2 from '../../../imgs/street.jpg';
import { ActualPhoto } from '../../actual-photo';
import { Header } from '../../header';
import styles from './portfolio.module.css';

export const Portfolio = () => {
	const imgs = [img1, img2, img3];
	const titles = ['Портрет', 'Уличное', 'Пейзаж'];

	const paths = ['/portfolio/portrait', '/portfolio/street', '/portfolio/landscape'];

	return (
		<div className={styles.container}>
			<Header title={'Портфолио'} />
			<div className={styles.photoBlock}>
				<ActualPhoto imgs={imgs} titles={titles} paths={paths} />
			</div>
			<div className={styles.separation} />
		</div>
	);
};
