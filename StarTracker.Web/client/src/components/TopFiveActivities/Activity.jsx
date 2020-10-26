import React from 'react';

export const Activity = (props) => {
	return (
		<p className= {`top-activity-list__item top-activity-list__item--${props.class}`}>
			{props.activity ? <>
				<b>{props.activity.ActivityGroupName}</b> - {props.activity.ActivityName}
			</> : 'Start new activities to fill this space'}
		</p>
	);
};