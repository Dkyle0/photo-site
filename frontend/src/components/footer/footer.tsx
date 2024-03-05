import styles from './footer.module.css';

export const Footer = () => {
	const Year = new Date().getFullYear();

	return (
		<div className={styles.footer}>
			{/* <span className={styles.tg}>
				<a className={styles.tg} href="https://t.me/dkyle21">
					<img className={styles.tg} src={tgIcon} alt="telegram icon"></img>
				</a>
			</span> */}
			<span className={styles.date}>
				Konstantin Kozhevnikov Moscow |&nbsp;{Year}
			</span>
		</div>
	);
};
