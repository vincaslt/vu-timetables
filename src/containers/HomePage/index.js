import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DepartmentsList from '../../components/DepartmentsList';
import CoursesList from '../../components/CoursesList';
import LoadingIndicator from '../../components/LoadingIndicator';
import { fetchDepartments } from '../../actions/departments';
import { fetchCourses } from '../../actions/courses';
import { fetchTimetable } from '../../actions/timetable';

import './styles.scss';

class HomePage extends Component {
  static propTypes = {
    departments: PropTypes.object.isRequired,
    courses: PropTypes.object.isRequired,
    fetchDepartments: PropTypes.func.isRequired,
    fetchCourses: PropTypes.func.isRequired,
    fetchTimetable: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchDepartments();
  }

  handleSelectDepartment = (department) => {
    this.props.fetchCourses(department.id);
  }

  handleSelectCourse = (course) => {
    this.props.fetchTimetable(course.departmentId, course.id);
  }

  render() {
    const { departments, courses } = this.props;
    return (
      <div>
        <LoadingIndicator wait={departments.loading}>
          <DepartmentsList
            departments={departments.list}
            onDepartmentSelect={this.handleSelectDepartment}
          />
        </LoadingIndicator>
        <hr />
        <LoadingIndicator wait={courses.loading}>
          <CoursesList
            courses={courses.list}
            onCourseSelect={this.handleSelectCourse}
          />
        </LoadingIndicator>
      </div>
    );
  }
}

const mapStateToProps = ({ departments, courses, timetable }) => ({
  departments,
  courses,
  timetable,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    fetchDepartments,
    fetchCourses,
    fetchTimetable,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
