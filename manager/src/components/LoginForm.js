import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import {
  Card, CardSection, Input, Button, Spinner,
} from './common';

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

class LoginForm extends Component {
  omEmailChange = (text) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.emailChanged(text);
  };

  onPasswordChange = (text) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.passwordChanged(text);
  };

  onButtonPress = () => {
    const { email, password } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.loginUser({ email, password });
  };

  renderError = () => {
    const { error } = this.props;
    if (error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>{error}</Text>
        </View>
      );
    }
    return null;
  };

  renderButton = () => {
    const { loading } = this.props;
    if (loading) {
      return <Spinner />;
    }
    return <Button onPress={this.onButtonPress}>Login</Button>;
  };

  render() {
    const { email, password } = this.props;
    return (
      <Card>
        <CardSection>
          <Input
            label="Label"
            placeholder="email@mail.com"
            onChangeText={this.omEmailChange}
            value={email}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Password"
            placeholder="password"
            secureTextEntry
            onChangeText={this.onPasswordChange}
            value={password}
          />
        </CardSection>
        {this.renderError()}
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

LoginForm.propTypes = {
  emailChanged: PropTypes.func,
  passwordChanged: PropTypes.func,
  loginUser: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

LoginForm.defaultProps = {
  emailChanged: null,
  passwordChanged: null,
  loginUser: null,
  email: '',
  password: '',
  error: '',
  loading: false,
};

const mapStateToProps = (state) => {
  const {
    email, password, error, loading,
  } = state.auth;
  return {
    email,
    password,
    error,
    loading,
  };
};

export default connect(
  mapStateToProps,
  { emailChanged, passwordChanged, loginUser },
)(LoginForm);
