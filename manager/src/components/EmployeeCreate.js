import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { employeeCreate } from '../actions';
import {
  Card, CardSection, Button, Spinner,
} from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  onButtonPress = () => {
    const { name, phone, shift } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
  };

  renderButton() {
    const { loading } = this.props;
    if (loading) {
      return <Spinner />;
    }
    return <Button onPress={this.onButtonPress}>Create</Button>;
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

EmployeeCreate.propTypes = {
  employeeUpdate: PropTypes.func,
  employeeCreate: PropTypes.func,
  name: PropTypes.string,
  phone: PropTypes.string,
  shift: PropTypes.string,
  loading: PropTypes.bool,
};

EmployeeCreate.defaultProps = {
  employeeUpdate: null,
  employeeCreate: null,
  name: '',
  phone: '',
  shift: '',
  loading: false,
};

const mapStateToProps = (state) => {
  const {
    name, phone, shift, loading,
  } = state.employeeForm;
  return {
    name, phone, shift, loading,
  };
};

export default connect(
  mapStateToProps,
  { employeeCreate },
)(EmployeeCreate);
