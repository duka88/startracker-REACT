import React, {useEffect, useState} from 'react';
import {CardHeading} from '../Heading/CardHeading';
import placeholder from '../../assets/images/avatar-placeholder.png';
import astronautPlaceholder from '../../assets/icons/astronaut-avatar.png';
import {useDispatch, useSelector} from 'react-redux';
import {setImageUrl, updateUserAvatar, uploadAvatarImage} from '../../redux/person/actions';
import {getImageUrlFromAvatar, imageExists} from '../../url';

export const ChangeUserAvatar = () => {
	const dispatch = useDispatch();

	const user = useSelector(state => state.person.user);

	const [hasProfilePhoto, setHasProfilePhoto] = useState(false);
	const imageUrl = useSelector(state => state.person.imageUrl);

	useEffect(() => {
		const profileImageUrl = getImageUrlFromAvatar(user?.Avatar);
		(imageUrl && (imageUrl !== placeholder)) ? setHasProfilePhoto(true) : setHasProfilePhoto(false);

		if (!!user?.Avatar) {
			(!imageUrl && user) && imageExists(profileImageUrl, (exists) => {
				exists ? dispatch(setImageUrl(profileImageUrl)) : dispatch(setImageUrl(placeholder));
			});
		} else {
			dispatch(setImageUrl(placeholder));
		}
	}, [dispatch, imageUrl, user]);

	const heading = {
		h: 'Change your avatar'
	};

	const handleImageUpload = (e) => {
		const files = e.target.files;
		const reader = new FileReader();
		reader.readAsDataURL(files[0]);

		const data = new FormData();
		const imagedata = e.target.files[0];
		data.append('inputname', imagedata);
		dispatch(uploadAvatarImage(data));

		const userAvatar = {
			PersonId: user.Id,
			Avatar: `${user.Username}.png`
		};
		dispatch(updateUserAvatar(userAvatar));
	};

	const handleClickDelete = (e) => {
		e.preventDefault();
		const userAvatar = {
			PersonId: user.Id,
			Avatar: ''
		};
		hasProfilePhoto && dispatch(updateUserAvatar(userAvatar));
	};

	const imageSource = (imageUrl && (imageUrl !== placeholder)) ? imageUrl : astronautPlaceholder;
	return (
		<div className="card card--avatar-change">
			<CardHeading heading = {heading} class= {'edit-user'}/>
			<div className="card__body card__body--avatar-change ">
				<form action="" className="avatar-change__form">
					<div className="avatar-change__img-wrap">
						<img src={imageSource} alt="avatar"/>
					</div>
					<div className="avatar-change__button-wrap">
						<label htmlFor="addImage" className="avatar-change__label">
							<input type="file" id="addImage" style={{display: 'none'}} onChange={handleImageUpload} />
							<div className="button">Upload new picture</div>
						</label>
						<button className={hasProfilePhoto ? 'button' : 'button button--grey'} onClick={handleClickDelete}>Delete</button>
					</div>
				</form>
			</div>
		</div>
	);
};