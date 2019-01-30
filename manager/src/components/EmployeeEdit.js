import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { text } from 'react-native-communications';
import {
  Card, CardSection, Button, Spinner, Confirm,
} from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  state = {
    showModal: false,
  };

  componentWillMount = () => {
    const { employee } = this.props;
    _.each(employee, (value, prop) => {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.employeeUpdate({ prop, value });
    });
  };

  onTextPress = () => {
    const { phone, shift } = this.props;
    text(phone, `Your upcoming schedule is on ${shift}`);
  };

  onButtonSavePress = () => {
    const {
      name, phone, shift, employee,
    } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.employeeSave({
      name,
      phone,
      shift,
      uid: employee.uid,
    });
  };

  onAccept = () => {
    const { employee } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.employeeDelete({ uid: employee.uid });
  };

  renderSaveButton() {
    const { loading } = this.props;
    if (loading) {
      return <Spinner />;
    }
    return <Button onPress={this.onButtonSavePress}>Save Changes</Button>;
  }

  render() {
    const { showModal } = this.state;
    return (
      <Card>
        <EmployeeForm />

        <CardSection>{this.renderSaveButton()}</CardSection>

        <CardSection>
          <Button onPress={this.onTextPress}>Text Schedule</Button>
        </CardSection>

        <CardSection>
          <Button
            color="red"
            onPress={() => {
              this.setState({ showModal: !showModal });
            }}
          >
            Fire
          </Button>
        </CardSection>

        <Confirm
          visible={showModal}
          onAccept={this.onAccept}
          onDecline={() => {
            this.setState({ showModal: !showModal });
          }}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

EmployeeEdit.propTypes = {
  employeeUpdate: PropTypes.func.isRequired,
  employeeSave: PropTypes.func.isRequired,
  employeeDelete: PropTypes.func.isRequired,
  employee: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    shift: PropTypes.string,
  }).isRequired,
  name: PropTypes.string,
  phone: PropTypes.string,
  shift: PropTypes.string,
  loading: PropTypes.bool,
};

EmployeeEdit.defaultProps = {
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
    name,
    phone,
    shift,
    loading,
  };
};

export default connect(
  mapStateToProps,
  { employeeUpdate, employeeSave, employeeDelete },
)(EmployeeEdit);
