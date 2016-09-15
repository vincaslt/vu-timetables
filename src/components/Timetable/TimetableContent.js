import React, { PropTypes } from 'react';
import { Content } from 'react-mdl';

const TimetableContent = ({ timetableForOneDay = [], group = null }) => {
  const lectures = group === null ?
    timetableForOneDay :
    timetableForOneDay.filter(lecture => (lecture.group === group));

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
    <Content>
      <ul>
        {lectureNames}
      </ul>
    </Content>
  );
};

TimetableContent.propTypes = {
  timetableForOneDay: PropTypes.arrayOf(PropTypes.object),
  group: PropTypes.number
};

export default TimetableContent;
