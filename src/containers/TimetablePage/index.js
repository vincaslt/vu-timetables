import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoadingIndicator from '../../components/LoadingIndicator';
import { TimetableTabs } from '../../components/Timetable';
import { fetchTimetable, activateTimetableTab } from '../../actions/timetable';

import './styles.scss';

const mapStateToProps = ({ timetable, activeTab }) => ({
  timetable,
  activeTab,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    fetchTimetable,
    activateTimetableTab,
  }, dispatch)
);

@connect(mapStateToProps, mapDispatchToProps)
export default class TimetablePage extends Component {
  static propTypes = {
    timetable: PropTypes.object.isRequired,
    fetchTimetable: PropTypes.func.isRequired,
    routeParams: PropTypes.object.isRequired,
    activateTimetableTab: PropTypes.func.isRequired,
    activeTab: PropTypes.number,
    location: PropTypes.object,
  }

  componentWillMount() {
    const { dept, course } = this.props.routeParams;
    this.props.fetchTimetable(dept, course);
  }

  componentWillReceiveProps(nextProps) {
    const currentProps = this.props.routeParams;
    const { dept, course } = nextProps.routeParams;
    if (dept !== currentProps.dept ||
        course !== currentProps.course) {
      this.props.fetchTimetable(dept, course);
    }
  }

  render() {
    const { timetable, location, activeTab } = this.props;
    let optionalLectures = location.query.opt || [];
    if (!Array.isArray(optionalLectures)) {
      optionalLectures = Array.of(optionalLectures);
    }
    const timetableTabsProps = {
      lectures: timetable.lectures,
      activateTimetableTab: this.props.activateTimetableTab,
      group: Number(location.query.group) || null,
      optionalLectures,
      activeTab,
    };

    return (
      <LoadingIndicator wait={timetable.loading}>
        <TimetableTabs {...timetableTabsProps} />
      </LoadingIndicator>
    );
  }
}
