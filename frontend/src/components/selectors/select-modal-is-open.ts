import { AppState } from "../types/d";

export const selectModalIsOpen = ({ app} :{app: AppState}) => app.modal.isOpen;
