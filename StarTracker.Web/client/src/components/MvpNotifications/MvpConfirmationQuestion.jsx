import React from 'react';

const MvpConfirmationQuestion = (props) => {
  const { fullName, date, activities, imageSource, confirmCallback, declineCallback } = props;
  
  return (
    <div className="mvp-notifications__content-holder mvp-notifications__content-holder--question">
      <span className="mvp-notifications__subtitle">Request from:</span>
      <div className="mvp-notifications__content">
        <div className="mvp-notifications__header">
          <div className="mvp-notifications__user-wrap">
            <img className="mvp-notifications__img" src={imageSource} alt="user profile" />
            <span className="mvp-notifications__user-name">{fullName}</span>
          </div>
          <div className="mvp-notifications__date-holder">
            <span className="mvp-notifications__date-label">DATE:</span>
            <span className="mvp-notifications__date">{date}</span>
          </div>
        </div>
        <div className="mvp-notifications__body">
          <h3 className="mvp-notifications__list-name">REQUESTED ACTIVITIES:</h3>
          <ul className="mvp-notifications__list">
            {activities?.map(activity =>
              <li key={activity.Id} className="mvp-notifications__list-item">
                {activity.Description} -
            <span className="mvp-notifications__list-points"> {activity.Points} pts</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="mvp-notifications-button-holder">
        <button className="button button--approve" onClick={() => confirmCallback()}>Approve</button>
        <button className="button button--decline" onClick={() => declineCallback()}>Decline</button>
      </div>
    </div>
  );
}

export default MvpConfirmationQuestion;