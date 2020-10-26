import React from 'react';
import {UserInfo} from './UserInfo';
import {CardHeading} from '../Heading/CardHeading';

export const UserPedestal = (props) => {

	return (
		<div className="pedastal">
			<CardHeading heading = {props.heading} class= {'pedastal'}/>
			<div className="pedastal__card">
				{props.users && props.users.map(((item, index) =>
					index < 3 ?
						<UserInfo key={index} user={item} place={index + 1}/>
						: ''
				))}
			</div>
		</div>
	);
};