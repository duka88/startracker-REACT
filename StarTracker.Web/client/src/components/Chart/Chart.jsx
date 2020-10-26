import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPersonChartData} from '../../redux/person/actions';
import {ChartContainer} from './ChartContainer';

export const Chart = () => {
	const dispatch = useDispatch();

	const personId = useSelector(state => state.person.user.Id);
	const chartData = useSelector(state => state.person.chartData);

	useEffect(() => {
		!chartData && dispatch(getPersonChartData(personId));
	}, [chartData, dispatch, personId]);

	return (
		<div className="card">
			<div className="card__head">
				<h2 className="card__title">Your Progress</h2>
				<p className="card__text">See your progress based on your scores for the past 6 months</p>
			</div>
			<div className="card__body card__body--chart">
				{chartData && <ChartContainer data={chartData} />}
			</div>
		</div>
	);
};