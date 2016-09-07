import React, { PropTypes } from 'react';

const DepartmentsList = ({ departments }) => {
  const listItems = departments.map((department) => (
    <li><a href={`/${department.id}`}>{department.title}</a></li>
  ));
  return (
    <ul>
      {listItems}
    </ul>
  );
};

DepartmentsList.propTypes = {
  departments: PropTypes.array.isRequired
};

export default DepartmentsList;
