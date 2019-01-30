import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
};

const CardSection = (props) => {
  const { children, style } = props;
  return <View style={[styles.containerStyle, style]}>{children}</View>;
};

CardSection.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

CardSection.defaultProps = {
  children: null,
  style: null,
};

export default CardSection;
