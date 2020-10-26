import {DASHBOARD_MOTIVATIONAL_QUOTE_SUCCESS, LOGIN_MOTIVATIONAL_QUOTE_SUCCESS, LOGOUT_SUCCESS, TIMELINE_HEADING_MOTIVATIONAL_QUOTE_SUCCESS, TIMELINE_SCORE_MOTIVATIONAL_QUOTE_SUCCESS} from '../actionTypes';
import motivationLogoHeading from '../../assets/icons/moon.svg';
import motivationLogoDashboard from '../../assets/icons/motivationaIcon.svg';
import motivationLogoScores from '../../assets/icons/astronaut.png';

export const initState = {
	timelineHeadingMotivationalQuote: null,
	timelineScoreMotivationalQuote: null,
	dashboardMotivationalQuote: null,
	loginMotivationalQuote: null
};

const motivationalQuoteReducer = (state = initState, action) => {

	switch (action.type) {
		case TIMELINE_HEADING_MOTIVATIONAL_QUOTE_SUCCESS:
			return {
				...state,
				timelineHeadingMotivationalQuote: {
					...action.payload,
					Logo: motivationLogoHeading
				}
			};
		case TIMELINE_SCORE_MOTIVATIONAL_QUOTE_SUCCESS:
			return {
				...state,
				timelineScoreMotivationalQuote: {
					...action.payload,
					Logo: motivationLogoScores
				}
			};
		case DASHBOARD_MOTIVATIONAL_QUOTE_SUCCESS:
			return {
				...state,
				dashboardMotivationalQuote: {
					...action.payload,
					Logo: motivationLogoDashboard
				}
			};
		case LOGIN_MOTIVATIONAL_QUOTE_SUCCESS:
			return {
				...state,
				loginMotivationalQuote: {
					...action.payload,
					Logo: motivationLogoDashboard
				}
			};
		case LOGOUT_SUCCESS:
			return {
				...initState
			};
		default:
			return state;
	}
};

export default motivationalQuoteReducer;