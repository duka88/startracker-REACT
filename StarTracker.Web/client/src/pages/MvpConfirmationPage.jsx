import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { confirmMvpActivity, declineMvpActivity, getPersonDailyActivityByEncryptedId } from '../redux/mvp-confirmation/actions';
import { getImageUrlFromAvatar, imageExists } from '../url';
import placeholder from '../assets/images/avatar-placeholder.png';
import { MvpConfirmationQuestion, MvpConfirmationSuccessful, MvpDeclinationSuccessful, MvpAlreadyHandled } from '../components/MvpNotifications';

function getEncryptedIdFromUrl() {
  const urlTokens = window.location.href.split('confirmation/');
  return urlTokens.length ? urlTokens[1] : null;
}

export const MvpConfirmation = () => {
  const dispatch = useDispatch();
  const encryptedId = getEncryptedIdFromUrl();
  const activity = useSelector(state => state.mvpConfirmation.activity);
  const isConfirmSuccess = useSelector(state => state.mvpConfirmation.isConfirmSuccess);
  const isDeclineSuccess = useSelector(state => state.mvpConfirmation.isDeclineSuccess);
  const isAlreadyHandled = useSelector(state => state.mvpConfirmation.isAlreadyHandled);
  const shouldRenderConfirmForm = !isConfirmSuccess && !isDeclineSuccess && !isAlreadyHandled;

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    !activity && dispatch(getPersonDailyActivityByEncryptedId(encryptedId));
  }, [activity, encryptedId, dispatch]);

  useEffect(() => {
    const profileImageUrl = getImageUrlFromAvatar(activity?.Person?.Avatar);
    if (activity?.Person?.Avatar) {
      (activity?.Person) && imageExists(profileImageUrl, (exists) => {
        exists ? setImageUrl(profileImageUrl) : setImageUrl(placeholder);
      });
    } else {
      setImageUrl(placeholder);
    }
  }, [activity]);

  const handleClickConfirm = () => {
    dispatch(confirmMvpActivity(encryptedId));
  };

  const handleClickDecline = () => {
    dispatch(declineMvpActivity(encryptedId));
  };

  return (
    <div className="mvp-notifications">
      <div className="mvp-notifications__holder">

        <div className="side-bar__logo-wrap">
          <img src="/static/media/vega-logo.f156d075.svg" className="side-bar__logo" alt="logo" />
          <div className="side-bar__devider"></div>
          <span className="side-bar__h1">STAR TRACKER</span>
        </div>

        {/* mvp-notifacations__title - content needs to be changed depending on state (questioned, approved, declined, done)) */}
        <h2 className="mvp-notifacations__title">
          {shouldRenderConfirmForm && 'MVP activity confirmation'}
          {isConfirmSuccess && 'MVP activity approved'}
          {isDeclineSuccess && 'MVP activity declined'}
          {isAlreadyHandled && 'MVP activity already handled'}
        </h2>

        {/* state: Question */}
        {shouldRenderConfirmForm &&
          <MvpConfirmationQuestion
            fullName={`${activity ? activity.Person?.FirstName : ''} ${activity ? activity.Person?.LastName : ''}`}
            date={moment(activity?.Date).format('ll')}
            activities={activity?.CompletedActivities}
            imageSource={imageUrl || placeholder}
            confirmCallback={handleClickConfirm}
            declineCallback={handleClickDecline}
          />
        }

        {isConfirmSuccess && <MvpConfirmationSuccessful fullName={`${activity ? activity.Person?.FirstName : ''} ${activity ? activity.Person?.LastName : ''}`} />}
        {isDeclineSuccess && <MvpDeclinationSuccessful fullName={`${activity ? activity.Person?.FirstName : ''} ${activity ? activity.Person?.LastName : ''}`} />}
        {isAlreadyHandled && <MvpAlreadyHandled />}
      </div>
    </div>
  );
};