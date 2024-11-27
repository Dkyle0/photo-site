import { useDispatch } from 'react-redux';
import { ROLE } from '../../../../constants/role';
import profileIcon from '../../../../imgs/icons/user-svgrepo-com.svg';
import styles from './logout-btn.module.css';
import { userLogout } from '../../../store/reducers';

export const LogoutBtn = ({
	setRoleId,
}: {
	setRoleId: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(userLogout());
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
