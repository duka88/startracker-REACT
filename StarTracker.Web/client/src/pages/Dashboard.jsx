import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PageContainer} from '../components/Container/PageContainer';
import {Heading} from '../components/Heading/Heading';
import {Calendar} from '../components/Calendar/Calendar';
import {Chart} from '../components/Chart/Chart';
import {Achievements} from '../components/Achievements/Achievements';
import {Statistics} from '../components/Statistics/Statistics';
import {fetchPersonsCompletedAchievements} from '../redux/achievements/actions';
import {getProcessedMvpActivities} from '../redux/activities/actions';
import { showNotification } from '../redux/notifications/actions';

export const Dashboard = () => {
	const dispatch = useDispatch();

	const user = useSelector(state => state.person.user);
	const completedAchievements = useSelector(state => state.achievements.completedAchievements);

	const mvpActivities = useSelector(state => state.activities.processedMvpActivities);
	const hasApprovedMvpActivities = mvpActivities?.filter(act => act.IsApproved === true);

	useEffect(() => {
		user && dispatch(getProcessedMvpActivities(user.Id));
	}, [dispatch, user]);

	useEffect(() => {
		!completedAchievements && dispatch(fetchPersonsCompletedAchievements(user.Id));
	}, [dispatch, completedAchievements, user.Id]);

	useEffect(() => {
		mvpActivities?.length > 0 &&
			dispatch(showNotification(hasApprovedMvpActivities?.length > 0
				? 'Activity approved'
				: 'Activity declined'));
	}, [dispatch, mvpActivities]);

	const heading = {
		h1: `Hi ${user.FirstName}!`,
		h2: 'What have you learned (done) today?',
		p: 'Please, add your recent activities'
	};
	const achivementdHeading = {
		h: `You have ${ completedAchievements ? completedAchievements.length : ''} achivements`,
		p: 'Here you can see your latest achivements'
	};

	return (
		<PageContainer>
			<div className="row no-gutters">
				<Heading heading= {heading} />
			</div>
			<div className="row justify-content-between no-gutters">
				<Calendar personId={user.Id} />
				<Chart />
			</div>
			<div className="row no-gutters justify-content-between">
				<Achievements shortened={true} show={3} heading={achivementdHeading} achievements={completedAchievements} />
				<Statistics />
			</div>
		</PageContainer>
	);
};