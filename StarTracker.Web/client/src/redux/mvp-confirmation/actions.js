import Axios from 'axios';
import {API_URL} from '../../url';
import {CONFIRM_MVP_ACTIVITIES_FAIL, CONFIRM_MVP_ACTIVITIES_SUCCESS, DECLINE_MVP_ACTIVITIES_FAIL, DECLINE_MVP_ACTIVITIES_SUCCESS, GET_PERSON_DAILY_ACTIVITY_ENCRYPTED_ID_FAIL, GET_PERSON_DAILY_ACTIVITY_ENCRYPTED_ID_SUCCESS} from '../actionTypes';
import {secondAction} from '../utils';

export function getPersonDailyActivityByEncryptedId(encryptedId) {

	return (dispatch) => {
		Axios.get(`${API_URL}/person-daily-activity/get-by-encrypted-id?id=${encryptedId}`)
			.then(resp => {
				dispatch(secondAction(GET_PERSON_DAILY_ACTIVITY_ENCRYPTED_ID_SUCCESS, resp.data));
			})
			.catch(e => dispatch(secondAction(GET_PERSON_DAILY_ACTIVITY_ENCRYPTED_ID_FAIL)));
	};

}

export function confirmMvpActivity(encryptedId) {

	return (dispatch) => {
		Axios.get(`${API_URL}/person-daily-activity/confirm-mvp-activities?id=${encryptedId}`)
			.then(resp => {
				dispatch(secondAction(CONFIRM_MVP_ACTIVITIES_SUCCESS, resp.data));
			})
			.catch(e => {
				if (e.response?.status === 404) {
					dispatch(secondAction(CONFIRM_MVP_ACTIVITIES_FAIL));
				}
				if (e.response?.status === 400) {
					dispatch(secondAction(CONFIRM_MVP_ACTIVITIES_FAIL));
				}
			});
	};

}

export function declineMvpActivity(encryptedId) {

	return (dispatch) => {
		Axios.get(`${API_URL}/person-daily-activity/decline-mvp-activities?id=${encryptedId}`)
			.then(resp => {
				dispatch(secondAction(DECLINE_MVP_ACTIVITIES_SUCCESS, resp.data));
			})
			.catch(e => {
				if (e.response?.status === 404) {
					dispatch(secondAction(DECLINE_MVP_ACTIVITIES_FAIL));
				}
				if (e.response?.status === 400) {
					dispatch(secondAction(DECLINE_MVP_ACTIVITIES_FAIL));
				}
			});
	};

}
