import {secondAction} from '../utils';
import {SHOW_NOTIFICATION, HIDE_NOTIFICATION} from '../actionTypes';

export function showNotification(title) {
	return (dispatch) => {
		dispatch(secondAction(SHOW_NOTIFICATION, {title: title}));
	};
}

export function hideNotification() {
	return (dispatch) => {
		dispatch(secondAction(HIDE_NOTIFICATION));
	};
}