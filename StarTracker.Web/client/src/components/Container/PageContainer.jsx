import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setNotificationsSeen} from '../../redux/activities/actions';
import {hideNotification, showNotification} from '../../redux/notifications/actions';

export const PageContainer = (props) => {
	const dispatch = useDispatch();
	const modalVisible = useSelector(state => state.modal.visible);
	const notificationVisible = useSelector(state => state.notifications.visible);

	const hasNewAchievements = useSelector(state => state.notifications.newAchievements);
	const newMvpActivities = useSelector(state => state.activities.processedMvpActivities);

	const approvedMvp = newMvpActivities?.filter(mvp => mvp.IsApproved);
	const declinedMvp = newMvpActivities?.filter(mvp => !mvp.IsApproved);

	const approved = approvedMvp?.length > 0;

	const closeModal = () => {
		hasNewAchievements?.length > 0
			&& !notificationVisible && dispatch(showNotification('New Achievement Unlocked!'));
		newMvpActivities && dispatch(setNotificationsSeen(
			approved ? approvedMvp : declinedMvp,
			approved ? declinedMvp : approvedMvp
		));
		notificationVisible && dispatch(hideNotification());
		dispatch({
			type: 'CLOSE_MODAL'
		});
	};

	return (
		<div className="main__content">
			{props.children}
			<div onClick= {closeModal} className={`overlay ${(modalVisible || notificationVisible) ? 'overlay--active' : ''}`}>
			</div>
		</div>
	);
};