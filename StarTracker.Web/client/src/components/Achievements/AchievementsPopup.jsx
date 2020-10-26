import React from 'react';

export const AchievementsPopup = (props) => {
	return (
		<div className="achievement__card-popup">
			<h3 className="achievement__card-popup-heding">HOW TO GET THIS?</h3>
			<p className="achievement__card-popup-text">{ props.text }</p>
			<div className="achievement__card-popup-arrow"></div>
		</div>
	);
};