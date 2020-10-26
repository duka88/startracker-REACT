import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import modalReducer, {initState as modalInitState} from './modal/reducer';
import authReducer, {initState as authInitState} from './authentication/reducer';
import usersReducer, {initState as usersInitState} from './users/reducer';
import personReducer, {initState as personInitState} from './person/reducer';
import activitiesReducer, {initState as activitiesInitState} from './activities/reducer';
import motivationalQuoteReducer, {initState as motivationalQuoteInitState} from './motivational-quotes/reducer';
import timelineReducer, {initState as timelineInitState} from './timeline/reducer';
import calendarReducer, {initState as calendarInitState} from './calendar/reducer';
import achievementsReducer, {initState as achievementsInitState} from './achievements/reducer';
import scoresReducer, {initState as scoresInitState} from './scores/reducer';
import mvpConfirmationReducer, {initState as mvpConfirmationInitState} from './mvp-confirmation/reducer';
import notificationsReducer, {initState as notificationsInitState} from './notifications/reducer'

const allReducers = combineReducers({
	modal: modalReducer,
	auth: authReducer,
	person: personReducer,
	users: usersReducer,
	activities: activitiesReducer,
	motivationalQuotes: motivationalQuoteReducer,
	timeline: timelineReducer,
	calendar: calendarReducer,
	achievements: achievementsReducer,
	scores: scoresReducer,
  mvpConfirmation: mvpConfirmationReducer,
  notifications: notificationsReducer
});

const allStoreEnhancers = compose(
	applyMiddleware(thunk),
);

const store = createStore(
	allReducers,
	{
		modal: modalInitState,
		auth: authInitState,
		person: personInitState,
		users: usersInitState,
		activities: activitiesInitState,
		motivationalQuotes: motivationalQuoteInitState,
		timeline: timelineInitState,
		calendar: calendarInitState,
		achievements: achievementsInitState,
		scores: scoresInitState,
    mvpConfirmation: mvpConfirmationInitState,
    notifications: notificationsInitState
	},
	allStoreEnhancers
);

export default store;
