import { useLocation } from 'react-router-dom';
import { Gallery } from '../../../gallery';
import { Header } from '../../../header';
import styles from './portfolio-page.module.css';

const selectTitle = (location: string) => {
	switch (location) {
		case 'portrait':
			return 'Портрет';
		case 'street':
			return 'Уличная фотография';
		case 'landscape':
			return 'Пейзаж';
		default:
			return 'Страница не существует';
	}
};

export const PortfolioPage = () => {
	const location = useLocation();
	const cuteLocation = location.pathname.slice(11);
	const title = selectTitle(cuteLocation);

	return (
		<div className={styles.container}>
			<Header title={title} />
			<Gallery location={cuteLocation} />
		</div>
	);
};
