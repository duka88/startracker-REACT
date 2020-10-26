import moment from 'moment';

export function filterMvpActivities(activities, user) {
    const filtered = activities.filter(act => {
        if(act.CompletedActivities
            .filter(completed => 
                completed.SkillType === 1 
                && moment(completed.ProcessedAt).isAfter(moment(user.LastLogin))
            ).length > 0) 
        {
            return act;
        }
    });
    // const reduced = [];
    // filtered.map(act => {
    //     reduced.push(...act.CompletedActivities)
    // })
    return filtered;
}

export function isMvpActivityNewlyProcessed(activity, user) {

}