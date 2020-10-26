import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import placeholder from '../../assets/images/avatar-placeholder.png';
import {getImageUrlFromAvatar, imageExists} from '../../url';

export const UserRow = (props) => {

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
		<div className="active-users__user">
			<img src={imageUrl || placeholder}
				className="active-users__img" alt={props.user.FirstName} />
			<Link to={{pathname: '/users', state: {personId: props.user.PersonId}}} className="active-users__link">
				{props.user.FullName}
			</Link>
		</div>
	);
};