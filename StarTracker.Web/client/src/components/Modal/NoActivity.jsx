import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { NoActivityTab } from './NoActivityTab';
import { ErrorCard } from './ErrorCard';
import arrow from '../../assets/icons/down-arrow-grey.png';
import { useDispatch, useSelector } from 'react-redux';
import { createPersonDailyActivity, updatePersonDailyActivity } from '../../redux/activities/actions';

export const NoActivity = (props) => {
  const dispatch = useDispatch();

  const personDailyActivity = useSelector(state => state.modal.personDailyActivity);
  const date = useSelector(state => state.modal.date);

  const [sendMail, setSendMailState] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const [numberOfSelectedActivities, setNumberOfSelectedActivities] = useState(0);
  const [selectedActivityIds, setSelectedActivityIds] = useState([]);
  const [initialActivityIds, setInitialActivityIds] = useState([]);

  const setSendMail = useCallback((value) => {
    props.isMVP && setSendMailState(value);
  }, [props.isMVP]);

  const isActivitySelected = useCallback((id) => {
    return !!selectedActivityIds.find(i => i === id);
  }, [selectedActivityIds]);

  const calculateNumberOfSelectedActivities = useCallback(() => {
    let currentNumberOfSelectedActivities = 0;
    props.activityGroupActivities.forEach(activityGroupActivitiesEntry => activityGroupActivitiesEntry.Activities.forEach(item =>
      currentNumberOfSelectedActivities += isActivitySelected(item.ActivityId) ? 1 : 0));
    currentNumberOfSelectedActivities !== numberOfSelectedActivities && setNumberOfSelectedActivities(currentNumberOfSelectedActivities);
  }, [isActivitySelected, numberOfSelectedActivities, props.activityGroupActivities]);

  useEffect(() => {
    calculateNumberOfSelectedActivities();
  }, [calculateNumberOfSelectedActivities]);

  useEffect(() => {
    setSelectedActivityIds(personDailyActivity ? [...personDailyActivity.CompletedActivityIds] : []);
    setInitialActivityIds(personDailyActivity ? [...personDailyActivity.CompletedActivityIds] : []);
    setSendMail(personDailyActivity ? personDailyActivity.IsWaitingForMvpApproval : false);
  }, [personDailyActivity, setSelectedActivityIds, setInitialActivityIds, setSendMail]);

  const toggleHeight = (el) => {
    if (maxHeight !== 0) {
      setMaxHeight(0);
    } else {
      el.stopPropagation();
      setMaxHeight(document.querySelector(`.modal__no-activity-inner-wrap--${props.index}`).offsetHeight + 36);
    }
  };

  const handleChangeSelectedActivityId = (id, selected) => {
    if (!selected) {
      selectedActivityIds.push(id);
    } else {
      const indexOfId = selectedActivityIds.indexOf(id);
      selectedActivityIds.splice(indexOfId, 1);
    }
    setSelectedActivityIds(selectedActivityIds);
    calculateNumberOfSelectedActivities();
  };

  const handleClickToggleSendMail = () => {
    props.isMVP ? setSendMail(true) : handleClickSave();
  };

  let existingAchievements = useSelector(state => state.achievements.completedAchievements);

  const handleClickSave = () => {
    if (personDailyActivity) {
      const personDailyActivityToUpdate = {
        Id: personDailyActivity.Id,
        PersonId: personDailyActivity.PersonId,
        Date: personDailyActivity.Date,
        CompletedActivityIds: selectedActivityIds
      };
      dispatch(updatePersonDailyActivity(personDailyActivityToUpdate,existingAchievements));
    } else {
      const personDailyActivityToCreate = {
        Date: moment(date).format('YYYY-MM-DD'),
        CompletedActivityIds: selectedActivityIds
      };
      dispatch(createPersonDailyActivity(personDailyActivityToCreate, existingAchievements));
    }
    toggleHeight();
    setSendMail(false);
  };

  const handleClickCancel = () => {
    toggleHeight();
    setSendMail(false);
    setSelectedActivityIds([...initialActivityIds]);
    calculateNumberOfSelectedActivities();
  };

  const error = {
    title: 'Your MVP Activities need to be approved.',
    text: `
		A confirmation email ${personDailyActivity?.IsWaitingForMvpApproval ? 'has been' : 'will be'} sent to People Operations Team.
		Once they approve it your points will be visible on dashboard.
		`
  };

  return (
    <div className="modal__no-activity">
      <div onClick={toggleHeight} className="modal__no-activity-title-wrap">
        <h3 className="modal__no-activity-title">{props.title}</h3>
        <span className="modal__no-activity-selected">{numberOfSelectedActivities}/{props.maxAllowed} Selected</span>
        <img src={arrow}
          className={`modal__no-activity-img ${maxHeight !== 0 ? 'modal__no-activity-img-rotate' : ''}`} alt="arow" />
      </div>
      <div className="modal__no-activity-body" style={{ maxHeight: maxHeight + 'px' }}>
        <div className={`modal__no-activity-inner-wrap modal__no-activity-inner-wrap--${props.index}`}>
          {!sendMail ?
            <div className="modal__no-activity-check-wrap">
              {props.activityGroupActivities.map((activityGroupActivitiesEntry, i) => {
                return (
                  <div key={i}>
                    <b>{activityGroupActivitiesEntry.ActivityGroup.Name}</b>
                    {
                      activityGroupActivitiesEntry.Activities.map(((item, index) =>
                        <NoActivityTab
                          key={index}
                          activity={item}
                          selected={isActivitySelected(item.ActivityId)}
                          handleChangeActivity={handleChangeSelectedActivityId}
                          canSelect={numberOfSelectedActivities < props.maxAllowed}
                        />
                      ))
                    }
                  </div>
                );
              })}
            </div>
            : <ErrorCard error={error} />
          }
          {
            sendMail ?
              <div className={`modal__button-wrap ${sendMail ? 'modal__button-wrap--error' : ''}`}>
                {personDailyActivity?.IsWaitingForMvpApproval ?
                  <>
                    <button className="button button--modal" onClick={toggleHeight}>Ok</button>
                  </>
                  :
                  <>
                    <button className="button button--modal" onClick={handleClickSave}>Save</button>
                    <button className="modal__button-cancel" onClick={handleClickCancel}>Cancel</button>
                  </>}
              </div>
              :
              <div className={`modal__button-wrap ${sendMail ? 'modal__button-wrap--error' : ''}`}>
                <button className="button button--modal" onClick={handleClickToggleSendMail}>Save</button>
                <button className="modal__button-cancel" onClick={handleClickCancel}>Cancel</button>
              </div>
          }
        </div>
      </div>
    </div>
  );
};