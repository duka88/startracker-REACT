import React from 'react';


export const MotivationalQuote = (props) => {
	const classes = `m-quote ${props.class ? 'm-quote--' + props.class : ''}`;
	return (
		<div className={classes}>
			<h3 className="m-quote__title">{ props.mQuote?.Title }</h3>
			<p className="m-quote__text">{ props.mQuote?.Description }</p>
			<img src={ props.mQuote?.Logo } className="m-quote__logo" alt="qoute logo"/>
		</div>
	);
};