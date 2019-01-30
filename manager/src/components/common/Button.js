import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, ViewPropTypes } from 'react-native';

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#007aff',
    borderWidth: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonTextStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
};

const Button = (props) => {
  const { buttonStyle, buttonTextStyle } = styles;
  const { children, onPress, color } = props;
  return (
    <TouchableOpacity style={[buttonStyle, { borderColor: color }]} onPress={onPress}>
      <Text style={[buttonTextStyle, { color }]}>{children}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
};

Button.defaultProps = {
  color: '#007aff',
};

export default Button;
