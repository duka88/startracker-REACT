import React, {useEffect} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {Statistic} from './Statistic';
import {CardHeading} from '../Heading/CardHeading';
import {MotivationalQuote} from '../MotivationalQuote/MotivationalQuote';
import {months} from '../../hellpers';
import {getDashboardMotivationalQuote} from '../../redux/motivational-quotes/actions';
import {getLastMonthActivityStatistics} from '../../redux/activities/actions';

export const Statistics = () => {
	const dispatch = useDispatch();

	const activityStatistics = useSelector(state => state.activities.activityStatistics);

	const mQuote = useSelector(state => state.motivationalQuotes.dashboardMotivationalQuote);
	const year = new Date().getFullYear();
	const month = moment().subtract(1, 'months').month();
	const heading = {
		h: 'Statistics for the last month',
		p: `See top 3 activities for the ${months[month]} ${year}`
	};

	useEffect(() => {
		!mQuote && dispatch(getDashboardMotivationalQuote());
		!activityStatistics && dispatch(getLastMonthActivityStatistics());
	}, [mQuote, dispatch, activityStatistics]);

	return (
		<div className="card">
			<CardHeading heading = {heading} />
			<div className="card__body card__body--activity">
				<div>
					{activityStatistics && activityStatistics.map(((item, index) =>
						index < 3 ?
							<Statistic key = {index} activity = { item } />
							: ''
					))}
				</div>
				<MotivationalQuote mQuote = {mQuote} />
			</div>
		</div>
	);
};