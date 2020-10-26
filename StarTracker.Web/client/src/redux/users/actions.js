import Axios from 'axios';
import {API_URL} from '../../url';
import {GET_SELECTED_USER_INFO_SUCCESS, GET_SELECTED_USER_INFO_FAIL, GET_MOST_ACTIVE_USERS_SUCCESS, GET_MOST_ACTIVE_USERS_FAIL, SET_INITIAL_MOST_ACTIVE_USERS, SET_INITIAL_PERSON_INFO} from '../actionTypes';
import {secondAction} from '../utils';

export function getMostActiveUsers() {

	return (dispatch) => {
		Axios.get(`${API_URL}/person-daily-activity/most-active-users`)
			.then(resp => {
				dispatch(secondAction(GET_MOST_ACTIVE_USERS_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(GET_MOST_ACTIVE_USERS_FAIL));
			});
	};

}

export function setInitialMostActiveUsers() {

	return (dispatch) => {
		dispatch(secondAction(SET_INITIAL_MOST_ACTIVE_USERS));
	};

}

export function getPersonInfo(personId) {

	return (dispatch) => {
		Axios.get(`${API_URL}/person/${personId}`)
			.then(resp => {
				dispatch(secondAction(GET_SELECTED_USER_INFO_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(GET_SELECTED_USER_INFO_FAIL));
			});
	};

}

export function setInitialPersonInfo() {

	return (dispatch) => {
		dispatch(secondAction(SET_INITIAL_PERSON_INFO));
	};

}