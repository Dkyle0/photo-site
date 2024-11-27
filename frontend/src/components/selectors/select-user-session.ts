import { UserState } from "../types/d";

export const selectUserSession = ({ user }: {user: UserState}) => user.session;
