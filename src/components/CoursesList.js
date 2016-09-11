import React, { PropTypes } from 'react';

const CoursesList = ({ courses, onCourseSelect = () => true }) => {
  const listItems = courses.map(course => (
    <li key={course.id}>
      <a onClick={() => onCourseSelect(course)}>
        [{course.id}] {course.title}
      </a>
    </li>
  ));
  return (
    <ul>
      {listItems}
    </ul>
  );
};

CoursesList.propTypes = {
  courses: PropTypes.array.isRequired,
  onCourseSelect: PropTypes.func
};

export default CoursesList;
