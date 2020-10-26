import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PageContainer} from '../components/Container/PageContainer';
import {Heading} from '../components/Heading/Heading';
import {UserPedestal} from '../components/UserPedestal/UserPedestal';
import {UserScores} from '../components/UserScores/UserScores';
import {getTopPersonsForCurrentMonth, getTopPersonsForLastMonth, getTopPersonsForLastThreeMonths, getTopPersonsForLastYear, getTopThreePersons, setInitialScoresState} from '../redux/scores/actions';

export const Scores = () => {
	const user = useSelector(state => state.person.user);

	const dispatch = useDispatch();

	const topThreePersons = useSelector(state => state.scores.topThreePersons);
	const topPersonsCurrentMonth = useSelector(state => state.scores.topPersonsCurrentMonth);
	const topPersonsLastMonth = useSelector(state => state.scores.topPersonsLastMonth);
	const topPersonsLastThreeMonths = useSelector(state => state.scores.topPersonsLastThreeMonths);
	const topPersonsLastYear = useSelector(state => state.scores.topPersonsLastYear);

	useEffect(() => {
		dispatch(setInitialScoresState());
	}, [dispatch]);

	useEffect(() => {
		!topThreePersons && dispatch(getTopThreePersons());
		!topPersonsCurrentMonth && dispatch(getTopPersonsForCurrentMonth());
		!topPersonsLastMonth && dispatch(getTopPersonsForLastMonth());
		!topPersonsLastThreeMonths && dispatch(getTopPersonsForLastThreeMonths());
		!topPersonsLastYear && dispatch(getTopPersonsForLastYear());
	}, [topThreePersons, topPersonsCurrentMonth, topPersonsLastMonth, topPersonsLastThreeMonths, topPersonsLastYear, dispatch]);

	const heading = {
		h1: `Hi ${user.FirstName}!`,
		h2: 'Here you can see monthly and quarterly scores',
		p: 'Remember that a little bit of competition is a good thing, as it forces us to do our best!'
	};
	const pedestalHeading = {
		h: 'Top 3 this month'
	};
	const currentMonthHeading = {
		h: 'Scores for this month'
	};
	const lastMonthHeading = {
		h: 'Scores for last month'
	};
	const lastThreeMonthHeading = {
		h: 'Top scores for the last three months'
	};
	const lastTwelveMonthHeading = {
		h: 'Top scores for the last twelve months'
	};

	return (
		<PageContainer>
			<div className="row no-gutters">
				<Heading heading={heading} />
			</div>
			<div className="row no-gutters">
				<UserPedestal heading={pedestalHeading} users={topThreePersons} />
			</div>
			<div className="row  no-gutters justify-content-between">
				<UserScores heading={currentMonthHeading} users={topPersonsCurrentMonth} />
				<UserScores heading={lastMonthHeading} users={topPersonsLastMonth} />
			</div>
			<div className="row no-gutters justify-content-between">
				<UserScores heading={lastThreeMonthHeading} users={topPersonsLastThreeMonths} />
				<UserScores heading={lastTwelveMonthHeading} users={topPersonsLastYear} />
			</div>
		</PageContainer>
	);
};