import {APPEND_NEXT_TO_CURRENT_TIMELINE, GET_NEXT_TIMELINE_SUCCESS, GET_TIMELINE_ALL_SUCCESS, LOGOUT_SUCCESS, RELOAD_PERSON_DAILY_ACTIVITY_CONGRATULATORS_SUCCESS, SET_INITIAL_TIMELINE_ACTIVITIES, SET_TIMELINE_PAGE_SUCCESS} from '../actionTypes';

export const initState = {
	hasMoreActivities: true,
	activities: null,
	nextActivities: null,
	page: 1
};

const timelineReducer = (state = initState, action) => {

	switch (action.type) {
		case SET_INITIAL_TIMELINE_ACTIVITIES:
			return {
				...state,
				activities: null,
				nextActivities: null,
				page: initState.page,
				hasMoreActivities: true
			};
		case GET_TIMELINE_ALL_SUCCESS:
			return {
				...state,
				activities: action.payload
			};
		case GET_NEXT_TIMELINE_SUCCESS:
			return {
				...state,
				nextActivities: action.payload,
				hasMoreActivities: !!action.payload.length
			};
		case APPEND_NEXT_TO_CURRENT_TIMELINE:
			return {
				...state,
				activities: [
					...state.activities,
					...state.nextActivities
				],
			};
		case SET_TIMELINE_PAGE_SUCCESS:
			return {
				...state,
				page: action.payload
			};
		case RELOAD_PERSON_DAILY_ACTIVITY_CONGRATULATORS_SUCCESS:
			return {
				...state,
				activities: changeCongratulatorsOfActivity(state, action)
			};
		case LOGOUT_SUCCESS:
			return {
				...initState
			};
		default:
			return state;
	}
};

function changeCongratulatorsOfActivity(state, action) {
	return [
		...state.activities.map(activity => {
			return {
				Date: activity.Date,
				PersonDailyActivities: activity.PersonDailyActivities.map(personDailyActivity => {
					const {personDailyActivityId, congratulators} = action.payload;
					if (personDailyActivityId === personDailyActivity.PersonDailyActivityId) {
						personDailyActivity.Congratulators = congratulators.map(congratulator => {
							return {
								FullName: `${congratulator.FirstName} ${congratulator.LastName}`,
								PersonId: congratulator.Id,
								Avatar: congratulator.Avatar
							};
						});
					}
					return personDailyActivity;
				})
			};
		})
	];
}

export default timelineReducer;