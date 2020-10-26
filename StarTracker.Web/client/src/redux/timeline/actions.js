import Axios from 'axios';
import {APPEND_NEXT_TO_CURRENT_TIMELINE, GET_NEXT_TIMELINE_FAIL, GET_NEXT_TIMELINE_SUCCESS, GET_TIMELINE_ALL_FAIL, GET_TIMELINE_ALL_SUCCESS, RELOAD_PERSON_DAILY_ACTIVITY_CONGRATULATORS_SUCCESS, SET_INITIAL_TIMELINE_ACTIVITIES, SET_TIMELINE_PAGE_SUCCESS} from '../actionTypes';
import {secondAction} from '../utils';
import store from '../store';
import {API_URL} from '../../url';

const NUM_OF_ACTIVITIES_PER_PAGE = 5;

export function getTimeline(personId) {

	return (dispatch) => {
		const {page, activities} = store.getState().timeline;
		!activities && getTimelinePage(personId, page - 1, GET_TIMELINE_ALL_SUCCESS, GET_TIMELINE_ALL_FAIL, dispatch);
		getTimelinePage(personId, page, GET_NEXT_TIMELINE_SUCCESS, GET_NEXT_TIMELINE_FAIL, dispatch);
	};

}

export function congratulatePersonDailyActivity(personDailyActivityId) {
	return (dispatch) => {
		Axios.post(`${API_URL}/person-daily-activity/congratulate/${personDailyActivityId}`, {})
			.then(resp => {
				dispatch(secondAction(RELOAD_PERSON_DAILY_ACTIVITY_CONGRATULATORS_SUCCESS, {personDailyActivityId, congratulators: resp.data}));
			})
			.catch(e => {
				dispatch(secondAction(RELOAD_PERSON_DAILY_ACTIVITY_CONGRATULATORS_SUCCESS));
			});
	};
}

export function loadMoreActivities(personId) {
	return (dispatch) => {
		const {page} = store.getState().timeline;
		dispatch(secondAction(SET_TIMELINE_PAGE_SUCCESS, page + 1));
		dispatch(secondAction(APPEND_NEXT_TO_CURRENT_TIMELINE));
		dispatch(getTimeline(personId));
	};
}

export function setInitialTimelineActivities() {
	return (dispatch) => {
		dispatch(secondAction(SET_INITIAL_TIMELINE_ACTIVITIES));
	};
}

function getTimelinePage(personId, page, SUCCESS, FAIL, dispatch) {
	Axios.get(`${API_URL}/person-daily-activity/timeline-activities/${personId || ''}?page=${page}&take=${NUM_OF_ACTIVITIES_PER_PAGE}`)
		.then(resp => {
			dispatch(secondAction(SUCCESS, resp.data));
		})
		.catch(e => {
			dispatch(secondAction(FAIL));
		});
}