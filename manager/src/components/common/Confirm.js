import React from 'react';
import { Text, View, Modal } from 'react-native';
import PropTypes from 'prop-types';
import Button from './Button';
import CardSection from './CardSection';

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
};

const Confirm = ({
  visible, children, onAccept, onDecline,
}) => {
  const { containerStyle, cardSectionStyle, textStyle } = styles;
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>{children}</Text>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Button color="red" onPress={onAccept}>
            Yes
          </Button>
          <Button onPress={onDecline}>No</Button>
        </CardSection>
      </View>
    </Modal>
  );
};

Confirm.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

Confirm.defaultProps = {
  visible: false,
};

export default Confirm;
