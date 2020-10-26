import {CONFIRM_MVP_ACTIVITIES_FAIL, CONFIRM_MVP_ACTIVITIES_SUCCESS, DECLINE_MVP_ACTIVITIES_FAIL, DECLINE_MVP_ACTIVITIES_SUCCESS, GET_PERSON_DAILY_ACTIVITY_ENCRYPTED_ID_FAIL, GET_PERSON_DAILY_ACTIVITY_ENCRYPTED_ID_SUCCESS, LOGOUT_SUCCESS} from '../actionTypes';

export const initState = {
	activity: null,
	isConfirmSuccess: false,
	isDeclineSuccess: false,
	isAlreadyHandled: false
};

const mvpConfirmationReducer = (state = initState, action) => {

	switch (action.type) {
		case CONFIRM_MVP_ACTIVITIES_SUCCESS:
			return {
				...state,
				isConfirmSuccess: true,
			};
		case DECLINE_MVP_ACTIVITIES_SUCCESS:
			return {
				...state,
				isDeclineSuccess: true,
			};
		case CONFIRM_MVP_ACTIVITIES_FAIL:
			return {
				...state,
				isAlreadyHandled: true,
			};
		case DECLINE_MVP_ACTIVITIES_FAIL:
			return {
				...state,
				isAlreadyHandled: true,
			};
		case GET_PERSON_DAILY_ACTIVITY_ENCRYPTED_ID_SUCCESS:
			return {
				...state,
				activity: action.payload
			};
		case GET_PERSON_DAILY_ACTIVITY_ENCRYPTED_ID_FAIL:
			return {
				...state,
				isAlreadyHandled: true,
			};
		case LOGOUT_SUCCESS:
			return {
				...initState
			};
		default:
			return state;
	}
};

export default mvpConfirmationReducer;