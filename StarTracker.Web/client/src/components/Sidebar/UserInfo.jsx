import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import placeholder from '../../assets/images/avatar-placeholder.png';
import {setImageUrl} from '../../redux/person/actions';
import {getImageUrlFromAvatar, imageExists} from '../../url';

export const UserInfo = () => {
	const dispatch = useDispatch();

	const user = useSelector(state => state.person.personSidebarInfo);
	const imageUrl = useSelector(state => state.person.imageUrl);

	useEffect(() => {
		const profileImageUrl = getImageUrlFromAvatar(user?.Avatar);
		if (user?.Avatar) {
			(user) && imageExists(profileImageUrl, (exists) => exists ? dispatch(setImageUrl(profileImageUrl)) : dispatch(setImageUrl(placeholder)));
		} else {
			setImageUrl(placeholder);
		}
	}, [dispatch, user]);

	return (
		<div className="side-bar__user">
			<img src={imageUrl || placeholder} alt='' className="side-bar__user-img"/>
			<h2 className="side-bar__user-name"><Link to={{pathname: '/users', state: {personId: user?.PersonId}}}>{user?.FullName}</Link></h2>
			<div className="side-bar__user-score-wrap">
				<p className="side-bar__user-score">{user?.Score}</p>
				<p className="side-bar__user-score-text">current score</p>
			</div>
		</div>
	);
};