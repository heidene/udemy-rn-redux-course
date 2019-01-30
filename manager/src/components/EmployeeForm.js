import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { employeeUpdate } from '../actions';
import { CardSection, Input } from './common';

const styles = {
  pickerContainerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  pickerStyle: {
    flex: 2,
  },
};

class EmployeeForm extends Component {
  onChangeField = (text, field) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.employeeUpdate({ prop: field, value: text });
  };

  render() {
    const { name, phone, shift } = this.props;
    const { pickerContainerStyle, pickerLabelStyle, pickerStyle } = styles;
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="Jane Doe"
            value={name}
            onChangeText={text => this.onChangeField(text, 'name')}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Phone"
            placeholder="555-555-555"
            value={phone}
            onChangeText={text => this.onChangeField(text, 'phone')}
          />
        </CardSection>
        <CardSection>
          <View style={pickerContainerStyle}>
            <Text style={pickerLabelStyle}>Shift</Text>
            <Picker
              style={pickerStyle}
              selectedValue={shift}
              onValueChange={value => this.onChangeField(value, 'shift')}
              itemStyle={{ fontSize: 18 }}
            >
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
          </View>
        </CardSection>
      </View>
    );
  }
}

EmployeeForm.propTypes = {
  employeeUpdate: PropTypes.func.isRequired,
  name: PropTypes.string,
  phone: PropTypes.string,
  shift: PropTypes.string,
};

EmployeeForm.defaultProps = {
  name: '',
  phone: '',
  shift: '',
};

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(
  mapStateToProps,
  { employeeUpdate },
)(EmployeeForm);
