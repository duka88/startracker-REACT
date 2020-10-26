import React, {useCallback} from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {CalendarDots} from './CalendarDots';
import {CalendarPopup} from './CalendarPopup';

export const CalendarDay = (props) => {
	const dispatch = useDispatch();

	const currentSelectedDate = props.currentDate;
	const currentSelectedMonth = currentSelectedDate.month();
	const currentSelectedYear = currentSelectedDate.year();

	const currentDate = moment();
	const currentDay = currentDate.date();
	const currentMonth = currentDate.month();
	const currentYear = currentDate.year();

	const isActive = (() =>{
		if (props.dayEntry.date.date() === currentDay && props.dayEntry.date.month() === currentMonth && props.dayEntry.date.year() === currentYear) {
			return 'calender__day--current';
		}
		if (props.dayEntry.date.month() === currentSelectedMonth && props.dayEntry.date.year() === currentSelectedYear) {
			return 'calender__day--active';
		}
		return '';
	})();
	const openModal = useCallback(() => {
		!props.userDetailsPage && dispatch({
			type: 'OPEN_MODAL',
			payload: {
				personDailyActivity: props.dayEntry.activity,
				date: props.dayEntry.date.toDate(),
				calendarReloadDates: props.calendarReloadDates
			}
		});
	}, [dispatch, props]);

	return (
		<div className={props.dayEntry.activity?.CompletedActivities.length ? 'calendar__day-box calendar__day-box--dotted' : 'calendar__day-box'}>
			<div onClick={openModal} className={`calender__day-wrap ${isActive}`}>
				<CalendarDots completedActivities={props.dayEntry.activity?.CompletedActivities}/>
				<div className= "calender__day">
					{props.dayEntry.date.date()}
				</div>
				<CalendarPopup
					pts={props.dayEntry.activity?.Points || 0}
					userDetailsPage={props.userDetailsPage}
					completedActivities={props.dayEntry.activity?.CompletedActivities}
				/>
			</div>
		</div>
	);
};