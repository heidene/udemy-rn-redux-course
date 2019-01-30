import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
};

class ListItem extends Component {
  onRowPress = () => {
    const { employee } = this.props;
    Actions.employeeEdit({ employee });
  };

  render() {
    const { employee } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress}>
        <View>
          <CardSection>
            <Text styles={styles.titleStyle}>{employee.name}</Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

ListItem.propTypes = {
  employee: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect()(ListItem);
