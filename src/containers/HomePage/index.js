import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DepartmentsList from '../../components/DepartmentsList';
import LoadingIndicator from '../../components/LoadingIndicator';
import { fetchDepartments } from '../../actions/departments';

import './styles.css';

class HomePage extends Component {
  static propTypes = {
    departments: PropTypes.object.isRequired,
    fetchDepartments: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchDepartments();
  }

  render() {
    return (
      <div>
        <LoadingIndicator wait={this.props.departments.loading}>
          <DepartmentsList departments={this.props.departments.list} />
        </LoadingIndicator>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  departments: state.departments,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ fetchDepartments }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
