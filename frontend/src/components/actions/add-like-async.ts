import { request } from "../utils";


export const addLikeAsync = async (photoId: string, data: {add:boolean, authorId:string }) => {
	await request(`/portfolio/${photoId}/likes`, 'POST', { data });
};
