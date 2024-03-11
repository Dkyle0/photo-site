import { useLocation } from 'react-router-dom';
import { PortfolioHeader } from '../components/portfolio-header';
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
	console.log(typeof location.pathname.slice(11));
	const title = selectTitle(location.pathname.slice(11));

	return (
		<div className={styles.container}>
			<PortfolioHeader title={title} />
		</div>
	);
};
