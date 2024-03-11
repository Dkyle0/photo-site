import styles from './personal.module.css';
import { useState } from 'react';
import { ROLE } from '../../../constants/role';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions';
import { checkSessionRole } from '../../utils/check-session-role';
import { Users } from './users';

export const Personal = () => {
	const [file, setFile] = useState<File | null>(null);
	const [massage, setMassage] = useState<string | null>(null);
	const [roleId, setRoleId] = useState<number>(checkSessionRole());
	const [photoType, setPhotoType] = useState<
		string | number | readonly string[] | undefined
	>('landscape');
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
		setRoleId(ROLE.GUEST);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event?.target?.files[0];
			console.log(event.target.files[0]);
			setMassage(`Выбран файл: ${file.name}`);
			setFile(file);
		}
	};

	const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setPhotoType(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (file) {
			const formData = new FormData();
			formData.append('photo', file);
			if (photoType) {
				formData.append('type', photoType.toString());
			}

			fetch('/personal', {
				method: 'POST',
				body: formData,
			})
				.then((response) => response.json())
				.then((data) => {
					setMassage(`${data?.photo}`);
					console.log('Успех:', data);
				})
				.catch((error) => {
					setMassage(`Ошибка ${error}`);
					console.error('Ошибка:', error);
				});
		}
	};

	if (roleId === ROLE.GUEST) {
		console.log(roleId, ROLE.GUEST);
		return <Navigate to="/login" />;
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.uploadForm}>
					<h1>Загрузить фото</h1>
					<form onSubmit={handleSubmit}>
						<select
							className={styles.photoType}
							id="photo-type"
							value={photoType}
							onChange={handleTypeChange}
						>
							<option value="">Выберите...</option>
							<option value="landscape">Пейзаж</option>
							<option value="portrait">Портрет</option>
							<option value="street">Уличная фотография</option>
						</select>
						<label htmlFor="photo-upload" className={styles.customFileUpload}>
							Выберите файл
						</label>
						<input
							id="photo-upload"
							type="file"
							name="photo"
							accept="image/*"
							onChange={handleFileChange}
						/>
						<button type="submit" className={styles.uploadBtn}>
							Загрузить
						</button>
					</form>
					<h3>{massage}</h3>
					<button className={styles.uploadBtn} onClick={onLogout}>
						Разлогинится
					</button>
				</div>
			</div>
			<div className={styles.container}>
				<Users />
			</div>
		</>
	);
};
