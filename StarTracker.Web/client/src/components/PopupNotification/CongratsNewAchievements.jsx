import React from 'react';
import { DetailedAchievement } from '../Achievements/DetailedAchievement';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideNotification } from '../../redux/notifications/actions';
import { ReactComponent as Star } from '../../assets/icons/star.svg';

const CongratsNewAchievements = (props) => {
  let dispatch = useDispatch();

  const { achievements } = props;

  const handleLinkClick = () => {
    dispatch(hideNotification());
  }

  return (
    <div className="unlocked-achievement__body">
      {/* Star image */}
      <span className="unlocked-achievement__icon">
        <Star />
      </span>

      {/* Title and Subtitle */}
      <span className="unlocked-achievement__note">Congrats!</span>
      <h2 className="unlocked-achievement__title">You've got a new achievement!</h2>

      {/* List of achievements */}
      <ul>
        {achievements?.map((a, idx) =>
          <li key={idx}>
            <DetailedAchievement
              locked={false}
              achievement={a}
            />
          </li>
        )}
      </ul>

      <Link onClick={handleLinkClick} to="/achievements" className="unlocked-achievement__cta">See all achievements</Link>
    </div>
  );

}

export default CongratsNewAchievements;