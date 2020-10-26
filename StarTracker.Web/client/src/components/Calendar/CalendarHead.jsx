import React from 'react';
import arrow from '../../assets/icons/nav-arrow.svg';
import { CardHeading } from '../Heading/CardHeading';
import { months } from '../../hellpers';

export const CalendarHead = (props) => {
  var heading = {
    h: `${months[props.date.month]}, ${props.date.year}`,
    month: `${props.date.month + 1}`,
    year: `${props.date.year}`,
    monthName: `${months[props.date.month]}`
  };

  return (
    <div className="calendar__head">
      <CardHeading heading={heading} />
      <div className="calendar__nav">
        <div onClick={props.changeMonthPrev} className="calendar__arrow">
          <img className="calendar__arrow-img calendar__arrow-img--right" src={arrow} alt="" />
        </div>
        <div onClick={props.changeMonthNext} className="calendar__arrow">
          <img className="calendar__arrow-img" src={arrow} alt="" />
        </div>
      </div>
    </div>
  );
};