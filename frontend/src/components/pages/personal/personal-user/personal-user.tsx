import { Gallery } from '../../../gallery';
import { Header } from '../../../header';
import { LogoutBtn } from '../utils';
import styles from './personal-user.module.css';

export const PersonalUser = ({
	setRoleId,
}: {
	setRoleId: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<LogoutBtn setRoleId={setRoleId} />
				<Header title={'Личный кабинет'} />
			</header>

			<Gallery location={'personal'} />
		</div>
	);
};
