import { ChangeEvent } from 'react';
import styles from './search.module.css';

export const Search = ({
	searchPhrase,
	onChange,
}: {
	searchPhrase: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<div className={styles.container}>
			<input
				value={searchPhrase}
				placeholder="Поиск по заголовкам"
				onChange={onChange}
			/>
		</div>
	);
};
