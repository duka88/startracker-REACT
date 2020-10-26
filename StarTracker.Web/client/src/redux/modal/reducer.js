import {OPEN_MODAL, CLOSE_MODAL, UPDATE_PERSON_DAILY_ACTIVITY_SUCCESS, CREATE_PERSON_DAILY_ACTIVITY_SUCCESS, LOGOUT_SUCCESS, RESET_PERSON_DAILY_ACTIVITY_SUCCESS, UNLOCKED_ACHIEVEMENT_MODAL} from '../actionTypes';

export const initState = {
  visible: false,
	date: new Date(),
	personDailyActivity: null,
	calendarReloadDates: null,
	personDailyActivitySuccess: false
};

const modalReducer = (state = initState, action) => {

	switch (action.type) {
		case OPEN_MODAL:
			return {
				...state,
				visible: true,
				date: action.payload.date,
				personDailyActivity: action.payload.personDailyActivity,
				calendarReloadDates: action.payload.calendarReloadDates
			};
		case CLOSE_MODAL:
			return {
				...state,
				visible: false,
        date: new Date(),
        personDailyActivitySuccess: false
			};
		case UPDATE_PERSON_DAILY_ACTIVITY_SUCCESS:
		case CREATE_PERSON_DAILY_ACTIVITY_SUCCESS:
			return {
				...state,
				personDailyActivity: action.payload.PersonDailyActivity,
				personDailyActivitySuccess: true
			};
		case RESET_PERSON_DAILY_ACTIVITY_SUCCESS:
			return {
				...state,
				personDailyActivitySuccess: false
			};
		case LOGOUT_SUCCESS:
			return {
				...initState
      };
    case UNLOCKED_ACHIEVEMENT_MODAL:
      return {
        ...state,
        visible: true,
        content: action.payload
      };
		default:
			return state;
	}
};

export default modalReducer;