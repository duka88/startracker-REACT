import {
	RECEIVED_NEW_ACHIEVEMENTS,
	SHOW_NOTIFICATION,
	HIDE_NOTIFICATION
} from '../actionTypes';

export const initState = {
	visible: false,
	newAchievements: null,
	title: ''
};

const notificationsReducer = (state = initState, action) => {

	switch (action.type) {
		case SHOW_NOTIFICATION:
			return {
				...state,
				visible: true,
				title: action.payload.title
			};
		case HIDE_NOTIFICATION:
			return {
				...state,
				visible: false,
				newAchievements: null
			};
		case RECEIVED_NEW_ACHIEVEMENTS:
			return {
				...state,
				newAchievements: action.payload
			};
		default:
			return state;
	}
};

export default notificationsReducer;