import Axios from 'axios';
import {API_URL} from '../../url';
import {GET_TOP_PERSONS_CURRENT_MONTH_FAIL, GET_TOP_PERSONS_CURRENT_MONTH_SUCCESS, GET_TOP_PERSONS_LAST_MONTH_FAIL, GET_TOP_PERSONS_LAST_MONTH_SUCCESS, GET_TOP_PERSONS_LAST_THREE_MONTHS_FAIL, GET_TOP_PERSONS_LAST_THREE_MONTHS_SUCCESS, GET_TOP_PERSONS_LAST_YEAR_FAIL, GET_TOP_PERSONS_LAST_YEAR_SUCCESS, GET_TOP_THREE_PERSONS_FAIL, GET_TOP_THREE_PERSONS_SUCCESS, SET_INITIAL_SCORES_STATE} from '../actionTypes';
import {secondAction} from '../utils';

export function getTopThreePersons() {

	return (dispatch) => {
		Axios.get(`${API_URL}/person-daily-activity/top-three-current-month`)
			.then(resp => {
				dispatch(secondAction(GET_TOP_THREE_PERSONS_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(GET_TOP_THREE_PERSONS_FAIL));
			});
	};

}

export function getTopPersonsForCurrentMonth() {

	return (dispatch) => {
		Axios.get(`${API_URL}/person-daily-activity/top-current-month`)
			.then(resp => {
				dispatch(secondAction(GET_TOP_PERSONS_CURRENT_MONTH_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(GET_TOP_PERSONS_CURRENT_MONTH_FAIL));
			});
	};

}

export function getTopPersonsForLastMonth() {

	return (dispatch) => {
		Axios.get(`${API_URL}/person-daily-activity/top-last-month`)
			.then(resp => {
				dispatch(secondAction(GET_TOP_PERSONS_LAST_MONTH_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(GET_TOP_PERSONS_LAST_MONTH_FAIL));
			});
	};

}

export function getTopPersonsForLastThreeMonths() {

	return (dispatch) => {
		Axios.get(`${API_URL}/person-daily-activity/top-last-three-months`)
			.then(resp => {
				dispatch(secondAction(GET_TOP_PERSONS_LAST_THREE_MONTHS_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(GET_TOP_PERSONS_LAST_THREE_MONTHS_FAIL));
			});
	};

}

export function getTopPersonsForLastYear() {

	return (dispatch) => {
		Axios.get(`${API_URL}/person-daily-activity/top-last-year`)
			.then(resp => {
				dispatch(secondAction(GET_TOP_PERSONS_LAST_YEAR_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(GET_TOP_PERSONS_LAST_YEAR_FAIL));
			});
	};

}

export function setInitialScoresState() {

	return (dispatch) => {
		dispatch(secondAction(SET_INITIAL_SCORES_STATE));
	};

}