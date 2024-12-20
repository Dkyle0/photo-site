import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';
import { ROLE } from '../../../constants/role';
import { useResetForm } from '../../hooks';
import { selectUserRole } from '../../selectors';
import { request } from '../../utils';
import styles from './authorization.module.css';
import { setUser } from '../../store/reducers';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните поле с логином')
		.matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и символы')
		.min(3, 'Неверный логин. Минимум 3 символа')
		.max(15, 'Неверный логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните поле с паролем')
		.matches(
			/^[\w#%]+$/,
			'Допускаются только буквы, цифры, знаки "#", "%" и символы в пароле',
		)
		.min(6, 'Минимум 6 символов в поле ввода пароля')
		.max(30, 'Максимум 30 символов в поле ввода пароля'),
	passcheck: yup
		.string()
		.required('Заполните поле с повтором пароля')
		.oneOf([yup.ref('password')], 'Пароли не совпадают')
		.nullable(),
});

export const Registration = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState<string | null>(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }: { login: string; password: string }) => {
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса. ${error}`);
				return;
			}
			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<h2>Регистрация</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						placeholder="Логин..."
						{...register('login', { onChange: () => setServerError(null) })}
					/>
					<input
						type="password"
						placeholder="Пароль..."
						{...register('password', {
							onChange: () => setServerError(null),
						})}
					/>
					<input
						type="password"
						placeholder="Повтор пароля..."
						{...register('passcheck', {
							onChange: () => setServerError(null),
						})}
					/>
					<button type="submit" disabled={!!formError}>
						Зарегистрироваться
					</button>
					{errorMessage && (
						<div className={styles.authFormError}>{errorMessage}</div>
					)}
				</form>
			</div>
		</div>
	);
};
