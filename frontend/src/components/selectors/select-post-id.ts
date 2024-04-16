import { AppState } from "../types/d";

export const selectPostId = ({ app} :{app: AppState}) => app.modal.id;
