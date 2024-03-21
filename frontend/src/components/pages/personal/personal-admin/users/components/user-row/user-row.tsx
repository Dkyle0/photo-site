import { ChangeEvent, MouseEventHandler, useState } from 'react';
import { request } from '../../../../../../utils';
import { TableRow } from '../table-row/table-row';
import styles from './user-row.module.css';

interface IUserRow {
	id: string;
	login: string;
	registredAt: string;
	userRoleId: string;
	roles: { id: string; name: string }[]; // Обратите внимание на это изменение
	onUserRemove: MouseEventHandler<HTMLDivElement>;
}

export const UserRow = ({
	id,
	login,
	registredAt,
	userRoleId,
	roles,
	onUserRemove,
}: IUserRow) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedRoleId(event.target.value);
	};

	const onRoleSave = (id: string, newUserRoleId: string) => {
		request(`/users/${id}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={styles.container}>
			<TableRow>
				<div className={styles.login}>{login}</div>
				<div className={styles.registredAt}>{registredAt.slice(0, 10)}</div>
				<div>
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => {
							return (
								<option value={roleId} key={roleId}>
									{roleName}
								</option>
							);
						})}
					</select>
					{!isSaveButtonDisabled && (
						<div
							className={styles.saveRoleButton}
							onClick={() => onRoleSave(id, selectedRoleId)}
						>
							&#128190;
						</div>
					)}
					<div />
				</div>
			</TableRow>
			<div className={styles.delIcon} onClick={onUserRemove}>
				🗑
			</div>
		</div>
	);
};
