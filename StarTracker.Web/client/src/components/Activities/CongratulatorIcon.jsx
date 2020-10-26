import React, {useEffect, useRef, useState} from 'react';
import placeholder from '../../assets/images/avatar-placeholder.png';
import {getImageUrlFromAvatar, imageExists} from '../../url';

export const CongratulatorIcon = (props) => {
	const [imageUrl, setImageUrl] = useState(null);
	const ref = useRef(true);

	useEffect(() => {
		return () => {
			ref.current = false;
		};
	}, []);

	useEffect(() => {
		const profileImageUrl = getImageUrlFromAvatar(props.congratulator?.Avatar);
		if (props.congratulator?.Avatar) {
			(props.congratulator) && imageExists(profileImageUrl, (exists) => {
				if (!ref.current) return null;
				exists ? setImageUrl(profileImageUrl) : setImageUrl(placeholder);
			});
		} else {
			setImageUrl(placeholder);
		}
	}, [props.congratulator, props.congratulator.Avatar]);

	return (
		<div className="activity-card__img-holder">
			<img
				src={imageUrl || placeholder}
				className="activity-card__img activity-card__img--liked"
				alt=''
			/>
			<span className="activity-card__congrat-name">{props.congratulator.FullName}</span>
		</div>
	);
};