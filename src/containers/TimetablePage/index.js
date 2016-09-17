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
    const { timetable, location } = this.props;
    const group = Number(location.query.group) || null;
    return (
      <LoadingIndicator wait={timetable.loading}>
        <TimetableTabs {...this.props} timetable={timetable.lectures} group={group} />
      </LoadingIndicator>
    );
  }
}
