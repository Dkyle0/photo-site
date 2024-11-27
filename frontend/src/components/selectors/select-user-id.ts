import { UserState } from "../types/d";

export const selectUserId = ({ user }: {user: UserState}) => user.id;
