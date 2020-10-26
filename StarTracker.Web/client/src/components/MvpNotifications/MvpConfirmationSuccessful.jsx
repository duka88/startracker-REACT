import React from 'react';
import { Link } from 'react-router-dom';

const MvpConfirmationSuccessful = (props) => {

  const { fullName } = props;

  return (
    <div className="mvp-notifications__content-holder mvp-notifications__content-holder--approved">
      <div className="mvp-notifications__content">
        <span class="mvp-notifications__check-icon">
          <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>check-mark</title>
            <g id="Edit-Profile" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Edit-Profile---with-notification" transform="translate(-414.000000, -840.000000)" fill="#318C8C" fill-rule="nonzero">
                <g id="Your-details" transform="translate(359.000000, 273.000000)">
                  <g id="notification" transform="translate(40.000000, 557.000000)">
                    <g id="Group-17" transform="translate(15.000000, 10.000000)">
                      <g id="check-mark">
                        <path d="M14.4204712,6.8269348 C14.725647,7.13211059 14.725647,7.62680055 14.4204712,7.93182375 L9.17938234,13.1730652 C8.87420656,13.4780884 8.37966918,13.4780884 8.0744934,13.1730652 L5.57952883,10.677948 C5.27435305,10.3729248 5.27435305,9.87823484 5.57952883,9.57321168 C5.88455199,9.2680359 6.37924195,9.2680359 6.68426516,9.57321168 L8.62686156,11.5158081 L13.3155823,6.8269348 C13.620758,6.52191164 14.115448,6.52191164 14.4204712,6.8269348 L14.4204712,6.8269348 Z M20,10 C20,15.5274963 15.5267334,20 10,20 C4.47250367,20 0,15.5267334 0,10 C0,4.47250367 4.4732666,0 10,0 C15.5274963,0 20,4.4732666 20,10 Z M18.4375,10 C18.4375,5.33615113 14.6632385,1.5625 10,1.5625 C5.33615113,1.5625 1.5625,5.33676148 1.5625,10 C1.5625,14.6638489 5.33676148,18.4375 10,18.4375 C14.6638489,18.4375 18.4375,14.6632385 18.4375,10 Z"
                          id="Shape"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>
        <p className="mvp-notifications__content-text">You have succesfully approved MVP points for <span className="mvp-notifications__content-text-user">{fullName}</span></p>
      </div>
      <div className="mvp-notifications-button-holder">
        <Link to="/" className="button button--approve">Go to Dashboard</Link>
      </div>
    </div>
  );
}

export default MvpConfirmationSuccessful;