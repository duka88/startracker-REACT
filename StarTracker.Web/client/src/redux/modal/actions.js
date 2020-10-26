import {secondAction} from '../utils';
import {OPEN_MODAL, CLOSE_MODAL, UNLOCKED_ACHIEVEMENT_MODAL} from '../actionTypes';

export function openModal(title, content) {
	return (dispatch) => {
		dispatch(secondAction(OPEN_MODAL, {title, content}));
	};
}

export function closeModal() {
	return (dispatch) => {
		dispatch(secondAction(CLOSE_MODAL));
	};
}

