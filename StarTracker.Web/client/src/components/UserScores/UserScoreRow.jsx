import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import placeholder from '../../assets/images/avatar-placeholder.png';
import {getImageUrlFromAvatar, imageExists} from '../../url';

export const UserScoreRow = (props) => {

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

	return (
		<tr className="scores-table__row">
			<td className="scores-table__data scores-table__data--palce">
				<p className="scores-table__place">{props.place}.</p>
			</td>
			<td className="scores-table__data">
				<div className="scores-table__user">
					<figure className="scores-table__img-wrap">
						<img src={imageUrl || placeholder}
							className="scores-table__img"
							alt={''} />
					</figure>
					<p className="scores-table__user-name">
						<Link to={{pathname: '/users', state: {personId: props.user.PersonId}}}>{props.user.FullName}</Link>
					</p>
				</div>
			</td>
			<td className="scores-table__data scores-table__data--score">
				<p className="scores-table__score">{props.user.Score}</p>
			</td>
		</tr>
	);
};