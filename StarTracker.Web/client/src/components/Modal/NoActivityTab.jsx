import React, {useEffect, useState} from 'react';

export const NoActivityTab = (props) => {
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		setSelected(props.selected);
	}, [props.selected]);

	return (
		<div className="modal__check-wrap">
			<input
				type="checkbox"
				checked={selected}
				className="modal__check-box"
				onChange={() => {
					if (props.canSelect || selected) {
						setSelected(!selected);
						props.handleChangeActivity(props.activity.ActivityId, props.selected);
					}
				}}
			/>
			<p className="modal__check-box-text">
				{props.activity.Description}
				<span className="modal__check-box-pts"> - {props.activity.Points} pts</span>
			</p>
		</div>
	);
};