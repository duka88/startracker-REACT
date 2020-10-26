import React from 'react';
import {Link} from 'react-router-dom';

export const MotivationalQuoteScores = (props) => {
	return (
		<div className="score-quote">
			<img src={props.mQuote?.Logo} className="score-quote__logo" alt="logo"/>
			<div className="score-quote__text-wrap">
				<h3 className="score-quote__title">{props.mQuote?.Title}</h3>
				<p className="score-quote__text">{props.mQuote?.Description}</p>
			</div>
			<Link to="/scores" className="button">Check current scores</Link>
		</div>
	);
};