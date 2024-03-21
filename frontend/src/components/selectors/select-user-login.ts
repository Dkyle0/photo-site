import { UserState } from "../types/d";

export const selectUserLogin = ({ user }: {user: UserState}) => user.login;
