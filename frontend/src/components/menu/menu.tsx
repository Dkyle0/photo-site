import styles from './menu.module.css';

export const Menu = () => {
	return (
		<div className={styles.dropdown}>
			<button className={styles.drop_butt}></button>
			<div className={styles.drop_content}>
				<a href="#home" className={styles.active}>
					Главная
				</a>
				<a href="#news">Новости</a>
				<a href="#contacts">Контакты</a>
				<a href="#about">Обо мне</a>
			</div>
		</div>
	);
};
