import { useDispatch } from 'react-redux';
import { ROLE } from '../../../../constants/role';
import dellIcon from '../../../../imgs/icons/dell-square-svgrepo-com.svg';
import likeSlimIcon from '../../../../imgs/icons/favorite-off-svgrepo-com.svg';
import likeFullIcon from '../../../../imgs/icons/favorite-svgrepo-com.svg';
import { addLikeAsync } from '../../../actions';
import { ImageType } from '../../../types/d';
import { checkAccess, isLiked } from '../../../utils';
import { checkSessionRole } from '../../../utils/check-session-role';
import styles from './users-buttons.module.css';
import { openModal } from '../../../store/reducers';

interface IUsersButtons {
	image: ImageType;
	indexToRemove: number;
	getedImages: ImageType[];
	setGetedImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
}
export const UsersButtons = ({
	image,
	indexToRemove,
	getedImages,
	setGetedImages,
}: IUsersButtons) => {
	const dispatch = useDispatch();
	const currentUser: number = checkSessionRole();
	const userData: string | null = sessionStorage.getItem('userData');
	const userId = userData ? JSON.parse(userData)?.id : '';

	const onPhotoRemove = (id: string) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				type: 'photo',
				id: id,
			}),
		);
	};

	const onNewLikeAdd = (
		index: number,
		photoId: string,
		userId: string,
		isLiked: boolean,
	) => {
		if (isLiked) {
			addLikeAsync(photoId, { add: false, authorId: userId });
			const updatedImages = [...getedImages];
			updatedImages[index].likes = updatedImages[index].likes.filter(
				(user: string) => user !== userId,
			);
			setGetedImages(updatedImages);
		} else {
			addLikeAsync(photoId, { add: true, authorId: userId });
			const updatedImages = [...getedImages];
			updatedImages[index].likes.push(userId);
			setGetedImages(updatedImages);
		}
	};

	const isAdmin = checkAccess([ROLE.ADMIN], currentUser);
	const isUser = checkAccess([ROLE.ADMIN, ROLE.MODERATOR, ROLE.USER], currentUser);
	return (
		<>
			{isAdmin && (
				<img
					className={styles.dellIcon}
					src={dellIcon}
					alt={'Delete Icon'}
					onClick={() => {
						onPhotoRemove(image.id);
					}}
				/>
			)}
			{isUser && (
				<img
					className={styles.likeIcon}
					src={isLiked(image, userId) ? likeFullIcon : likeSlimIcon}
					alt={'Like Icon'}
					onClick={() =>
						onNewLikeAdd(
							indexToRemove,
							image.id,
							userId,
							isLiked(image, userId),
						)
					}
				/>
			)}
		</>
	);
};
