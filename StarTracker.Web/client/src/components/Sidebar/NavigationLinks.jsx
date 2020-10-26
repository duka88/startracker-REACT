import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {ReactComponent as TimelineImg} from '../../assets/icons/feed.svg';
import {ReactComponent as DashboardImg} from '../../assets/icons/dashboard.svg';
import {ReactComponent as ScoresdImg} from '../../assets/icons/mission.svg';
import {ReactComponent as AchievementsImg} from '../../assets/icons/award.svg';
import {ReactComponent as EditImg} from '../../assets/icons/cogwheel.svg';
import {ReactComponent as LogOutImg} from '../../assets/icons/logout.svg';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/authentication/actions';

export const NavigationLinks = () => {
	const dispatch = useDispatch();

	const handleClickLogout = (e) => {
		dispatch(logout());
	};

	return (
		<nav className="side-bar__nav">
			<div>
				<NavLink to="/timeline" className="side-bar__link">
					<div className="side-bar__link-items">
						<TimelineImg className="side-bar__link-icon" />
						<span className="side-bar__link-text">Timeline</span>
					</div>
				</NavLink>
				<NavLink exact={true} to="/" className="side-bar__link">
					<div className="side-bar__link-items">
						<DashboardImg className="side-bar__link-icon" />
						<span className="side-bar__link-text">Dashboard</span>
					</div>
				</NavLink>
				<NavLink to="/scores" className="side-bar__link">
					<div className="side-bar__link-items">
						<ScoresdImg className="side-bar__link-icon" />
						<span className="side-bar__link-text">Scores</span>
					</div>
				</NavLink>
				<NavLink to="/achievements" className="side-bar__link">
					<div className="side-bar__link-items">
						<AchievementsImg className="side-bar__link-icon" />
						<span className="side-bar__link-text">Achievements</span>
					</div>
				</NavLink>
				<NavLink to="/edit-profile" className="side-bar__link">
					<div className="side-bar__link-items">
						<EditImg className="side-bar__link-icon" />
						<span className="side-bar__link-text">Edit profile</span>
					</div>
				</NavLink>
			</div>
			<Link to="/" onClick={handleClickLogout} className="side-bar__link side-bar__link--logout">
				<div className="side-bar__link-items">
					<LogOutImg className="side-bar__link-icon side-bar__link-icon--logout" />
					<span className="side-bar__link-text">Log out</span>
				</div>
			</Link>
		</nav>
	);
};