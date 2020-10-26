import React from 'react';
import {UserScoreRow} from './UserScoreRow';

export const UserScoresTable = (props) => {
	return (
		<table className="scores-table">
			<thead className="scores-table__head">
				<tr className="scores-table__head-row">
					<th className="scores-table__th-place">
						<p className="scores-table__head-text">PLACE</p>
					</th>
					<th className="scores-table__th-name">
						<p className="scores-table__head-text">FULL NAME</p>
					</th>
					<th className="scores-table__th-pionts">
						<p className="scores-table__head-text">POINTS</p>
					</th>
				</tr>
			</thead>
			<tbody className="scores-table__body">
				{props.users && props.users.map(((item, index) =>
					<UserScoreRow key= {index} user= {item} place = {index + 1}/>
				))}
			</tbody>
		</table>
	);
};