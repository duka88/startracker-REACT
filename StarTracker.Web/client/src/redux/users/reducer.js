import {GET_MOST_ACTIVE_USERS_SUCCESS, GET_SELECTED_USER_INFO_SUCCESS, LOGOUT_SUCCESS, SET_INITIAL_MOST_ACTIVE_USERS, SET_INITIAL_PERSON_INFO, SET_SELECTED_USER_ID} from '../actionTypes';

export const initState = {
	mostActiveUsers: null,
	selectedUserId: null,
	selectedUserInfo: null
};

const usersReducer = (state = initState, action) => {

	switch (action.type) {
		case SET_SELECTED_USER_ID:
			return {
				...state,
				selectedUserId: action.payload
			};
		case GET_SELECTED_USER_INFO_SUCCESS:
			return {
				...state,
				selectedUserInfo: action.payload
			};
		case GET_MOST_ACTIVE_USERS_SUCCESS:
			return {
				...state,
				mostActiveUsers: action.payload
			};
		case SET_INITIAL_MOST_ACTIVE_USERS:
			return {
				...state,
				mostActiveUsers: null
			};
		case SET_INITIAL_PERSON_INFO:
			return {
				...state,
				selectedUserInfo: null
			};
		case LOGOUT_SUCCESS:
			return {
				...initState
			};
		default:
			return state;
	}
};

export default usersReducer;