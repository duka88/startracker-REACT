import React from 'react';

export const ErrorCard = (props) => {
	return (
		<div className="modal__error-card">
			<div className="modal__error-icon">?</div>
			<h3 className="modal__error-title">{props.error.title}</h3>
			<p className="modal__error-text">{props.error.text}</p>
		</div>
	);
};