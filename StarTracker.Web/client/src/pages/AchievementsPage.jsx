import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PageContainer} from '../components/Container/PageContainer';
import {Heading} from '../components/Heading/Heading';
import {Achievements} from '../components/Achievements/Achievements';
import {fetchPersonsCompletedAchievements, fetchPersonsLockedAchievements, setInitialAchievementsState} from '../redux/achievements/actions';

export const AchievementsPage = () => {
	const dispatch = useDispatch();

	const user = useSelector(state => state.person.user);
	const completedAchievements = useSelector(state => state.achievements.completedAchievements);
	const lockedAchievements = useSelector(state => state.achievements.lockedAchievements);

	useEffect(() => {
		dispatch(setInitialAchievementsState());
	}, [dispatch]);

	useEffect(() => {
		!completedAchievements && dispatch(fetchPersonsCompletedAchievements(user.Id));
		!lockedAchievements && dispatch(fetchPersonsLockedAchievements(user.Id));
	}, [dispatch, completedAchievements, user.Id, lockedAchievements]);

	const heading = {
		h1: `Hi ${user.FirstName}!`,
		h2: 'Find all possible badges you can get',
		p: 'Read more about each one and plan your activities smart so you can collect all of them!'
	};
	const achivementdHeading = {
		h: `${ completedAchievements ? completedAchievements.length : '' } Unlocked Achievements`,
		p: 'Here you can see all achievements that you unlocked'
	};
	const achivementdHeadingLocked = {
		h: 'Locked Achievements',
		p: 'Here you can find all possible badges'
	};
	return (
		<PageContainer>
			<div className="row no-gutters">
				<Heading heading={heading} />
			</div>
			<div className="row row--achievements no-gutters justify-content-between">
				<Achievements areLocked={false} heading={achivementdHeading} achievements={completedAchievements} />
				<Achievements areLocked={true} heading={achivementdHeadingLocked} achievements={lockedAchievements} />
			</div>
		</PageContainer>
	);
};