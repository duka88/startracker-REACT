import React, {useEffect, useState} from 'react';
import {CalendarHead} from './CalendarHead';
import {CalendarDay} from './CalendarDay';
import {CalendarWeekDayNames} from './CalendarWeekDayNames';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCalendarActivities, setCalendarInitialState} from '../../redux/calendar/actions';

export const Calendar = (props) => {
	const dispatch = useDispatch();

	const activities = useSelector(state => state.calendar.activities);

	const [currentDate, setCurrentDate] = useState(moment());
	const [isDateChanged, setisDateChanged] = useState(false);

	const firstDayInCalendar = moment(currentDate).startOf('month').startOf('week').startOf('day');
	const lastDayInCalendar = moment(currentDate).endOf('month').endOf('week').startOf('day');

	const numberOfWeeksInCalendar = Math.round(moment.duration(lastDayInCalendar.diff(firstDayInCalendar)).asWeeks());
	if (numberOfWeeksInCalendar === 5) lastDayInCalendar.add(1, 'weeks');

	const findActivityByDate = (date) => {
		return activities?.find(a => {
			const activityDate = moment(a.Date);
			return activityDate.date() === date.date() && activityDate.month() === date.month() && activityDate.year() === date.year();
		});
	};

	const nums = [];
	(() => {
		const date = moment(firstDayInCalendar);
		while (!(date.month() === lastDayInCalendar.month() && date.date() === lastDayInCalendar.date())) {
			nums.push({
				date: moment(date.add(1, 'days')),
				activity: findActivityByDate(date)
			});
		};
	})();

	const handleClickDateNavigationNext = () => {
		const newDate = moment(currentDate).add(1, 'months');
		setCurrentDate(newDate);
		setisDateChanged(true);
	};

	const handleClickDateNavigationPrev = () => {
		const newDate = moment(currentDate).subtract(1, 'months');
		setCurrentDate(newDate);
		setisDateChanged(true);
	};

	useEffect(() => {
		(!activities || isDateChanged) && dispatch(fetchCalendarActivities(firstDayInCalendar, lastDayInCalendar, props.personId));
		setisDateChanged(false);
	}, [dispatch, activities, isDateChanged, firstDayInCalendar, lastDayInCalendar, props.personId]);

	useEffect(() => {
		return () => {
			dispatch(setCalendarInitialState());
		};
	}, [dispatch]);

	const date = {month: currentDate.month(), year: currentDate.year()};
	return (
		<div className={`calender card ${props.class ? props.class : ''}`}>
			<CalendarHead date={date} user={props.user} changeMonthNext={handleClickDateNavigationNext} changeMonthPrev={handleClickDateNavigationPrev}/>
			<div className="card__body card__body--calendar">
				<CalendarWeekDayNames />
				<div className="calender__days" >
					{nums.map(((item, index) => (
						<CalendarDay
							key={index}
							dayEntry={item}
							currentDate={currentDate}
							calendarReloadDates={{startDate: firstDayInCalendar, endDate: lastDayInCalendar}}
							userDetailsPage={props.userDetailsPage}
						/>
					)))}
				</div>
			</div>
		</div>
	);
};