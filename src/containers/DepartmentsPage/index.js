import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DepartmentsList from '../../components/DepartmentsList';
import LoadingIndicator from '../../components/LoadingIndicator';
import { fetchDepartments } from '../../actions/departments';
import { push } from 'react-router-redux';

import './styles.scss';

const mapStateToProps = ({ departments }) => ({
  departments,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    push,
    fetchDepartments,
  }, dispatch)
);

@connect(mapStateToProps, mapDispatchToProps)
export default class DepartmentsPage extends Component {
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
        <div className="page-content">
          <DepartmentsList
            departments={departments.list}
            onDepartmentSelect={this.handleSelectDepartment}
          />
        </div>
      </LoadingIndicator>
    );
  }
}
