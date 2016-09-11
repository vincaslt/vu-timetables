import React, { PropTypes } from 'react';

const DepartmentsList = ({ departments, onDepartmentSelect = () => true }) => {
  const listItems = departments.map((department) => (
    <li key={department.id}>
      <a onClick={() => onDepartmentSelect(department)}>
        [{department.id}] {department.title}
      </a>
    </li>
  ));
  return (
    <ul>
      {listItems}
    </ul>
  );
};

DepartmentsList.propTypes = {
  departments: PropTypes.array.isRequired,
  onDepartmentSelect: PropTypes.func,
};

export default DepartmentsList;
