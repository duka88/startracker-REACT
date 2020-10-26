import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTimeline, loadMoreActivities, setInitialTimelineActivities} from '../../redux/timeline/actions';
import {ActivitiesDay} from './ActivitiesDay';

export const Activities = (props) => {
	const dispatch = useDispatch();

	const activities = useSelector(state => state.timeline.activities);
	const hasMoreActivities = useSelector(state => state.timeline.hasMoreActivities);

	useEffect(() => {
		dispatch(setInitialTimelineActivities());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getTimeline(props.user ? props.user.Id : null));
	}, [dispatch, props.user]);

	const handleClickLoadMore = () => {
		dispatch(loadMoreActivities(props.user ? props.user.Id : null));
	};

	return (
		<div className={props.class}>
			{activities && activities.map(((item, index) => <ActivitiesDay key= {index} activity= {item}/>))}
			{hasMoreActivities && <p className="timeline__pagination" onClick={handleClickLoadMore}>Load more posts</p>}
		</div>
	);
};