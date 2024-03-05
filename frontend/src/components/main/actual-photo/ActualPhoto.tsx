import styles from './ActualPhoto.module.css';
import img1 from '../../../imgs/1.jpg';
import img2 from '../../../imgs/2.jpg';
import img3 from '../../../imgs/3.jpg';

export const ActualPhoto = () => {
	const imgs = [img1, img2, img3];
	return (
		<div className={styles.container}>
			{imgs.map((img: string) => {
				return (
					<div className={styles.item}>
						<img src={img} alt={img}></img>
					</div>
				);
			})}
		</div>
	);
};
