import React from 'react';
import {UserActivity} from './UserActivity';
import moment from 'moment';

export const ActivitiesDay = (props) => {
	return (
		<>
			<h3 className="timeline__activities-date ">{moment(props.activity.Date).format('ll')}</h3>
			{props.activity?.PersonDailyActivities.map(((item, index) =>
				<UserActivity key= {index} activity= {item}/>
			))}
		</>
	);
};