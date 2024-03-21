import { IApp } from "../types/d";

export const selectModalText = ({ app }:{app: IApp}) => app.modal.text;
