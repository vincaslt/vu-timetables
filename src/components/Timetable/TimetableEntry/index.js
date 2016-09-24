import React, { PropTypes } from 'react';

import './styles.scss';

const TimetableEntry = ({ lecture, timeIntervalGroup = 0, showGroup = false }) => {
  const entryClass = `timetable-entry group-${timeIntervalGroup % 7}`;

  const { start, end } = lecture.time;
  const timeString = (
    <h3>
      {start.hour}<small>{start.minutes}</small>
      <span className="time-separator"></span>
      {end.hour}<small>{end.minutes}</small>
    </h3>
  );

  const groupContent = showGroup ? (
    <div className="group-content">
      <h4>
        {lecture.group}gr.
      </h4>
    </div>
  ) : null;

  const subgroups = lecture.subgroups ?
    `[${lecture.subgroups.join(', ')}pogr.]` : null;

  return (
    <div className={entryClass}>
      {groupContent}
      <div className="content">
        <h4>{lecture.title} {subgroups}</h4>
      </div>
      <div className="time-container">
        {timeString}
      </div>
    </div>
  );
};

TimetableEntry.propTypes = {
  lecture: PropTypes.object.isRequired,
  timeIntervalGroup: PropTypes.number,
  showGroup: PropTypes.bool
};

export default TimetableEntry;
