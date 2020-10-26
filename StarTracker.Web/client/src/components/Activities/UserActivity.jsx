import React, {useEffect, useRef, useState} from 'react';
import placeholder from '../../assets/images/avatar-placeholder.png';
import {ReactComponent as Clapping} from '../../assets/icons/clapping.svg';
import {useDispatch, useSelector} from 'react-redux';
import {congratulatePersonDailyActivity} from '../../redux/timeline/actions';
import {getImageUrlFromAvatar, imageExists} from '../../url';
import {CongratulatorIcon} from './CongratulatorIcon';
import {Link} from 'react-router-dom';

export const UserActivity = (props) => {
	const dispatch = useDispatch();

	const personId = useSelector(state => state.person.user.Id);

	const user = props.activity.Person;

	const [imageUrl, setImageUrl] = useState(null);
	const ref = useRef(true);

	useEffect(() => {
		return () => {
			ref.current = false;
		};
	}, []);

	useEffect(() => {
		const profileImageUrl = getImageUrlFromAvatar(user?.Avatar);
		if (user?.Avatar) {
			(!user) && imageExists(profileImageUrl, (exists) => {
				if (!ref.current) return null;
				exists ? setImageUrl(profileImageUrl) : setImageUrl(placeholder);
			});
		} else {
			setImageUrl(placeholder);
		}
	}, [user]);

	const isLiked = props.activity.Congratulators.filter(person => person.PersonId === personId).length !== 0;

	const [like, setLike] = useState(isLiked);

	function liked() {
		if (props.activity.Congratulators.length === 4) {
			return '+1 person';
		} else if (props.activity.Congratulators.length > 4) {
			return `+${props.activity.Congratulators.length - 3 } other people's`;
		}
		return '';
	};

	const handleClickCongratulate = (e) => {
		dispatch(congratulatePersonDailyActivity(props.activity.PersonDailyActivityId));
		setLike(!like);
	};

	const totalPoints = props.activity.CompletedActivities.reduce((sum, activity) => sum + activity.Points, 0);
	const completedActivities = props.activity.CompletedActivities.map((item => ` "${item.Description}"`)).join();
	const completedAchievements = props.activity.CompletedAchievements.map((item => ` "${item.Name}"`)).join();

	return (
		<div className="activity-card">
			<div className="activity-card__info-wrap">
				<div className="activity-card__user-wrap">
					<img src={imageUrl || placeholder}
						className="activity-card__img" alt={props.activity.Person.FullName} />
					<h4 className="activity-card__user-name">
						<Link to={{pathname: '/users', state: {personId: props.activity.Person.PersonId}}}>{props.activity.Person.FullName}</Link>
					</h4>
				</div>
				<ul className="activity-card__list">
					{props.activity.IsWaitingForApproval && <li className="activity-card__list-item">Is waiting for approval of MVP activities.</li>}
					{props.activity.CompletedActivities.length ? <li className="activity-card__list-item">Gained {totalPoints} pts for {completedActivities}</li> : ''}
					{completedAchievements.length ?
						<li className="activity-card__list-item">Unlocked new achievement - {completedAchievements}</li> : ''}
				</ul>
			</div>
			<div className="activity-card__devider"></div>
			<div className="activity-card__congrats-wrap">
				<Clapping className={`activity-card__icon ${!like ? 'activity-card__icon--inactiv' : ''}`}
					onClick={handleClickCongratulate} />
				<span className="activity-card__congrats">Congrats!</span>
				<div className="activity-card__likes-wrap">
					{props.activity.Congratulators.map(((congratulator, index) =>
						index < 3 ?
							<CongratulatorIcon congratulator={congratulator} key={index} />
							:
							<></>
					))}
				</div>
				<span className="activity-card__liked-count">
					{liked()}
				</span>
			</div>
		</div>
	);
};