import styles from './portfolio-header.module.css';

export const PortfolioHeader = ({ title }: { title: string }) => {
	return (
		<div className={styles.title}>
			<h1>{title}</h1>
		</div>
	);
};
