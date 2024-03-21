import { useSelector } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalText,
	selectModalonCencel,
	selectModalonConfirm,
} from '../selectors';
import styles from './modal.module.css';

export const Modal = () => {
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalonConfirm);
	const onCancel = useSelector(selectModalonCencel);
	const isOpen = useSelector(selectModalIsOpen);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.overlay}></div>
			<div className={styles.box}>
				<h3>{text}</h3>
				<div className={styles.buttons}>
					<button onClick={onConfirm}>Да</button>
					<button onClick={onCancel}>Отмена</button>
				</div>
			</div>
		</div>
	);
};
