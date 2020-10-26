import React from 'react';

export const CalendarPopup = (props) => {

	return (
		<div className="calender__cloud-wrap">
			{
				props.userDetailsPage ?
					<ul>
						{
							props.completedActivities ? props.completedActivities.map((activity, i) =>
								<li key={i}>
									<p className="calender__cloud-text">{activity.Description} - </p>
									<b>{activity.Points} pts</b></li>)
								:
								<p className="calender__cloud-text">{props.pts} pts</p>
						}
					</ul>
					:
					<p className="calender__cloud-text">{props.pts} pts</p>
			}
		</div>
	);
};

