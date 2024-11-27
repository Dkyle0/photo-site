import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';

export const Header = ({ title }: { title: string }) => {
	const navigate = useNavigate();
	return (
		<div className={styles.container}>
			<div className={styles.backBtn} onClick={() => navigate(-1)} />
			<div className={styles.title}>
				<h1>{title}</h1>
			</div>
		</div>
	);
};
