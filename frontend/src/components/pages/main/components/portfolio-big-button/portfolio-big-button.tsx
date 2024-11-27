import { useNavigate } from 'react-router-dom';
import styles from './portfolio-big-button.module.css';

export const PortfolioBigButton = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/portfolio');
	};

	return (
		<div className={styles.bigBtnContainer}>
			<div className={styles.bigBtn}>
				<button className={styles.buttonArounder} onClick={handleClick}>
					Посмотреть портфолио
				</button>
			</div>
		</div>
	);
};
