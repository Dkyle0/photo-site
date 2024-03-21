import { IApp } from "../types/d";

export const selectModalonConfirm = ({ app }:{app: IApp} ) => app.modal.onConfirm;
