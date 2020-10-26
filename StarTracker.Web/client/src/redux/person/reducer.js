import {CREATE_PERSON_DAILY_ACTIVITY_SUCCESS, CURRENT_PERSON_SCORE_SUCCESS, GET_LOGGED_IN_PERSON_SUCCESS, GET_PERSONS_CHART_DATA_SUCCESS, GET_PERSONS_TOP_FIVE_ACTIVITIES_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, RESET_UPDATE_PERSON_DETAILS_SUCCESS, SET_IMAGE_URL_SUCCESS, UPDATE_PERSON_AVATAR_SUCCESS, UPDATE_PERSON_DAILY_ACTIVITY_SUCCESS, UPDATE_PERSON_DETAILS_SUCCESS} from '../actionTypes';
export const initState = {
	personSidebarInfo: null,
	topFiveActivities: null,
	chartData: null,
	user: null,
	updateUserDetailsSuccess: false,
	imageUrl: null
};

const personReducer = (state = initState, action) => {

	switch (action.type) {
		case GET_PERSONS_CHART_DATA_SUCCESS:
			return {
				...state,
				chartData: action.payload
			};
		case GET_PERSONS_TOP_FIVE_ACTIVITIES_SUCCESS:
			return {
				...state,
				topFiveActivities: action.payload
			};
		case CURRENT_PERSON_SCORE_SUCCESS:
			return {
				...state,
				personSidebarInfo: {
					...state.personSidebarInfo,
					...action.payload
				}
			};
		case UPDATE_PERSON_DAILY_ACTIVITY_SUCCESS:
		case CREATE_PERSON_DAILY_ACTIVITY_SUCCESS:
			return {
				...state,
				topFiveActivities: null,
				chartData: action.payload.PersonMonthlyScores
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload
			};
		case GET_LOGGED_IN_PERSON_SUCCESS:
			return {
				user: action.payload
			};
		case UPDATE_PERSON_DETAILS_SUCCESS:
			return {
				...state,
				user: action.payload,
				updateUserDetailsSuccess: true
			};
		case RESET_UPDATE_PERSON_DETAILS_SUCCESS:
			return {
				...state,
				updateUserDetailsSuccess: false
			};
		case UPDATE_PERSON_AVATAR_SUCCESS:
			return {
				...state,
				user: action.payload
			};
		case SET_IMAGE_URL_SUCCESS:
			return {
				...state,
				imageUrl: action.payload
			};
		case LOGOUT_SUCCESS:
			return {
				...initState
			};
		default:
			return state;
	}
};

export default personReducer;