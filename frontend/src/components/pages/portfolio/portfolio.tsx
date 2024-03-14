import { ActualPhoto } from '../../actual-photo';
import styles from './portfolio.module.css';
import img1 from '../../../imgs/portrair.jpg';
import img2 from '../../../imgs/street.jpg';
import img3 from '../../../imgs/landscape.jpg';
import { PortfolioHeader } from './components/portfolio-header';

export const Portfolio = () => {
	const imgs = [img1, img2, img3];
	const titles = ['Портрет', 'Уличное', 'Пейзаж'];

	const paths = ['/portfolio/portrait', '/portfolio/street', '/portfolio/landscape'];

	return (
		<div className={styles.container}>
			<PortfolioHeader title={'Портфолио'} />
			<div className={styles.photoBlock}>
				<ActualPhoto imgs={imgs} titles={titles} paths={paths} />
			</div>
			<div className={styles.separation} />
		</div>
	);
};
