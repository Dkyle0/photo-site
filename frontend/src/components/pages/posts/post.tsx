import styles from './post.module.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostContent } from './components';
import { useMatch, useParams } from 'react-router-dom';
import { PostForm } from './post-form/post-form';
import { Loader } from '../../loader';
import { RESET_POST_DATA, loadPostAsync } from '../../actions';
import { selectPost } from '../../selectors';
import { checkSessionRole } from '../../utils/check-session-role';
import { checkAccess } from '../../utils';
import { ROLE } from '../../../constants/role';
import { IPostData, IPostError } from '../../types/d';
import { Header } from '../../header';
import { Error } from '../error';

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
	}, [params.id, dispatch, isCreating]);

	if (isLoading) {
		return <Loader />;
	}

	error ? (error = 'Cтатья с таким id отсутствует') : (error = null);
	(isEditing || isCreating) && !isAdmin && !error
		? (error = 'Ошибка доступа')
		: (error = null);

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
