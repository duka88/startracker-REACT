import React from 'react';
import {Switch, Route} from 'react-router';
import {AchievementsPage} from '../../pages/AchievementsPage';
import {UserDetails} from '../../pages/UserDetails';
import {Dashboard} from '../../pages/Dashboard';
import {Scores} from '../../pages/Scores';
import {Timeline} from '../../pages/Timeline';
import {EditProfile} from '../../pages/EditProfile';

const Routes = () => {
	return (
		<Switch>
			<Route exact path='/' component={Dashboard} />
			<Route exact path='/timeline' component={Timeline} />
			<Route exact path='/users' component={UserDetails} />
			<Route exact path='/edit-profile' component={EditProfile} />
			<Route exact path='/achievements' component={AchievementsPage} />
			<Route exact path='/scores' component={Scores} />
		</Switch>
	);
};

export default Routes;
