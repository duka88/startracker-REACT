import React from 'react';
import {ReactComponent as DeclinedIcon} from '../../assets/icons/x.svg';
import {ReactComponent as ApprovedIcon} from '../../assets/icons/checkBigger.svg';
import moment from 'moment';

const MvpActivityProcessed = (props) => {

	const {
		activities,
		isApproved
	} = props;

	const formatDate = (date) => {
		const splitted = date.split('/');
		return `${splitted[1]}.${splitted[0]}.${splitted[2]}`;
	};

	return (
		<div className="unlocked-mvp__container">
			<div className="unlocked-mvp__body">
				<span className="unlocked-mvp__icon">
					{isApproved ? (<ApprovedIcon />) : (<DeclinedIcon />)}
				</span>

				{isApproved ?
					(
						<div>
							<span className="unlocked-mvp__note">Congrats!</span>
							<h2 className="unlocked-mvp__title">Your MVP activity is approved!</h2>
						</div>
					) : (
						<div>
							<span className="unlocked-mvp__note">We are sorry!</span>
							<h2 className="unlocked-mvp__title">Your MVP activity is declined.</h2>
						</div>
					)
				}

				{activities.map((activity, index) => {
					return (
						<div className="mvp__card" key={index}>
							{activity?.CompletedActivities?.map((act, idx) => {
								return (
									<p key={idx} className="mvp__card-note">
										{act.Description} - <span className="mvp__card-note-strong">{act.Points} pts</span>
									</p>
								);
							})}
							<span className="mvp__card-date-label">DATE: </span>
							<span className="mvp__card-date">{formatDate(moment(activity.Date).format('l'))}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MvpActivityProcessed;