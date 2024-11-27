import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import saveBtn from '../../../../imgs/icons/file-svgrepo-com.svg';
import { savePostAsync } from '../../../actions';
import { PostState } from '../../../types/d';
import { SpecialPanel } from '../components/components/special-panel';
import styles from './post-form.module.css';
import { sanitizeContent } from './utils/sanitize-content';

const EditButton = () => <img className={styles.icon} src={saveBtn} alt="Save button" />;

export const PostForm = ({ id, title, imageUrl, content, publishedAt }: PostState) => {
	const [imageField, setImageField] = useState(imageUrl);
	const [titleField, setTitleField] = useState(title);
	const contentRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		setImageField(imageUrl);
		setTitleField(title);
	}, [imageUrl, title]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onImageChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
		setImageField(target.value);
	const onTitleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
		setTitleField(target.value);

	const onSave = () => {
		const newContent = contentRef.current
			? sanitizeContent(contentRef.current.innerHTML)
			: '';

		const newPostData: PostState = {
			imageUrl: imageField || '',
			title: titleField || '',
			content: newContent || '',
		};
		// @ts-ignore
		dispatch(savePostAsync(id, newPostData)).then((updatedPost: PostState) => {
			navigate(`/post/${updatedPost.id}`);
		});
	};

	return (
		<div className={styles.container}>
			<input
				value={imageField}
				placeholder="Изображение..."
				onChange={onImageChange}
			/>
			<input
				value={titleField}
				placeholder="Заголовок..."
				onChange={onTitleChange}
			/>
			<div
				ref={contentRef}
				className={styles.postText}
				contentEditable={true}
				suppressContentEditableWarning={true}
				data-placeholder="Статья..."
			>
				{content}
			</div>
			<SpecialPanel
				id={id || ''}
				publishedAt={publishedAt || ''}
				EditButton={EditButton}
				onEdit={onSave}
			/>
		</div>
	);
};
