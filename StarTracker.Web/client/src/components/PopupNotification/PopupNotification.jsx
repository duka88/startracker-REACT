import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import close from '../../assets/icons/close.svg';
import {setNotificationsSeen} from '../../redux/activities/actions';
import {hideNotification} from '../../redux/notifications/actions';
import CongratsNewAchievements from './CongratsNewAchievements';
import MvpActivityProcessed from './MvpActivityProcessed';

const PopupNotification = () => {
	const dispatch = useDispatch();
	const visible = useSelector(state => state.notifications.visible);
	const newAchievements = useSelector(state => state.notifications.newAchievements);
	const newMvpActivities = useSelector(state => state.activities.processedMvpActivities);
	const title = useSelector(state => state.notifications.title);

	const approvedMvp = newMvpActivities?.filter(mvp => mvp.IsApproved);
	const declinedMvp = newMvpActivities?.filter(mvp => !mvp.IsApproved);

	const approved = approvedMvp?.length > 0;

	const closeNotification = useCallback(() => {
		newMvpActivities && dispatch(setNotificationsSeen(
			approved ? approvedMvp : declinedMvp,
			approved ? declinedMvp : approvedMvp
		));
		dispatch(hideNotification());
	}, [dispatch, newMvpActivities, approved, approvedMvp, declinedMvp]);

	return (
		<div className={`modal ${visible ? 'modal--visible' : ''}`}>
			<header className={'unlocked-achievement__header'}>
				<h2 className="unlocked-achievement__header-title">{title}</h2>
				<img src={close}
					onClick={closeNotification}
					className="unlocked-achievement__close js-achievement-close"
					alt="close icon" />
			</header>

			<div className={'modal__body'}>

				{/* Add more notification contents if needed */}
				{newAchievements && <CongratsNewAchievements achievements={newAchievements} />}
				{newMvpActivities && approved ?
					(approvedMvp && <MvpActivityProcessed activities={approvedMvp} isApproved={true} />)
					:
					(declinedMvp && <MvpActivityProcessed activities={declinedMvp} isApproved={false}/>)
				}
			</div>
		</div>
	);
};

export default PopupNotification;