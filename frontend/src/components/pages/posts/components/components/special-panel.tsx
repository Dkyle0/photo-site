import { useDispatch } from 'react-redux';
import { ROLE } from '../../../../../constants/role';
import dellIcon from '../../../../../imgs/icons/del-file-svgrepo-com.svg';
import { checkAccess } from '../../../../utils';
import { checkSessionRole } from '../../../../utils/check-session-role';
import styles from './special-panel.module.css';
import { openModal } from '../../../../store/reducers';

interface ISpecialPanel {
	id: string;
	publishedAt: string;
	EditButton: () => JSX.Element;
	onEdit: () => void;
}

export const SpecialPanel = ({ id, publishedAt, EditButton, onEdit }: ISpecialPanel) => {
	const dispatch = useDispatch();

	const userRole = checkSessionRole();

	const onPostRemove = (id: string) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				type: 'post',
				id: id,
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={styles.container}>
			<div className={styles.publishedAt}>{publishedAt.slice(0, 10)}</div>
			{isAdmin && (
				<div className={styles.buttons}>
					<div onClick={onEdit}>
						<EditButton />
					</div>

					{publishedAt && (
						<img
							className={styles.icon}
							src={dellIcon}
							onClick={() => onPostRemove(id)}
							alt="Dellete Icon"
						/>
					)}
				</div>
			)}
		</div>
	);
};
