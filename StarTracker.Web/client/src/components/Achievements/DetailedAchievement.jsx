import React from 'react';
import {getIconPathForAchievement} from '../../utils/achievements';
import {AchievementsPopup} from './AchievementsPopup';

export const DetailedAchievement = (props) => {
	return (
		<div className={`achievement__card achievement__card--people ${props.locked ? ' achievement__card--' + props.locked : ''}`}>
			<div className="achievement__card-points-wrap">
				<div className="achievement__card-icon-wrap">
					<img src={getIconPathForAchievement(props.achievement) || ''} className="achievement__card-icon" alt={''}/>
				</div>
				{props.achievement.Points !== 0 &&
					<div className="achievement__card-points">
						<p className="achievement__card-point-text">+{props.achievement.Points} pts</p>
					</div>
				}
			</div>
			<div className="achievement__card-text-wrap">
				<h2 className="achievement__card-title">{props.achievement.Name}</h2>
				<p className="achievement__card-text">{props.achievement.Description}</p>
			</div>
			<div className="achievement__card-hover">
				<p className="achievement__card-hover-text">?</p>
				<AchievementsPopup text= {props.achievement.HowToUnlockDescription} />
			</div>
		</div>
	);
};