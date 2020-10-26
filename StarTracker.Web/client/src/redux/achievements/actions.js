import Axios from 'axios';
import {API_URL} from '../../url';
import {
  FETCH_PERSONS_LOCKED_ACHIEVEMENTS_SUCCESS, 
  FETCH_PERSONS_COMPLETED_ACHIEVEMENTS_SUCCESS, 
  FETCH_PERSONS_COMPLETED_ACHIEVEMENTS_FAIL, 
  FETCH_PERSONS_LOCKED_ACHIEVEMENTS_FAIL, 
  SET_INITIAL_ACHIEVEMENTS_STATE,
  FETCH_PERSONS_COMPLETED_ACHIEVEMENTS_MONTHLY_SUCCESS,
  FETCH_PERSONS_COMPLETED_ACHIEVEMENTS_MONTHLY_FAIL
} from '../actionTypes';
import {secondAction} from '../utils';

export function fetchPersonsCompletedAchievements(personId) {

	return (dispatch) => {
		Axios.get(`${API_URL}/achievement/persons-completed/${personId}`)
			.then(resp => {
				dispatch(secondAction(FETCH_PERSONS_COMPLETED_ACHIEVEMENTS_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(FETCH_PERSONS_COMPLETED_ACHIEVEMENTS_FAIL));
			});
	};

}

export function fetchPersonsLockedAchievements(personId) {

	return (dispatch) => {
		Axios.get(`${API_URL}/achievement/persons-locked/${personId}`)
			.then(resp => {
				dispatch(secondAction(FETCH_PERSONS_LOCKED_ACHIEVEMENTS_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(FETCH_PERSONS_LOCKED_ACHIEVEMENTS_FAIL));
			});
	};

}

export function fetchPersonsCompletedAchievementsForCurrentMonth(personId) {

	return (dispatch) => {
		Axios.get(`${API_URL}/achievement/persons-completed-monthly/${personId}`)
			.then(resp => {
				dispatch(secondAction(FETCH_PERSONS_COMPLETED_ACHIEVEMENTS_MONTHLY_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(FETCH_PERSONS_COMPLETED_ACHIEVEMENTS_MONTHLY_FAIL));
			});
	};

}

export function setInitialAchievementsState() {

	return (dispatch) => {
		dispatch(secondAction(SET_INITIAL_ACHIEVEMENTS_STATE));
	};

}