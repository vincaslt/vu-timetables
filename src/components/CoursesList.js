import React, { PropTypes } from 'react';

const CoursesList = ({ courses }) => {
  const listItems = courses.map(({ id, title }) => (
    <li key={id}><a href="#">[{id}] {title}</a></li>
  ));
  return (
    <ul>
      {listItems}
    </ul>
  );
};

CoursesList.propTypes = {
  courses: PropTypes.array.isRequired
};

export default CoursesList;
