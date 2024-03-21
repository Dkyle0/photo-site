import { ImageType } from "../types/d";

export const isLiked = (photo: ImageType, userId: string) => {
	return photo.likes.includes(userId);
};
