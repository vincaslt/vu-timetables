import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CoursesList from '../../components/CoursesList';
import LoadingIndicator from '../../components/LoadingIndicator';
import { fetchCourses } from '../../actions/courses';
import { push } from 'react-router-redux';

import './styles.scss';

class CoursesPage extends Component {
  static propTypes = {
    courses: PropTypes.object.isRequired,
    fetchCourses: PropTypes.func.isRequired,
    routeParams: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchCourses(this.props.routeParams.dept);
  }

  handleSelectCourse = (course) => {
    this.props.push(`/${course.departmentId}/${course.id}`);
  }

  render() {
    const { courses } = this.props;
    return (
      <LoadingIndicator wait={courses.loading}>
        <CoursesList
          courses={courses.list}
          onCourseSelect={this.handleSelectCourse}
        />
      </LoadingIndicator>
    );
  }
}

const mapStateToProps = ({ courses }) => ({
  courses,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    push,
    fetchCourses,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
