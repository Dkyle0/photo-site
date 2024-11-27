import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ROLE } from '../../../../../constants/role';
import { Loader } from '../../../../loader';
import { selectUserRole } from '../../../../selectors';
import { request } from '../../../../utils';
import { TableRow, UserRow } from './components';
import styles from './users.module.css';

export const Users = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const currentRole = useSelector(selectUserRole);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	useEffect(() => {
		Promise.all([
			request('/users', null, null),
			request('/users/roles', null, null),
		]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}
			setUsers(usersRes.data);
			setRoles(rolesRes.data);
			setIsLoading(false);
		});
	}, [shouldUpdateUserList, currentRole]);

	const onUserRemove = (userId: number) => {
		request(`/users/${userId}`, 'DELETE', null).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return isLoading ? (
		<Loader />
	) : (
		<div className={styles.container}>
			<h2>Пользователи</h2>
			<div>
				<TableRow>
					<div className={styles.login}>Логин</div>
					<div className={styles.registredAt}>Дата регистрации</div>
					<div className="role-column">Роль</div>
				</TableRow>
				{users.map(({ id, login, registredAt, roleId }) => (
					<UserRow
						key={id}
						id={id}
						login={login}
						registredAt={registredAt}
						userRoleId={roleId}
						roles={roles.filter(
							(role: {
								id: string;
								login: string;
								registredAt: string;
								userRoleId: number;
							}) => role.id !== ROLE.GUEST.toString(),
						)}
						onUserRemove={() => onUserRemove(id)}
					/>
				))}
			</div>
			<h2>{errorMessage}</h2>
		</div>
	);
};
