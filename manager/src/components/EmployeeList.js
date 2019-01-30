import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
  componentWillMount = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.employeesFetch();
  };

  renderRow = ({ item }) => <ListItem employee={item} />;

  keyExtractor = item => item.uid;

  render() {
    const { employees } = this.props;
    return (
      <FlatList data={employees} renderItem={this.renderRow} keyExtractor={this.keyExtractor} />
    );
  }
}

EmployeeList.propTypes = {
  employeesFetch: PropTypes.func,
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      shift: PropTypes.string.isRequired,
    }),
  ),
};

EmployeeList.defaultProps = {
  employeesFetch: null,
  employees: [],
};

const mapStateToProps = (state) => {
  const employees = _.map(state.employees, (val, uid) => ({ ...val, uid }));
  return {
    employees,
  };
};

export default connect(
  mapStateToProps,
  { employeesFetch },
)(EmployeeList);
