import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DepartmentsList from '../../components/DepartmentsList';
import LoadingIndicator from '../../components/LoadingIndicator';
import { fetchDepartments } from '../../actions/departments';
import { push } from 'react-router-redux';

import './styles.scss';

class DepartmentsPage extends Component {
  static propTypes = {
    departments: PropTypes.object.isRequired,
    fetchDepartments: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchDepartments();
  }

  handleSelectDepartment = (department) => {
    this.props.push(`/${department.id}`);
  }

  render() {
    const { departments } = this.props;
    return (
      <LoadingIndicator wait={departments.loading}>
        <DepartmentsList
          departments={departments.list}
          onDepartmentSelect={this.handleSelectDepartment}
        />
      </LoadingIndicator>
    );
  }
}

const mapStateToProps = ({ departments }) => ({
  departments,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    push,
    fetchDepartments,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsPage);
