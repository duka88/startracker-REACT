import React from 'react';
import {Activity} from './Activity';

export const ActivityList = (props) => {
	const slots = [];
	(() => {
		for (let i = 0; i < 5; i++) {
			slots.push(i);
		};
	})();

	return (
		<div className="top-activity-list">
			<h3 className="top-activity-list__heding">{props.title}</h3>
			{slots.map(((slot, index) =>
				props.activityList[index] ?
					<Activity key= {index} activity={props.activityList[index]} class={props.tag}/>
					: 	<Activity key={index} activity={null} class={'epmty'}/>
			))}

		</div>
	);
};