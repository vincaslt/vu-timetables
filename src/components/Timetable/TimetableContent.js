import React, { PropTypes } from 'react';
import { Content } from 'react-mdl';

const TimetableContent = ({ timetableForOneDay = [] }) => {
  const lectureNames = timetableForOneDay.map((lecture, index) => (
    <li key={index}>{lecture.title}</li>
  ));
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
};

export default TimetableContent;
