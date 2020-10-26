import React from 'react';

export const CalendarWeekDayNames = () => {
	const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	return (
		<div className="calendar__weeks-wrap">
			{weeks.map(((item, index) => (
				<div className="calendar__week" key={index}>{item}</div>
			)))}
		</div>
	);
};