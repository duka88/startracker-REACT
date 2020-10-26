import { FETCH_CALENDAR_ACTIVITIES_SUCCESS, LOGOUT_SUCCESS, SET_CALENDAR_INITIAL_STATE, FETCH_MONTH_SCORE_SUCCESS } from '../actionTypes';

export const initState = {
  activities: null,
  monthScore: null
};

const calendarReducer = (state = initState, action) => {

  switch (action.type) {
    case FETCH_CALENDAR_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: action.payload
      };
    case SET_CALENDAR_INITIAL_STATE:
      return {
        ...initState
      };
    case FETCH_MONTH_SCORE_SUCCESS:
      return {
        ...state,
        monthScore: action.payload
      }
    case LOGOUT_SUCCESS:
      return {
        ...initState
      };
    default:
      return state;
  }

};
export default calendarReducer;