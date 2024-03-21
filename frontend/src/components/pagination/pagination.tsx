import styles from './pagination.module.css';

export const Pagination = ({
	page,
	lastPage = 1,
	setPage,
}: {
	page: number;
	lastPage: number;
	setPage: Function;
}) => {
	return (
		<div className={styles.container}>
			<button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</button>
			<button
				disabled={page === 1}
				onClick={() => setPage(page === 1 ? 1 : page - 1)}
			>
				Предыдущая
			</button>
			<div className={styles.current}>Страница: {page}</div>
			<button
				disabled={page === lastPage}
				onClick={() => setPage(page === lastPage ? lastPage : page + 1)}
			>
				Следующая
			</button>
			<button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</button>
		</div>
	);
};
