import React, { PropTypes } from 'react';
import TimetableEntry from './TimetableEntry';
import isEqual from 'lodash.isequal';

const optionalLecturesFilter = (lecture, optionalLectures) => (
  optionalLectures.length === 0 ||
  !lecture.optional ||
  optionalLectures.includes(lecture.id)
);

const groupFilter = (lecture, group) => (
  (group === null || lecture.group === group)
);

const TimetableContent = ({ timetableForOneDay = [], group = null, optionalLectures = [] }) => {
  const lectures = timetableForOneDay
    .filter(lecture => (
      groupFilter(lecture, group) &&
      optionalLecturesFilter(lecture, optionalLectures)
    ));

  let timeIntervalGroup = 0;
  let prevTime = lectures.length > 0 ? lectures[0].time : null;
  const timetableEntries = lectures.map((lecture, index) => {
    if (!isEqual(prevTime, lecture.time)) {
      timeIntervalGroup++;
      prevTime = lecture.time;
    }
    return (
      <TimetableEntry
        key={index}
        timeIntervalGroup={timeIntervalGroup}
        lecture={lecture}
        showGroup={group === null}
      />
  );
  });

  return (
    <div className="page-content">
      {timetableEntries}
    </div>
  );
};

TimetableContent.propTypes = {
  timetableForOneDay: PropTypes.arrayOf(PropTypes.object),
  group: PropTypes.number,
  optionalLectures: PropTypes.arrayOf(PropTypes.string)
};

export default TimetableContent;
