import Axios from 'axios';
import { API_URL } from '../../url';
import { FETCH_CALENDAR_ACTIVITIES_FAIL, FETCH_CALENDAR_ACTIVITIES_SUCCESS, SET_CALENDAR_INITIAL_STATE, FETCH_MONTH_SCORE_SUCCESS, FETCH_MONTH_SCORE_FAIL } from '../actionTypes';
import { secondAction } from '../utils';

export function fetchCalendarActivities(startDate, endDate, personId) {

  return (dispatch) => {
    Axios.post(`${API_URL}/person-daily-activity/calendar-person-activities/${personId}`, {
      StartDate: startDate.format('YYYY-MM-DD'),
      EndDate: endDate.format('YYYY-MM-DD')
    })
      .then(resp => {
        dispatch(secondAction(FETCH_CALENDAR_ACTIVITIES_SUCCESS, resp.data));
      })
      .catch(e => {
        dispatch(secondAction(FETCH_CALENDAR_ACTIVITIES_FAIL));
      });
  };

}

export function setCalendarInitialState() {

  return (dispatch) => {
    dispatch(secondAction(SET_CALENDAR_INITIAL_STATE));
  };

}

export function getMonthScore(year, month, personId) {
  return (dispatch) => {
    Axios.get(`${API_URL}/person-daily-activity/current-person-score/${personId}/${year}/${month}`)
      .then(resp => {
        dispatch(secondAction(FETCH_MONTH_SCORE_SUCCESS,resp.data.Score))
      })
      .catch(e => {
        dispatch(secondAction(FETCH_MONTH_SCORE_FAIL));
      })
  }
}

