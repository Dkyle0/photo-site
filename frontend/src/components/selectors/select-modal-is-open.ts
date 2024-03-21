import { IApp } from "../types/d";

export const selectModalIsOpen = ({ app} :{app: IApp}) => app.modal.isOpen;
