import styles from './menu.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const menuItems = [
	{ path: '/', name: 'Главная' },
	{ path: '/personal', name: 'Личный кабинет' },
	{ path: '/portfolio', name: 'Портфолио' },
	{ path: '/posts', name: 'Статьи' },
	{ path: '/about', name: 'Обо мне' },
];

export const Menu = () => {
	const location = useLocation();
	const [currentMenu, setCurrentMenu] = useState(menuItems);

	useEffect(() => {
		setCurrentMenu(menuItems.filter((item) => item.path !== location.pathname));
	}, [location.pathname]);

	return (
		<div className={styles.dropdown}>
			<button className={styles.drop_butt}></button>
			<nav className={styles.drop_content}>
				{currentMenu.map((item, index) => (
					<Link key={index} to={item.path}>
						{item.name}
					</Link>
				))}
			</nav>
		</div>
	);
};
