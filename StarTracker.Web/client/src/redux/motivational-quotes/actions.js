import Axios from 'axios';
import {API_URL} from '../../url';
import {
	TIMELINE_HEADING_MOTIVATIONAL_QUOTE_SUCCESS,
	TIMELINE_HEADING_MOTIVATIONAL_QUOTE_FAIL,
	TIMELINE_SCORE_MOTIVATIONAL_QUOTE_SUCCESS,
	TIMELINE_SCORE_MOTIVATIONAL_QUOTE_FAIL,
	DASHBOARD_MOTIVATIONAL_QUOTE_SUCCESS,
	DASHBOARD_MOTIVATIONAL_QUOTE_FAIL, LOGIN_MOTIVATIONAL_QUOTE_SUCCESS, LOGIN_MOTIVATIONAL_QUOTE_FAIL
} from '../actionTypes';
import {secondAction} from '../utils';

export function getTimelineHeadingMotivationalQuote() {

	return (dispatch) => {
		getRandomMotivationalQuote(TIMELINE_HEADING_MOTIVATIONAL_QUOTE_SUCCESS, TIMELINE_HEADING_MOTIVATIONAL_QUOTE_FAIL, dispatch);
	};

}

export function getTimelineScoreMotivationalQuote() {

	return (dispatch) => {
		getRandomMotivationalQuote(TIMELINE_SCORE_MOTIVATIONAL_QUOTE_SUCCESS, TIMELINE_SCORE_MOTIVATIONAL_QUOTE_FAIL, dispatch);
	};

}

export function getDashboardMotivationalQuote() {

	return (dispatch) => {
		getRandomMotivationalQuote(DASHBOARD_MOTIVATIONAL_QUOTE_SUCCESS, DASHBOARD_MOTIVATIONAL_QUOTE_FAIL, dispatch);
	};

}

export function getLoginMotivationalQuote() {

	return (dispatch) => {
		getRandomMotivationalQuote(LOGIN_MOTIVATIONAL_QUOTE_SUCCESS, LOGIN_MOTIVATIONAL_QUOTE_FAIL, dispatch);
	};

}

function getRandomMotivationalQuote(SUCCESS, FAIL, dispatch) {
	return Axios.get(`${API_URL}/motivational-quote/random`)
		.then(resp => {
			dispatch(secondAction(SUCCESS, resp.data));
		})
		.catch(e => {
			dispatch(secondAction(FAIL));
		});
}