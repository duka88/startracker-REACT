import React from 'react';
import {UserScoresTable} from './UserScoresTable';
import {CardHeading} from '../Heading/CardHeading';

export const UserScores = (props) => {
	return (
		<div className="card card--user-score">
			<CardHeading heading={props.heading} class="user-score" />
			<div className="card__body card__body--user-score">
				<UserScoresTable users={props.users} />
			</div>
		</div>
	);
};