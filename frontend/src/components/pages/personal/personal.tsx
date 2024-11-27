import { ROLE } from '../../../constants/role';
import { Navigate } from 'react-router-dom';
import { checkSessionRole } from '../../utils/check-session-role';
import { PersonalAdmin } from './personal-admin/personal-admin';
import { PersonalUser } from './personal-user';
import { useState } from 'react';

export const Personal = () => {
	const [roleId, setRoleId] = useState<number>(checkSessionRole());

	if (roleId === ROLE.GUEST) {
		return <Navigate to="/login" />;
	}

	return (
		<>
			{roleId === ROLE.ADMIN ? (
				<PersonalAdmin roleId={roleId} setRoleId={setRoleId} />
			) : (
				<PersonalUser setRoleId={setRoleId} />
			)}
		</>
	);
};
