import {LOGIN_SUCCESS, LOGOUT_SUCCESS, PASSWORD_LOGIN_FAIL, SET_INITIAL_LOGIN_SUCCESS, USERNAME_LOGIN_FAIL} from '../actionTypes';

export const initState = {
	isLoggedIn: localStorage.getItem('token') !== null,
	loginSuccess: false,
	hasUsernameLoginError: false,
	hasPasswordLoginError: false,
};

const userReducer = (state = initState, action) => {

	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				loginSuccess: true,
				hasUsernameLoginError: false,
				hasPasswordLoginError: false
			};
		case PASSWORD_LOGIN_FAIL:
			return {
				...state,
				hasUsernameLoginError: false,
				hasPasswordLoginError: true
			};
		case USERNAME_LOGIN_FAIL:
			return {
				...state,
				hasUsernameLoginError: true,
				hasPasswordLoginError: false
			};
		case LOGOUT_SUCCESS:
			return {
				...initState,
				isLoggedIn: false,
			};
		case SET_INITIAL_LOGIN_SUCCESS:
			return {
				...state,
				loginSuccess: false
			};
		default:
			return state;
	}
};

export default userReducer;