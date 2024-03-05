import { Link } from 'react-router-dom';
import styles from './menu.module.css';

export const Menu = () => {
	return (
		<div className={styles.dropdown}>
			<button className={styles.drop_butt}></button>
			<nav className={styles.drop_content}>
				<Link to="/">Главная</Link>
				<Link to="/profile">Личный кабинет</Link>
				<Link to="/portfolio">Портфолио</Link>
				<Link to="/posts">Статьи</Link>
				<Link to="/about">Обо мне</Link>
			</nav>
		</div>
	);
};
