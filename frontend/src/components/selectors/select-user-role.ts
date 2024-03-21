import { UserState } from "../types/d";

export const selectUserRole = ({ user }: {user: UserState}) => user.roleId;
