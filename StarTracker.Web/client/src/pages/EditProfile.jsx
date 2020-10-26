import React from 'react';
import {useSelector} from 'react-redux';
import {PageContainer} from '../components/Container/PageContainer';
import {Heading} from '../components/Heading/Heading';
import {UpdateUserDetails} from '../components/UpdateUserDetails/UpdateUserDetails';
import {ChangeUserAvatar} from '../components/ChangeUserAvatar/ChangeUserAvatar';
import {TopFiveActivities} from '../components/TopFiveActivities/TopFiveActivities';

export const EditProfile = () => {
	const user = useSelector(state => state.person.user);
	const heading = {
		h1: `Hi ${user.FirstName}!`,
		h2: 'Here you can edit your profile',
		p: 'Make sure to fill all your details to track your progress and achieve your goals.'
	};
	return (
		<PageContainer>
			<div className="row no-gutters">
				<Heading heading= {heading} />
			</div>
			<div className="row  no-gutters justify-content-between">
				<UpdateUserDetails />
				<ChangeUserAvatar />
			</div>
			<div className="row no-gutters">
				<TopFiveActivities />
			</div>
		</PageContainer>
	);
};