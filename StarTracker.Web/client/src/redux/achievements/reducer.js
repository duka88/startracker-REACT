import {
  CREATE_PERSON_DAILY_ACTIVITY_SUCCESS,
  FETCH_PERSONS_COMPLETED_ACHIEVEMENTS_SUCCESS,
  FETCH_PERSONS_LOCKED_ACHIEVEMENTS_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_PERSON_DAILY_ACTIVITY_SUCCESS,
  FETCH_PERSONS_COMPLETED_ACHIEVEMENTS_MONTHLY_FAIL,
  FETCH_PERSONS_COMPLETED_ACHIEVEMENTS_MONTHLY_SUCCESS
} from '../actionTypes';

export const initState = {
  completedAchievements: null,
  lockedAchievements: null,
  currentMonthCompletedAchievements: null
};

const achievementsReducer = (state = initState, action) => {

  switch (action.type) {
    case FETCH_PERSONS_COMPLETED_ACHIEVEMENTS_SUCCESS:
      return {
        ...state,
        completedAchievements: action.payload
      };
    case FETCH_PERSONS_LOCKED_ACHIEVEMENTS_SUCCESS:
      return {
        ...state,
        lockedAchievements: action.payload
      };
    case FETCH_PERSONS_COMPLETED_ACHIEVEMENTS_MONTHLY_SUCCESS:
      return {
        ...state,
        currentMonthCompletedAchievements: action.payload
      };
    case FETCH_PERSONS_COMPLETED_ACHIEVEMENTS_MONTHLY_FAIL:
      return {
        ...state
      };
    case UPDATE_PERSON_DAILY_ACTIVITY_SUCCESS:
    case CREATE_PERSON_DAILY_ACTIVITY_SUCCESS:
      return {
        ...initState
      };
    case LOGOUT_SUCCESS:
      return {
        ...initState
      };

    default:
      return state;
  }
};

export default achievementsReducer;