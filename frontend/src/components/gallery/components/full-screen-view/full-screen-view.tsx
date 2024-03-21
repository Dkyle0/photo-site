import styles from './full-screen-view.module.css';

export const FullScreenView = ({
	fullscreenImageUrl,
	closeFullscreen,
}: {
	fullscreenImageUrl: string | null;
	closeFullscreen: () => void;
}) => {
	return (
		<>
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
