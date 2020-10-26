import React from 'react';

export const Heading = (props) => {
	const classes = `header ${props.class ? 'header--' + props.class : ''}`;
	const heading = {...props.heading};
	return (
		<header className= {classes}>
			{ heading.h1 ? (<h1 className="header__h1 normal-weight"> { heading.h1 } </h1>) : '' }
			{ heading.h2 ? (<h2 className="header__h2 normal-weight"> { heading.h2 } </h2>) : '' }
			{ heading.p ? (<p className="header__p"> { heading.p } </p>) : '' }
		</header>
	);
};