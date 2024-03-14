import { request } from '../utils';

export const removePhotoAsync = (id: string) => {
    return request(`/portfolio/${id}`, 'DELETE', null)
        .catch((error) => {
            console.error('Error removing photo:', error);
        });
};

