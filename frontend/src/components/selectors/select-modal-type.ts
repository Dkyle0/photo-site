import { AppState } from "../types/d";

export const selectModalType= ({ app} :{app: AppState}) => app.modal.type;
