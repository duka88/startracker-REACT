import React from 'react';
import arrow from '../../assets/icons/down-arrow-grey.png';

export const FormSelect = (props) => {
	return (
		<select
			value={props.value || props.name}
			onChange={props.handleChange}
			name={props.name}
			style={{backgroundImage: `url(${arrow})`}}
			className="edit-user__input edit-user__input--select"
		>
			<option value={props.name} className="edit-user__option" disabled>{props.name}</option>
			{props.options.map(((item, index) =>
				<option className="edit-user__option" key={index} value={item}>{item}</option>
			))}
		</select>
	);
};