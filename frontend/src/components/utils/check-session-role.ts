import { ROLE } from "../../constants/role";

export const checkSessionRole = () => {
	const userData: (string | null) = sessionStorage.getItem('userData');

	if (userData) {
		return JSON.parse(userData).roleId;
	}

	return ROLE.GUEST;
}
