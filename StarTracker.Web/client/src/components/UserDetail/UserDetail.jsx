import React, {useEffect, useState} from 'react';
import placeholder from '../../assets/images/avatar-placeholder.png';
import {getImageUrlFromAvatar, imageExists} from '../../url';

export const UserDetail = (props) => {
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		const profileImageUrl = getImageUrlFromAvatar(props.user?.Avatar);
		if (props.user?.Avatar) {
			(props.user) && imageExists(profileImageUrl, (exists) => exists ? setImageUrl(profileImageUrl) : setImageUrl(placeholder));
		} else {
			setImageUrl(placeholder);
		}
	}, [props.user]);

	return (
		<div className="user-detail">
			<img className="user-detail__img" src={imageUrl || placeholder} alt="user"/>
			<div className="user-detail__text-wrap">
				<h2 className="user-detail__title">{props.user?.FirstName} {props.user?.LastName}</h2>
				<p className="user-detail__text">{props.user?.Bio}</p>
			</div>
			<div className="user-detail__moon"></div>
			<div className="user-detail__earth"></div>
			<div className="user-detail__venus"></div>
		</div>
	);
};