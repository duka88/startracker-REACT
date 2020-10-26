import React from 'react';
import {getIconPathForAchievement} from '../../utils/achievements';

export const SmallAchievement = (props) => {
	return (
		<div className='achievement__card achievement__card--people achievement__card--small'>
			<div className="achievement__card-points-wrap">
				<div className="achievement__card-icon-wrap">
					<img src={getIconPathForAchievement(props.achievement) || ''} className="achievement__card-icon" alt={''}/>
				</div>
			</div>
			<h2 className="achievement__card-title">{props.achievement.Name}</h2>

		</div>
	);
};