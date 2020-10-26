import React, {useState} from 'react';
import moment from 'moment';
import {CardHeading} from '../Heading/CardHeading';
import {FormSelect} from './FormSelect';
import {months} from '../../hellpers';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserDetails} from '../../redux/person/actions';

const genderNameToValueRegistry = {
	male: 0,
	female: 1
};

export const UpdateUserDetails = () => {
	const dispatch = useDispatch();

	const heading = {
		h: 'Update your details'
	};
	const days = [];
	const years = [];
	const genders = ['male', 'female'];
	const startYear = new Date().getFullYear() - 17;

	(() => {
		for (let i = 1; i < 32; i++) {
			days.push(i);
		};
	})();
	(() => {
		for (let i = 1970; i < startYear; i++) {
			years.push(i);
		};
	})();

	const user = useSelector(state => state.person.user);
	const updateUserDetailsSuccess = useSelector(state => state.person.updateUserDetailsSuccess);
	const dateOfBirth = moment(user.DateOfBirth);

	const [bio, setBio] = useState(user.Bio || '');
	const [day, setDay] = useState(dateOfBirth.date() || '');
	const [month, setMonth] = useState(dateOfBirth.format('MMMM') || '');
	const [year, setYear] = useState(dateOfBirth.year() || '');
	const [gender, setGender] = useState((user.Gender !== undefined && user.Gender !== null) ? user.Gender : 'gender');

	const handleChangeBio = (e) => {
		setBio(e.target.value);
	};

	const handleChangeDay = (e) => {
		setDay(e.target.value);
	};

	const handleChangeMonth = (e) => {
		setMonth(e.target.value);
	};

	const handleChangeYear = (e) => {
		setYear(e.target.value);
	};

	const handleChangeGender = (e) => {
		setGender(genderNameToValueRegistry[e.target.value]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const userDetails = {
			PersonId: user.Id,
			Bio: bio,
			DateOfBirth: moment().date(day).year(year).month(month).format('YYYY-MM-DD'),
			Gender: gender
		};
		dispatch(updateUserDetails(userDetails));
	};

	return (
		<div className="card card--edit-user">
			<CardHeading heading={heading} class={'edit-user'}/>
			<div className="card__body card__body--edit-user ">
				<form className="edit-user__form" action="" onSubmit={handleSubmit}>
					<div className="edit-user__row">
						<label htmlFor="bio" className="edit-user__label">Bio</label>
						<textarea
							value={bio}
							onChange={handleChangeBio}
							className="edit-user__input edit-user__input--textarea"
							placeholder="Short biography / status for your profile"
							name="bio" id="bio" cols="30" rows="5"
						>
						</textarea>
					</div>
					<div className="edit-user__row">
						<label htmlFor="date" className="edit-user__label">Date of birth</label>
						<div className="width-50">
							<FormSelect options={days} name={'day'} value={day} handleChange={handleChangeDay} />
						</div>
						<div className="width-50">
							<FormSelect options={months} name={'month'} value={month} handleChange={handleChangeMonth} />
						</div>
					</div>
					<div className="edit-user__row">
						<FormSelect options={years} name={'year'} value={year} handleChange={handleChangeYear} />
					</div>
					<div className="edit-user__row">
						<label htmlFor="Gender" className="edit-user__label">Gender</label>
						<FormSelect options={genders} name={'gender'} value={genders[gender]} handleChange={handleChangeGender} />
					</div>
					<button className="button button--edit-user" type="submit">Save</button>
				</form>
				<div className={updateUserDetailsSuccess ? 'edit-user__confirmation edit-user__confirmation--show' : 'edit-user__confirmation'}>
					<span className="edit-user__confirmation-icon">
						<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
							<title>check-mark</title>
							<g id="Edit-Profile" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
								<g id="Edit-Profile---with-notification" transform="translate(-414.000000, -840.000000)" fill="#318C8C" fillRule="nonzero">
									<g id="Your-details" transform="translate(359.000000, 273.000000)">
										<g id="notification" transform="translate(40.000000, 557.000000)">
											<g id="Group-17" transform="translate(15.000000, 10.000000)">
												<g id="check-mark">
													<path d="M14.4204712,6.8269348 C14.725647,7.13211059 14.725647,7.62680055 14.4204712,7.93182375 L9.17938234,13.1730652 C8.87420656,13.4780884 8.37966918,13.4780884 8.0744934,13.1730652 L5.57952883,10.677948 C5.27435305,10.3729248 5.27435305,9.87823484 5.57952883,9.57321168 C5.88455199,9.2680359 6.37924195,9.2680359 6.68426516,9.57321168 L8.62686156,11.5158081 L13.3155823,6.8269348 C13.620758,6.52191164 14.115448,6.52191164 14.4204712,6.8269348 L14.4204712,6.8269348 Z M20,10 C20,15.5274963 15.5267334,20 10,20 C4.47250367,20 0,15.5267334 0,10 C0,4.47250367 4.4732666,0 10,0 C15.5274963,0 20,4.4732666 20,10 Z M18.4375,10 C18.4375,5.33615113 14.6632385,1.5625 10,1.5625 C5.33615113,1.5625 1.5625,5.33676148 1.5625,10 C1.5625,14.6638489 5.33676148,18.4375 10,18.4375 C14.6638489,18.4375 18.4375,14.6632385 18.4375,10 Z" id="Shape"></path>
												</g>
											</g>
										</g>
									</g>
								</g>
							</g>
						</svg>
					</span>
					<p className="edit-user__confirmation-text">Your details are succesfuly updated</p>
				</div>
			</div>
		</div>
	);
};