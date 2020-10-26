import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getMonthScore} from '../../redux/calendar/actions';

export const CardHeading = (props) => {
	const dispatch = useDispatch();

	const classes = `card__head ${props.class ? 'card__head--' + props.class : ''}`;
	const {h, p, month, year, monthName} = props.heading;

	const personId = useSelector(state => state.person.user.Id);
	const monthScore = useSelector(state => state.calendar.monthScore);
	useEffect(() => {
		year && month && personId && dispatch(getMonthScore(year, month, personId));
	}, [month, year, dispatch, personId]);

	return (
		<header className={classes}>
			{ h && <h2 className="card__title"> {h} </h2>}
			{ p && <p className="card__text"> {p} </p>}
			{ month &&
				<p className="card__text card__text--date">
					Score for
					<span className="card__text-month"> {monthName}: </span>
					<span className="card__text-points">{ monthScore }</span>
				</p>
			}
		</header>
	);
};