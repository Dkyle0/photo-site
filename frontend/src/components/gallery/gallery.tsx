import { useEffect, useState } from 'react';
import { PAGINATION_LIMIT } from '../../constants/pagination-limit';
import { Loader } from '../loader';
import { Pagination } from '../pagination';
import { ImageType } from '../types/d';
import { request } from '../utils';
import { FullScreenView } from './components/full-screen-view';
import { UsersButtons } from './components/users-buttons/users-buttons';
import styles from './gallery.module.css';
import { selectNeedReload } from '../selectors/select-need-reload';
import { useDispatch, useSelector } from 'react-redux';
import { stopReload } from '../store/reducers';

export const Gallery = ({ location }: { location: string }) => {
	const [getedImages, setGetedImages] = useState<ImageType[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setisLoading] = useState(true);
	const [lastPage, setLastPage] = useState(1);
	const [fullscreenImageUrl, setFullscreenImageUrl] = useState<string | null>(null);
	const needReload = useSelector(selectNeedReload);
	const dispatch = useDispatch();

	useEffect(() => {
		request(
			`/portfolio?location=${location}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { photos, lastPage } }) => {
			setGetedImages(photos);
			setLastPage(lastPage ? lastPage : undefined);
			setisLoading(false);
		});
	}, [page, location, needReload]);

	useEffect(() => {
		if (needReload) {
			dispatch(stopReload());
		}
	}, [needReload, dispatch]);

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
						<UsersButtons
							getedImages={getedImages}
							setGetedImages={setGetedImages}
							image={image}
							indexToRemove={index}
						/>
					</div>
				))}
			</div>
			{lastPage > 1 ? (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			) : null}
			<FullScreenView
				fullscreenImageUrl={fullscreenImageUrl}
				closeFullscreen={closeFullscreen}
			/>
		</>
	);
};
