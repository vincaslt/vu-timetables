import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoadingIndicator from '../../components/LoadingIndicator';
import { TimetableTabs } from '../../components/Timetable';
import { fetchTimetable, activateTimetableTab } from '../../actions/timetable';

import './styles.scss';

class TimetablePage extends Component {
  static propTypes = {
    timetable: PropTypes.object.isRequired,
    fetchTimetable: PropTypes.func.isRequired,
    routeParams: PropTypes.object.isRequired,
    activateTimetableTab: PropTypes.func.isRequired,
    activeTab: PropTypes.number,
  }

  componentWillMount() {
    const { dept, course } = this.props.routeParams;
    this.props.fetchTimetable(dept, course);
  }

  render() {
    const { timetable } = this.props;
    return (
      <LoadingIndicator wait={timetable.loading}>
        <TimetableTabs {...this.props} timetable={timetable.lectures} />
      </LoadingIndicator>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(TimetablePage);
