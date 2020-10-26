import React from 'react';
import {DetailedAchievement} from './DetailedAchievement';
import {NavLink} from 'react-router-dom';
import {CardHeading} from '../Heading/CardHeading';
import {SmallAchievement} from './SmallAchievement';
export const Achievements = (props) => {
	const {achievements} = props;

	function show(index) {
		if (props.show) {
			if (index < props.show) {
				return true;
			}
			return false;
		}
		return true;
	}

	return (
		<div className={`card ${props.class ? 'achievements--' + props.class : '' }`}>
			<CardHeading heading = {props.heading} />
			<div className={`card__body card__body--achievement ${props.class ? 'card__body--achievements-' + props.class : '' }`}>
				{
					props.small ?
						<h3 className="achivments__user">
							{props.user?.FirstName} {props.user?.LastName}'s Achivments
						</h3>
						: ''
				}
				{ achievements && achievements.map(((item, index) => {
					if (props.small) {
						return	<SmallAchievement key = {index} achievement = { item } />;
					} else if (show(index)) {
						return <DetailedAchievement key = {index} achievement = { item } locked = {props.areLocked} />;
					} else { return ''; }
				}))}
				{ achievements && achievements.length > props.show ?
					<NavLink to="/achievements" className="achievement__link">
						<div className="achievement__link-wrap">
							<span className="achievement__link-text">See all achivements</span>
						</div>
					</NavLink>
					: ''}
			</div>
		</div>
	);
};