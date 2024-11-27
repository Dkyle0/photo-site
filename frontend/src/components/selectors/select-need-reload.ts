import { AppState } from "../types/d";

export const selectNeedReload = ({ app} :{app: AppState}) => app.modal.needReload;
