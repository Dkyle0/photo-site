import { useLocation } from 'react-router-dom';
import tgIcon from '../../imgs/icons/send-svgrepo-com.svg';
import styles from './footer.module.css';

export const Footer = () => {
	const Year = new Date().getFullYear();
	const location = useLocation();

	const handleClick = () => {
		window.open('https://t.me/dkyle21', '_blank');
	};

	if (location.pathname === '/') {
		return null;
	}
	return (
		<div className={styles.footer}>
			<span className={styles.tg} onClick={handleClick}>
				<img className={styles.tgicon} src={tgIcon} alt="telegram icon"></img>
				@dkyle21
			</span>

			<span className={styles.date}>
				Konstantin Kozhevnikov Moscow |&nbsp;{Year}
			</span>

			<span className={styles.email}>.</span>
		</div>
	);
};
