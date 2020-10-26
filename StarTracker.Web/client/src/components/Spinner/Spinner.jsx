import React from 'react';
import spinner from '../../assets/images/spinner.gif';
export const Spinner = () => {
	return (
		<div className="spinner">
			<img src={spinner} alt="loader"/>
		</div>
	);
};