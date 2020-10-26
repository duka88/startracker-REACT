import Axios from 'axios';
import {
	CREATE_PERSON_DAILY_ACTIVITY_FAIL,
	CREATE_PERSON_DAILY_ACTIVITY_SUCCESS,
	CURRENT_PERSON_SCORE_SUCCESS,
	FETCH_ALL_GROUPED_ACTIVITIES_FAIL,
	FETCH_ALL_GROUPED_ACTIVITIES_SUCCESS,
	GET_LAST_MONTH_ACTIVITY_STATISTICS_FAIL,
	GET_LAST_MONTH_ACTIVITY_STATISTICS_SUCCESS,
	RESET_PERSON_DAILY_ACTIVITY_SUCCESS,
	UPDATE_PERSON_DAILY_ACTIVITY_FAIL,
	UPDATE_PERSON_DAILY_ACTIVITY_SUCCESS,
	RECEIVED_NEW_ACHIEVEMENTS,
	FETCH_PROCESSED_MVP_ACTIVITIES_SUCCESS,
	FETCH_CALENDAR_ACTIVITIES_FAIL,
	REMOVE_SEEN_MVP_ACTIVITIES,
	REMOVE_SEEN_MVP_ACTIVITIES_FAIL
} from '../actionTypes';
import {fetchCalendarActivities, getMonthScore} from '../calendar/actions';
import {secondAction} from '../utils';
import store from '../store';
import {API_URL} from '../../url';
import moment from 'moment';

const RESET_PERSON_DAILY_ACTIVITY_SUCCESS_TIMEOUT = 3000;

export function fetchAllGroupedActivities() {

	return (dispatch) => {
		Axios.get(`${API_URL}/activity/grouped-by-skill-type`)
			.then(resp => {
				dispatch(secondAction(FETCH_ALL_GROUPED_ACTIVITIES_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(FETCH_ALL_GROUPED_ACTIVITIES_FAIL));
			});
	};

}

export function updatePersonDailyActivity(personDailyActivity, existingAchievements) {
	const {startDate, endDate} = store.getState().modal.calendarReloadDates;
	return (dispatch) => {
		Axios.put(`${API_URL}/personDailyActivity`, personDailyActivity)
			.then(resp => {
				dispatch(secondAction(UPDATE_PERSON_DAILY_ACTIVITY_SUCCESS,
					resp.data.PersonDailyActivity.CompletedActivityIds ? resp.data : {...resp.data, PersonDailyActivity: null}));
				dispatch(secondAction(CURRENT_PERSON_SCORE_SUCCESS, {Score: resp.data.PersonScore}));
				dispatch(fetchCalendarActivities(startDate, endDate, personDailyActivity.PersonId));

				const dif = resp.data.PersonDailyActivity.CompletedAchievements.filter(ach => !existingAchievements.find(a => a.Id === ach.Id));
				dispatch(secondAction(RECEIVED_NEW_ACHIEVEMENTS, dif));

				const date = moment(resp.data.PersonDailyActivity.Date).format('l').split('/');
				dispatch(getMonthScore(date[2], date[0], resp.data.PersonDailyActivity.PersonId));

				setTimeout(() => dispatch(secondAction(RESET_PERSON_DAILY_ACTIVITY_SUCCESS)), RESET_PERSON_DAILY_ACTIVITY_SUCCESS_TIMEOUT);
			})
			.catch(e => {
				dispatch(secondAction(UPDATE_PERSON_DAILY_ACTIVITY_FAIL));
			});
	};

}

export function createPersonDailyActivity(personDailyActivity, existingAchievements) {
	const {startDate, endDate} = store.getState().modal.calendarReloadDates;
	const personId = store.getState().person.user.Id;
	return (dispatch) => {
		Axios.post(`${API_URL}/personDailyActivity`, personDailyActivity)
			.then(resp => {
				dispatch(secondAction(CURRENT_PERSON_SCORE_SUCCESS, {Score: resp.data.PersonScore}));
				dispatch(fetchCalendarActivities(startDate, endDate, personId));
				dispatch(secondAction(CREATE_PERSON_DAILY_ACTIVITY_SUCCESS, resp.data));

				const dif = resp.data.PersonDailyActivity.CompletedAchievements.filter(ach => !existingAchievements.find(a => a.Id === ach.Id));
				dispatch(secondAction(RECEIVED_NEW_ACHIEVEMENTS, dif));

				const date = moment(resp.data.PersonDailyActivity.Date).format('l').split('/');
				dispatch(getMonthScore(date[2], date[0], resp.data.PersonDailyActivity.PersonId));

				setTimeout(() => dispatch(secondAction(RESET_PERSON_DAILY_ACTIVITY_SUCCESS)), RESET_PERSON_DAILY_ACTIVITY_SUCCESS_TIMEOUT);
			})
			.catch(e => {
				dispatch(secondAction(CREATE_PERSON_DAILY_ACTIVITY_FAIL));
			});
	};

}

export function getLastMonthActivityStatistics() {

	return (dispatch) => {
		Axios.get(`${API_URL}/activity/top-three-for-last-month`)
			.then(resp => {
				dispatch(secondAction(GET_LAST_MONTH_ACTIVITY_STATISTICS_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(GET_LAST_MONTH_ACTIVITY_STATISTICS_FAIL));
			});
	};

}

export function getProcessedMvpActivities(personId) {
	return (dispatch) => {
		Axios.get(`${API_URL}/person-daily-activity/processed-mvp/${personId}`)
			.then(resp => {
				dispatch(secondAction(FETCH_PROCESSED_MVP_ACTIVITIES_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(FETCH_CALENDAR_ACTIVITIES_FAIL));
			});
	};
}

export function setNotificationsSeen(activities, remaining) {
	return (dispatch) => {
		Axios.put(`${API_URL}/person-daily-activity/processed-mvp/seen`, activities)
			.then(resp => {
				dispatch(secondAction(REMOVE_SEEN_MVP_ACTIVITIES, remaining));
			})
			.catch(e => {
				dispatch(secondAction(REMOVE_SEEN_MVP_ACTIVITIES_FAIL));
			});
	};
}