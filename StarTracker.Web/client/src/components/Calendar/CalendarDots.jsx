import React from 'react';

export const CalendarDots = (props) => {
	const skills = ['mvp', 'ts', 'ps'];
	const skillRegistry = {
		1: false,
		2: false,
		3: false
	};
	props.completedActivities && props.completedActivities.forEach(activity => {
		skillRegistry[activity.SkillType] = true;
	});
	const dots = Object.keys(skillRegistry).filter(key => skillRegistry[key]).map(key => skills[key - 1]);
	return (
		<div className="calender__dot-wrap">
			{
				dots.map(((item) => (
					<div key = {item} className={`calender__dot calender__dot--${item}`}></div>
				)))
			}
		</div>
	);
};
