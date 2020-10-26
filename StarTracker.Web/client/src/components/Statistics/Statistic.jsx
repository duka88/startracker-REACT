import React from 'react';

export const Statistic = (props) => {
	return (
		<div className="activity">
			<h3 className="activity__text">{props.activity.Count} {props.activity.ActivityGroupName} - {props.activity.ActivityName}</h3>
		</div>
	);
};