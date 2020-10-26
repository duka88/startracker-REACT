import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPersonsCompletedAchievementsForCurrentMonth } from '../../redux/achievements/actions';
import { getIconPathForAchievement } from '../../utils/achievements';

const UnlockedAchievements = () => {

  const dispatch = useDispatch();

  const userId = useSelector(state => state.person.user.Id);
  const completedAchievements = useSelector(state => state.achievements.currentMonthCompletedAchievements);

  useEffect(() => {
    !completedAchievements && dispatch(fetchPersonsCompletedAchievementsForCurrentMonth(userId));
  }, [dispatch, completedAchievements, userId]);

  return (
    <div className="side-bar__user-achievements">
      { completedAchievements?.map(achievement =>
        <div key={achievement.Id} className="side-bar__user-achievements-icon-wrap">
          <span className="side-bar__user-achievements-note">{achievement.Name}</span>
          <img src={getIconPathForAchievement(achievement) || ''} className="side-bar__user-achievements-icon" alt={achievement.Name} />
        </div>
      )}
    </div>
  );

}

export default UnlockedAchievements;