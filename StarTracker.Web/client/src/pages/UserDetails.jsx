import React, {useEffect} from 'react';
import {PageContainer} from '../components/Container/PageContainer';
import {Activities} from '../components/Activities/Activities';
import {UserDetail} from '../components/UserDetail/UserDetail';
import {Calendar} from '../components/Calendar/Calendar';
import {Achievements} from '../components/Achievements/Achievements';
import {useDispatch, useSelector} from 'react-redux';
import {getPersonInfo, setInitialPersonInfo} from '../redux/users/actions';
import {fetchPersonsCompletedAchievements} from '../redux/achievements/actions';
import {useLocation} from 'react-router';

export const UserDetails = () => {
	const user = useSelector(state => state.users.selectedUserInfo);
	const location = useLocation();

	const dispatch = useDispatch();

	const completedAchievements = useSelector(state => state.achievements.completedAchievements);

	useEffect(() => {
		dispatch(setInitialPersonInfo());
		location.state.personId && dispatch(getPersonInfo(location.state.personId));
		location.state.personId && dispatch(fetchPersonsCompletedAchievements(location.state.personId));
	}, [dispatch, location.state.personId]);

	useEffect(() => {
		return () => {
			dispatch(setInitialPersonInfo());
		};
	}, [dispatch]);

	return (
		<PageContainer>
			{
				user && <>
					<div className="row no-gutters">
						<UserDetail user={user} />
					</div>
					<div className="row no-gutters justify-content-between">
						<div className="content-with-sidebar">
							<h3 className="user-detail__activity-title">{user?.FirstName} {user?.LastName}'s latest activity</h3>
							<Activities user={user} class={'user-detail__activities'}/>
						</div>
						<div className="content-sidebar">
							<Calendar class={'calender--sidebar'} user={user} personId={user?.Id} userDetailsPage={true}/>
							<Achievements small={true} user={user} class={'sidebar'} achievements={completedAchievements} />
						</div>
					</div>
				</>
			}
		</PageContainer>
	);
};