import { upPage } from '../../utils';
import styles from './arrow-up.module.css';

export const ArrowUp = () => {
	return <div className={styles.arrow_butt} onClick={upPage} />;
};
