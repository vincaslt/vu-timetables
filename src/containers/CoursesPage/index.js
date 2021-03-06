import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CoursesList from '../../components/CoursesList';
import LoadingIndicator from '../../components/LoadingIndicator';
import { fetchCourses } from '../../actions/courses';
import { push } from 'react-router-redux';

import './styles.scss';

const mapStateToProps = ({ courses }) => ({
  courses,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    push,
    fetchCourses,
  }, dispatch)
);

@connect(mapStateToProps, mapDispatchToProps)
export default class CoursesPage extends Component {
  static propTypes = {
    courses: PropTypes.object.isRequired,
    fetchCourses: PropTypes.func.isRequired,
    routeParams: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchCourses(this.props.routeParams.dept);
  }

  componentWillReceiveProps(nextProps) {
    const currentDept = this.props.routeParams.dept;
    const nextDept = nextProps.routeParams.dept;
    if (nextDept !== currentDept) {
      this.props.fetchCourses(nextDept);
    }
  }

  handleSelectCourse = (course) => {
    this.props.push(`/${course.departmentId}/${course.id}`);
  }

  render() {
    const { courses } = this.props;
    return (
      <LoadingIndicator wait={courses.loading}>
        <div className="page-content">
          <CoursesList
            courses={courses.list}
            onCourseSelect={this.handleSelectCourse}
          />
        </div>
      </LoadingIndicator>
    );
  }
}
