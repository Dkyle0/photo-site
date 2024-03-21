import { Link } from 'react-router-dom';
import { IPostData } from '../../../../types/d';
import styles from './post-card.module.css';

type IPostCard = Omit<IPostData, 'content'>;

export const PostCard = ({ id, title, imageUrl, publishedAt }: IPostCard) => {
	return (
		<div className={styles.container}>
			<Link to={`/post/${id}`}>
				<img className={styles.img} src={imageUrl} alt={title} />
				<div className={styles.postCardFoter}>
					<h4>{title}</h4>
					<div className={styles.postCardInfo}>
						<div className={styles.publishedAt}>
							{publishedAt!.slice(0, 10)}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};
