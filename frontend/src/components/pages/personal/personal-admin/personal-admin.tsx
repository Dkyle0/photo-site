import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ROLE } from '../../../../constants/role';
import { LogoutBtn } from '../utils';
import styles from './personal-admin.module.css';
import { Users } from './users';

export const PersonalAdmin = ({
	roleId,
	setRoleId,
}: {
	roleId: number;
	setRoleId: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const [file, setFile] = useState<File | null>(null);
	const [massage, setMassage] = useState<string | null>(null);
	const [photoType, setPhotoType] = useState<
		string | number | readonly string[] | undefined
	>('landscape');
	const navigate = useNavigate();
	const newPost = () => navigate(`/post`);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event?.target?.files[0];
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
				})
				.catch((error) => {
					setMassage(`Ошибка ${error}`);
					console.error('Ошибка:', error);
				});
		}
	};

	if (roleId === ROLE.GUEST) {
		return <Navigate to="/login" />;
	}

	return (
		<>
			<div className={styles.container}>
				<LogoutBtn setRoleId={setRoleId} />
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
				</div>
				<button className={styles.uploadBtn} onClick={newPost}>
					Добавить новую статью
				</button>
			</div>
			<div className={styles.container}>
				<Users />
			</div>
		</>
	);
};
