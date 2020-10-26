import React, {useEffect, useRef, useState} from 'react';
import {Redirect} from 'react-router';
import placeholder from '../../assets/images/avatar-placeholder.png';
import {getImageUrlFromAvatar, imageExists} from '../../url';

export const UserInfo = (props) => {

	const [imageUrl, setImageUrl] = useState(null);
	const ref = useRef(true);

	useEffect(() => {
		return () => {
			ref.current = false;
		};
	}, []);

	useEffect(() => {
		const profileImageUrl = getImageUrlFromAvatar(props.user?.Avatar);
		if (props.user?.Avatar) {
			(props.user) && imageExists(profileImageUrl, (exists) => {
				if (!ref.current) return null;
				exists ? setImageUrl(profileImageUrl) : setImageUrl(placeholder);
			});
		} else {
			setImageUrl(placeholder);
		}
	}, [props.user]);

	const [redirect, setRedirect] = useState(false);

	const handleClickRedirect = () => {
		setRedirect(true);
	};

	return redirect ? <Redirect to={{pathname: '/users', state: {personId: props.user.PersonId}}} /> : (
		<div className={`pedastal__user-wrap pedastal__user-wrap--${props.place}`} onClick={handleClickRedirect}>
			<figure className="pedastal__img-wrap">
				<img src={imageUrl || placeholder}
					className="pedastal__img" alt={''} />
			</figure>
			<div className="pedastal__text">
				<h2 className="pedastal__title">{props.user.FullName}</h2>
				<p className="pedastal__score">{props.user.Score}
					<span className="pedastal__span">pts</span></p>
			</div>
		</div>
	);
};