import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { PAGINATION_LIMIT } from '../../../constants/pagination-limit';
import { Header } from '../../header';
import { Loader } from '../../loader';
import { Pagination } from '../../pagination';
import { debounce, request } from '../../utils';
import { PostCard } from './components/post-card';
import { Search } from './components/search';
import styles from './posts.module.css';

export const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [isLoading, setisLoading] = useState(true);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		request(
			`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setLastPage(lastPage ? lastPage : undefined);
			setisLoading(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchPhrase(event.target.value);
		startDelayedSearch(!shouldSearch);
		setPage(1);
	};

	if (isLoading) {
		return <Loader />;
	}
	return (
		<>
			<Header title="Статьи" />
			<div className={styles.container}>
				<div className={styles.postsAndSearch}>
					<Search searchPhrase={searchPhrase} onChange={onSearch} />
					{posts.length > 0 ? (
						<div className={styles.postList}>
							{posts.map(({ id, title, imageUrl, publishedAt }) => {
								return (
									<PostCard
										key={id}
										id={id}
										title={title}
										imageUrl={imageUrl}
										publishedAt={publishedAt}
									/>
								);
							})}
						</div>
					) : (
						<h2 className={styles.noPostsFound}>Статьи не найдены</h2>
					)}
				</div>
				{lastPage > 1 && posts.length > 0 ? (
					<Pagination page={page} lastPage={lastPage} setPage={setPage} />
				) : null}
			</div>
		</>
	);
};
