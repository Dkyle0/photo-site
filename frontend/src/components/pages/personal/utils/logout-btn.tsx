import { useDispatch } from 'react-redux';
import { ROLE } from '../../../../constants/role';
import profileIcon from '../../../../imgs/icons/user-svgrepo-com.svg';
import { logout } from '../../../actions';
import styles from './logout-btn.module.css';

export const LogoutBtn = ({
	setRoleId,
}: {
	setRoleId: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
		setRoleId(ROLE.GUEST);
	};
	return (
		<div className={styles.logout} onClick={onLogout}>
			<img className={styles.profileIcon} src={profileIcon} alt="User icon" />
			Выйти из профиля
		</div>
	);
};
