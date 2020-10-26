import {
	CREATE_PERSON_DAILY_ACTIVITY_SUCCESS,
	FETCH_ALL_GROUPED_ACTIVITIES_SUCCESS,
	GET_LAST_MONTH_ACTIVITY_STATISTICS_SUCCESS,
	LOGOUT_SUCCESS,
	UPDATE_PERSON_DAILY_ACTIVITY_SUCCESS,
	FETCH_PROCESSED_MVP_ACTIVITIES_SUCCESS,
	HIDE_NOTIFICATION,
	REMOVE_SEEN_MVP_ACTIVITIES
} from '../actionTypes';

export const initState = {
	activities: null,
	activityStatistics: null,
	processedMvpActivities: null
};

const activitiesReducer = (state = initState, action) => {

	switch (action.type) {
		case FETCH_ALL_GROUPED_ACTIVITIES_SUCCESS:
			return {
				...state,
				activities: action.payload
			};
		case GET_LAST_MONTH_ACTIVITY_STATISTICS_SUCCESS:
			return {
				...state,
				activityStatistics: action.payload
			};
		case UPDATE_PERSON_DAILY_ACTIVITY_SUCCESS:
		case CREATE_PERSON_DAILY_ACTIVITY_SUCCESS:
			return {
				...state,
				activityStatistics: action.payload.ActivityStatistics
			};
		case LOGOUT_SUCCESS:
			return {
				...initState
			};
		case FETCH_PROCESSED_MVP_ACTIVITIES_SUCCESS:
			return {
				...state,
				processedMvpActivities: action.payload
			};
		case HIDE_NOTIFICATION:
			return {
				...state,
				processedMvpActivities: null
			};
		case REMOVE_SEEN_MVP_ACTIVITIES:
			return {
				...state,
				processedMvpActivities: action.payload
			};
		default:
			return state;
	}
};

export default activitiesReducer;