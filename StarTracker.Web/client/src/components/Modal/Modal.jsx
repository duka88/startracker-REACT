import React, {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NoActivity} from './NoActivity';
import {week, months} from '../../hellpers';
import close from '../../assets/icons/close.svg';
import {fetchAllGroupedActivities} from '../../redux/activities/actions';
import {showNotification} from '../../redux/notifications/actions';
import {ReactComponent as Check} from '../../assets/icons/check.svg';

const SkillTypeAccordionTitleRegistry = {
	MvpActivities: 'MVP',
	PeopleSkillsActivities: 'People Skills',
	TechnicalSkillsActivities: 'Technical Skills'
};

const SkillTypeMaxAllowedRegistry = {
	MvpActivities: 2,
	PeopleSkillsActivities: 3,
	TechnicalSkillsActivities: 3
};

export const Modal = () => {
	const dispatch = useDispatch();
	const visible = useSelector(state => state.modal.visible);
	const personDailyActivitySuccess = useSelector(state => state.modal.personDailyActivitySuccess);
	const activities = useSelector(state => state.activities.activities);
	const date = useSelector(state => state.modal.date);

	const displayDate = `${week[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
	const modalClasses = `modal ${visible ? ' modal--visible' : ''}`;

	const hasNewAchievements = useSelector(state => state.notifications.newAchievements);
	const closeModal = useCallback(() => {
		dispatch({
			type: 'CLOSE_MODAL'
		});
        hasNewAchievements?.length > 0 && dispatch(showNotification('New Achievement Unlocked!'));
	}, [dispatch, hasNewAchievements]);

	useEffect(() => {
		!activities && dispatch(fetchAllGroupedActivities());
	}, [dispatch, activities]);

	return (
		<div className={modalClasses}>
			<header className={'popup__header'}>
				<h2 className="modal__title">Add Your Activity</h2>
				<p className="modal__date" >{displayDate}</p>
				<img src={close}
					onClick={closeModal}
					className={'modal__close'}
					alt="close icon" />
			</header>
			<div className={'modal__body'}>
				{
					activities && Object.keys(activities).map(((key, index) =>
						<NoActivity
							key={index}
							closeModal={closeModal}
							activityGroupActivities={activities[key]}
							index={index}
							isMVP={key === 'MvpActivities'}
							title={SkillTypeAccordionTitleRegistry[key]}
							maxAllowed={SkillTypeMaxAllowedRegistry[key]}
						/>))
				}
				<div className={personDailyActivitySuccess ? 'edit-user__confirmation edit-user__confirmation--show' : 'edit-user__confirmation'}>
					<span className="edit-user__confirmation-icon">
						<Check />
					</span>
					<p className="edit-user__confirmation-text">Activity successfully saved</p>
				</div>
			</div>
		</div>
	);
};

