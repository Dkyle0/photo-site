import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { ROLE } from '../../../constants/role';
import { RESET_POST_DATA, loadPostAsync } from '../../actions';
import { Header } from '../../header';
import { Loader } from '../../loader';
import { selectPost } from '../../selectors';
import { IPostData, IPostError } from '../../types/d';
import { checkAccess } from '../../utils';
import { checkSessionRole } from '../../utils/check-session-role';
import { Error } from '../error';
import { PostContent } from './components';
import { PostForm } from './post-form/post-form';
import styles from './post.module.css';

export const Post = () => {
	let [error, setError] = useState<string | null>(null);
	const [isLoading, setisLoading] = useState(true);
	const dispatch = useDispatch();
	const post = useSelector(selectPost);
	const params = useParams();
	const isCreating = !!useMatch('/post');
	const isEditing = !!useMatch('/post/:id/edit');
	const currentUser: number = checkSessionRole();
	const isAdmin = checkAccess([ROLE.ADMIN], currentUser);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setisLoading(false);
			return;
		}
		if (params.id) {
			// @ts-ignore
			dispatch(loadPostAsync(params.id)).then(
				(postData: IPostData | IPostError) => {
					if ('error' in postData) {
						setError(postData.error);
					}
				},
				setisLoading(false),
			);
		}

		error ? setError('Cтатья с таким id отсутствует') : setError(null);
		(isEditing || isCreating) && !isAdmin && !error
			? setError('Ошибка доступа')
			: setError(null);
	}, [params.id, dispatch, isCreating, error, isEditing, isAdmin]);

	if (isLoading) {
		return <Loader />;
	}

	const SpecificPostPage =
		isEditing || isCreating ? (
			<>
				<Header title="Новая статья" />
				<div className={styles.container}>
					<PostForm {...post} />
				</div>
			</>
		) : (
			<>
				<Header title={post.title} />
				<div className={styles.container}>
					<PostContent {...post} />
				</div>
			</>
		);

	return error ? <Error title={error} /> : SpecificPostPage;
};
