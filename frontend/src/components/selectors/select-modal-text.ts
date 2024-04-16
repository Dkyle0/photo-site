import { AppState } from "../types/d";

export const selectModalText = ({ app }:{app: AppState}) => app.modal.text;
