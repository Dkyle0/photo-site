import styles from './gallery.module.css';
import React, { useEffect, useState } from 'react';
import { Loader } from '../../../../../loader';
import { checkAccess, request } from '../../../../../utils';
import dellIcon from '../../../../../../imgs/icons/dell-square-svgrepo-com.svg';
import likeSlimIcon from '../../../../../../imgs/icons/favorite-off-svgrepo-com.svg';
import likeFullIcon from '../../../../../../imgs/icons/favorite-svgrepo-com.svg';
import { selectUserRole } from '../../../../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE } from '../../../../../../constants/role';
import { CLOSE_MODAL, addLikeAsync, openModal } from '../../../../../actions';
import { removePhotoAsync } from '../../../../../actions/remove-photo-async';

const PAGINATION_LIMIT = 6;

type ImageType = {
	id: string;
	author: string;
	likes: string[];
	type: string;
	createdAt: string;
	imageData: string;
};

const isLiked = (photo: ImageType, userId: string) => {
	return photo.likes.includes(userId);
};

export const Gallery = ({ location }: { location: string }) => {
	const dispatch = useDispatch();
	const [getedImages, setGetedImages] = useState<ImageType[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setisLoading] = useState(true);
	const [lastPage, setLastPage] = useState(1);
	const [fullscreenImageUrl, setFullscreenImageUrl] = useState<string | null>(null);
	const userRole = useSelector(selectUserRole);
	const userData = sessionStorage.getItem('userData');
	let currentUser: string;
	if (userData) {
		currentUser = JSON.parse(userData)?.id;
	}

	useEffect(() => {
		request(
			`/portfolio?location=${location}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { photos, lastPage } }) => {
			setGetedImages(photos);
			setLastPage(lastPage ? lastPage : undefined);
			setisLoading(false);
		});
	}, [page, location]);

	const onPhotoRemove = (id: string, indexToRemove: number) => {
		dispatch(
			openModal({
				text: 'Удалить фотографию?',
				onConfirm: () => {
					removePhotoAsync(id);
					setGetedImages(
						getedImages.filter((_, index) => index !== indexToRemove),
					);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const onNewLikeAdd = (
		index: number,
		photoId: string,
		currentUser: string,
		isLiked: boolean,
	) => {
		if (isLiked) {
			addLikeAsync(photoId, { add: false, authorId: currentUser });
			const updatedImages = [...getedImages];
			updatedImages[index].likes = updatedImages[index].likes.filter(
				(user) => user !== currentUser,
			);
			setGetedImages(updatedImages);
		} else {
			addLikeAsync(photoId, { add: true, authorId: currentUser });
			const updatedImages = [...getedImages];
			updatedImages[index].likes.push(currentUser);
			setGetedImages(updatedImages);
		}
	};

	const openFullscreen = (imageUrl: string) => {
		setFullscreenImageUrl(imageUrl);
	};

	const closeFullscreen = () => {
		setFullscreenImageUrl(null);
	};

	if (isLoading) {
		return (
			<div className={styles.loading}>
				<Loader />
			</div>
		);
	}

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);
	const isUser = checkAccess([ROLE.ADMIN, ROLE.MODERATOR, ROLE.USER], userRole);

	return (
		<>
			<div className={styles.gallery}>
				{getedImages.map((image: ImageType, index: number) => (
					<div key={index} className={styles.galleryItem}>
						<img
							className={styles.photo}
							src={`data:image/jpeg;base64,${image.imageData}`}
							alt={location}
							onClick={() =>
								openFullscreen(
									`data:image/jpeg;base64,${image.imageData}`,
								)
							}
						/>
						{isAdmin && (
							<img
								className={styles.dellIcon}
								src={dellIcon}
								alt={'Delete Icon'}
								onClick={() => {
									onPhotoRemove(image.id, index);
								}}
							/>
						)}
						{isUser && (
							<img
								className={styles.likeIcon}
								src={
									isLiked(image, currentUser)
										? likeFullIcon
										: likeSlimIcon
								}
								alt={'Like Icon'}
								onClick={() =>
									onNewLikeAdd(
										index,
										image.id,
										currentUser,
										isLiked(image, currentUser),
									)
								}
							/>
						)}
					</div>
				))}
			</div>
			{fullscreenImageUrl && (
				<div className={styles.fullscreenOverlay} onClick={closeFullscreen}>
					<img
						src={fullscreenImageUrl}
						alt="Fullscreen"
						className={styles.fullscreenImage}
					/>
					<span className={styles.closeButton} onClick={closeFullscreen}>
						&times;
					</span>
				</div>
			)}
		</>
	);
};
