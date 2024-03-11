import { Link } from 'react-router-dom';
import styles from './ActualPhoto.module.css';

interface ActualPhotoProps {
	imgs: string[];
	titles?: string[];
	paths?: string[];
}

export const ActualPhoto = ({ imgs, titles, paths }: ActualPhotoProps) => {
	return (
		<div className={styles.container}>
			{imgs.map((img: string, i: number) => {
				const path = paths && paths[i] ? paths[i] : '/';
				return (
					<div className={styles.item} key={i}>
						<Link
							style={{ backgroundColor: 'inherit', padding: '0' }}
							to={path}
						>
							<img src={img} alt={img} />
							{titles && <h3>{titles[i]}</h3>}
						</Link>
					</div>
				);
			})}
		</div>
	);
};
