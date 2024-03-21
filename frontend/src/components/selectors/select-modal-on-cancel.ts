import { IApp } from "../types/d";

export const selectModalonCencel = ({ app }: {app: IApp}) => app.modal.onCancel;
