import React from 'react';
import { Link } from 'react-router-dom';

const MvpAlreadyHandled = () => {

  return (
    <div className="mvp-notifications__content-holder mvp-notifications__content-holder--declined">
      <div className="mvp-notifications__content">
        <span class="mvp-notifications__check-icon">
          <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>x-mark</title>
            <g id="Confirmation-page" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="MVP-Already-Confirmed/declined" transform="translate(-529.000000, -357.000000)">
                <g id="Group" transform="translate(500.000000, 316.000000)">
                  <g id="x-mark" transform="translate(29.000000, 41.000000)">
                    <path d="M30,15 C30,23.2912445 23.2901001,30 15,30 C6.70875551,30 0,23.2901001 0,15 C0,6.70875551 6.7098999,0 15,0 C23.2912445,0 30,6.7098999 30,15 Z M27.65625,15 C27.65625,8.0042267 21.9948578,2.34375 15,2.34375 C8.0042267,2.34375 2.34375,8.00514223 2.34375,15 C2.34375,21.9957733 8.00514223,27.65625 15,27.65625 C21.9957733,27.65625 27.65625,21.9948578 27.65625,15 Z"
                      id="Shape" fill="#F17E7E" fill-rule="nonzero"></path>
                    <g id="Group-2" transform="translate(11.000000, 11.000000)" stroke="#F17E7E" stroke-linecap="round" stroke-width="2">
                      <line x1="0" y1="8" x2="8" y2="0" id="Line"></line>
                      <line x1="0" y1="0" x2="8" y2="8" id="Line"></line>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>
        <p className="mvp-notifications__content-text">Looks like someone already approved / declined this request!</p>
      </div>
      <div className="mvp-notifications-button-holder">
        <Link to="/" className="button button--approve">Go to Dashboard</Link>
      </div>
    </div>
  );

}

export default MvpAlreadyHandled;