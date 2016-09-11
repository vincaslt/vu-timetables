import React, { Component, /*PropTypes*/ } from 'react';
/*import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DepartmentsList from '../../components/DepartmentsList';
import LoadingIndicator from '../../components/LoadingIndicator';
import { fetchDepartments } from '../../actions/departments';*/

import './styles.scss';

export default class TimetablePage extends Component {
  /*static propTypes = {
    departments: PropTypes.object.isRequired,
    fetchDepartments: PropTypes.func.isRequired,
  }*/

  componentWillMount() {
    //this.props.fetchDepartments();
  }

  render() {
    return (
      <div>timetable page { JSON.stringify(this.props.routeParams) }</div>
    );
  }
}

/*const mapStateToProps = ({ departments }) => ({
  departments,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    fetchDepartments,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TimetablePage);*/
