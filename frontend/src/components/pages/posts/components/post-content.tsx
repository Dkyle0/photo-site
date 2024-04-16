import { useNavigate } from 'react-router-dom';
import editIcon from '../../../../imgs/icons/add-file-svgrepo-com.svg';
import { PostState } from '../../../types/d';
import { SpecialPanel } from './components/special-panel';
import styles from './post-content.module.css';

const EditButton = () => <img className={styles.icon} src={editIcon} alt="Edit Icon" />;

export const PostContent = ({ id, title, imageUrl, content, publishedAt }: PostState) => {
	const navigate = useNavigate();
	const onEdit = () => navigate(`/post/${id}/edit`);

	return (
		<>
			<div className={styles.container}>
				<img className={styles.img} src={imageUrl} alt={title} />
				<SpecialPanel
					id={id || ''}
					publishedAt={publishedAt || ''}
					EditButton={EditButton}
					onEdit={onEdit}
				/>
				<div className={styles.postText}>{content}</div>
			</div>
		</>
	);
};
