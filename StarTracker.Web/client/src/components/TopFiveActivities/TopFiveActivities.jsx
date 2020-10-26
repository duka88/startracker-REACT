import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPersonsTopFiveActivitiesForEachSkillType} from '../../redux/person/actions';
import {CardHeading} from '../Heading/CardHeading';
import {ActivityList} from './ActivityList';

const skillTypeTitleRegistry = {
	MvpActivities: 'MVP activities',
	TechnicalSkillsActivities: 'Technical skills activities',
	PeopleSkillsActivities: 'People skills activities',
};

const skillTypeTagRegistry = {
	MvpActivities: 'mvp',
	TechnicalSkillsActivities: 'ts',
	PeopleSkillsActivities: 'ps',
};

export const TopFiveActivities = () => {
	const dispatch = useDispatch();

	const personId = useSelector(state => state.person.user.Id);
	const topFiveActivities = useSelector(state => state.person.topFiveActivities);

	useEffect(() => {
		!topFiveActivities && dispatch(getPersonsTopFiveActivitiesForEachSkillType(personId));
	}, [dispatch, personId, topFiveActivities]);

	const heading = {
		h: 'My top 5 activities'
	};

	return (
		<div className="card card--top-activities">
			<CardHeading heading ={heading} class= {'top-activities'}/>
			<div className="card__body card__body--top-activities">
				{topFiveActivities && Object.keys(topFiveActivities).map(((key, index) =>
					<ActivityList key={index} activityList={topFiveActivities[key]} title={skillTypeTitleRegistry[key]} tag={skillTypeTagRegistry[key]} />
				))}
			</div>
		</div>
	);
};