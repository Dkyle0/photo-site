import { useDispatch, useSelector } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalText,
	selectPostId,
	selectModalType,
} from '../selectors';
import styles from './modal.module.css';
import { closeModal, startReload } from '../store/reducers';
import { removePhotoAsync, removePostAsync } from '../actions';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AnyAction, Dispatch, UnknownAction } from '@reduxjs/toolkit';

const setConfirm = (
	type: string,
	id: string,
	dispatch: Dispatch<UnknownAction>,
	navigate: NavigateFunction,
) => {
	switch (type) {
		case 'post':
			return () => {
				dispatch(removePostAsync(id) as unknown as AnyAction).then(() => {
					navigate('/');
				});
				dispatch(closeModal());
			};
		case 'photo':
			return () => {
				removePhotoAsync(id)
					.then(() => dispatch(closeModal()))
					.then(() => dispatch(startReload()));
			};
		default:
			return () => {
				dispatch(closeModal());
			};
	}
};

export const Modal = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const text = useSelector(selectModalText);
	const id = useSelector(selectPostId);
	const type = useSelector(selectModalType);
	const isOpen = useSelector(selectModalIsOpen);

	const onCancel = () => {
		dispatch(closeModal());
	};

	const onConfirm = () => setConfirm(type, id, dispatch, navigate)();

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
