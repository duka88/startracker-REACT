import {GET_TOP_PERSONS_CURRENT_MONTH_SUCCESS, GET_TOP_PERSONS_LAST_MONTH_SUCCESS, GET_TOP_PERSONS_LAST_THREE_MONTHS_SUCCESS, GET_TOP_PERSONS_LAST_YEAR_SUCCESS, GET_TOP_THREE_PERSONS_SUCCESS, LOGOUT_SUCCESS, SET_INITIAL_SCORES_STATE} from '../actionTypes';

export const initState = {
	topThreePersons: null,
	topPersonsCurrentMonth: null,
	topPersonsLastMonth: null,
	topPersonsLastThreeMonths: null,
	topPersonsLastYear: null,
};

const scoresReducer = (state = initState, action) => {

	switch (action.type) {
		case GET_TOP_THREE_PERSONS_SUCCESS:
			return {
				...state,
				topThreePersons: action.payload
			};
		case GET_TOP_PERSONS_CURRENT_MONTH_SUCCESS:
			return {
				...state,
				topPersonsCurrentMonth: action.payload
			};
		case GET_TOP_PERSONS_LAST_MONTH_SUCCESS:
			return {
				...state,
				topPersonsLastMonth: action.payload
			};
		case GET_TOP_PERSONS_LAST_THREE_MONTHS_SUCCESS:
			return {
				...state,
				topPersonsLastThreeMonths: action.payload
			};
		case GET_TOP_PERSONS_LAST_YEAR_SUCCESS:
			return {
				...state,
				topPersonsLastYear: action.payload
			};
		case SET_INITIAL_SCORES_STATE:
			return {...initState};
		case LOGOUT_SUCCESS:
			return {
				...initState
			};
		default:
			return state;
	}
};

export default scoresReducer;