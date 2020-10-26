import Axios from 'axios';
import {API_URL} from '../../url';
import {CURRENT_PERSON_SCORE_FAIL, CURRENT_PERSON_SCORE_SUCCESS, GET_PERSONS_CHART_DATA_FAIL, GET_PERSONS_CHART_DATA_SUCCESS, GET_PERSONS_TOP_FIVE_ACTIVITIES_FAIL, GET_PERSONS_TOP_FIVE_ACTIVITIES_SUCCESS, RESET_UPDATE_PERSON_DETAILS_SUCCESS, SET_IMAGE_URL_SUCCESS, UPDATE_PERSON_AVATAR_FAIL, UPDATE_PERSON_AVATAR_SUCCESS, UPDATE_PERSON_DETAILS_FAIL, UPDATE_PERSON_DETAILS_SUCCESS} from '../actionTypes';
import {secondAction} from '../utils';

export function getSidebarInfo(personId) {

	return (dispatch) => {
		Axios.get(`${API_URL}/person-daily-activity/current-person-score/${personId}`)
			.then(resp => {
				dispatch(secondAction(CURRENT_PERSON_SCORE_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(CURRENT_PERSON_SCORE_FAIL));
			});
	};

}

export function getPersonsTopFiveActivitiesForEachSkillType(personId) {

	return (dispatch) => {
		Axios.get(`${API_URL}/activity/top-for-person/${personId}`)
			.then(resp => {
				dispatch(secondAction(GET_PERSONS_TOP_FIVE_ACTIVITIES_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(GET_PERSONS_TOP_FIVE_ACTIVITIES_FAIL));
			});
	};

}

export function getPersonChartData(personId) {

	return (dispatch) => {
		Axios.get(`${API_URL}/person-daily-activity/monthly-person-scores/${personId}`)
			.then(resp => {
				dispatch(secondAction(GET_PERSONS_CHART_DATA_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(GET_PERSONS_CHART_DATA_FAIL));
			});
	};

}

export function updateUserDetails(userDetails) {

	return (dispatch) => {
		Axios.put(`${API_URL}/person/details`, userDetails)
			.then(resp => {
				dispatch(secondAction(UPDATE_PERSON_DETAILS_SUCCESS, resp.data));
				setTimeout(() => {
					dispatch(secondAction(RESET_UPDATE_PERSON_DETAILS_SUCCESS));
				}, 3000);
			})
			.catch(e => {
				dispatch(secondAction(UPDATE_PERSON_DETAILS_FAIL));
			});
	};

}

export function setImageUrl(imageUrl) {

	return (dispatch) => {
		dispatch(secondAction(SET_IMAGE_URL_SUCCESS, imageUrl));
	};

}

export function updateUserAvatar(userAvatar) {

	return (dispatch) => {
		Axios.put(`${API_URL}/person/avatar`, userAvatar)
			.then(resp => {
				dispatch(secondAction(UPDATE_PERSON_AVATAR_SUCCESS, resp.data));
				dispatch(secondAction(SET_IMAGE_URL_SUCCESS));
			})
			.catch(e => {
				dispatch(secondAction(UPDATE_PERSON_AVATAR_FAIL));
			});
	};

}

export function uploadAvatarImage(img) {

	return (dispatch) => {
		const headers = {headers: {'Content-Type': 'multipart/form-data'}};
		return Axios.post(`${API_URL}/person/upload-avatar-image`, img, headers)
			.then(() => {
				dispatch(secondAction(SET_IMAGE_URL_SUCCESS));
			}
			).catch(() => {
				dispatch(secondAction(SET_IMAGE_URL_SUCCESS));
			});
	};
}