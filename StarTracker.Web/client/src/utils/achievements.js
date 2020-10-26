import starter from '../assets/achievement-icons/starter.svg';
import points10 from '../assets/achievement-icons/10-points.svg';
import points20 from '../assets/achievement-icons/20-points.svg';
import place1 from '../assets/achievement-icons/1st-place.svg';
import place2 from '../assets/achievement-icons/2nd-place.svg';
import place3 from '../assets/achievement-icons/3rd-place.svg';
import differentActivities3 from '../assets/achievement-icons/3-different-activities.svg';
import differentActivities5 from '../assets/achievement-icons/5-different-activities.svg';
import quarterGuru from '../assets/achievement-icons/quarter-guru.svg';
import scoreIncrease from '../assets/achievement-icons/highest-jump.svg';
import weekStreak from '../assets/achievement-icons/4-week-streak.svg';
import masterOfTheYear from '../assets/achievement-icons/master-of-the-year.svg';

export function getIconPathForAchievement(achievement) {
	if (achievement.AchievementType === 0) return starter;
	if (achievement.AchievementType === 1 && achievement.Goal === 10) return points10; 				// points 10
	if (achievement.AchievementType === 1 && achievement.Goal === 20) return points20; 				// points 20
	if (achievement.AchievementType === 2 && achievement.Goal === 1) return place1; 				// place 1
	if (achievement.AchievementType === 2 && achievement.Goal === 2) return place2; 				// place 2
	if (achievement.AchievementType === 2 && achievement.Goal === 3) return place3; 				// place 3
	if (achievement.AchievementType === 3 && achievement.Goal === 3) return differentActivities3; 	// different activities 3
	if (achievement.AchievementType === 3 && achievement.Goal === 5) return differentActivities5; 	// different activities 5
	if (achievement.AchievementType === 4 && achievement.Goal === 4) return weekStreak; 			// week streak 4
	if (achievement.AchievementType === 5) return quarterGuru; 										// quarter guru
	if (achievement.AchievementType === 6) return masterOfTheYear; 									// master of the year
	if (achievement.AchievementType === 7) return scoreIncrease; 									// score increase
	return null;
}