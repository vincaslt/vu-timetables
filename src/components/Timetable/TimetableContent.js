import React, { PropTypes } from 'react';

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

  const lectureNames = lectures.map((lecture, index) => {
    const groupString = group === null ? `[${lecture.group}gr.] ` : null;
    return (
      <li key={index}>
        {groupString}{lecture.title}
        : {JSON.stringify(lecture.time.start)} - {JSON.stringify(lecture.time.end)}
      </li>
    );
  });

  return (
    <div className="page-content">
      <ul>
        {lectureNames}
      </ul>
    </div>
  );
};

TimetableContent.propTypes = {
  timetableForOneDay: PropTypes.arrayOf(PropTypes.object),
  group: PropTypes.number,
  optionalLectures: PropTypes.arrayOf(PropTypes.string)
};

export default TimetableContent;
