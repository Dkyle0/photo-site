import { ReactNode } from 'react';
import styles from './table-row.module.css';

type TableRowProps = {
	children: ReactNode;
};

export const TableRow = ({ children }: TableRowProps) => (
	<div className={styles.container}>{children}</div>
);
