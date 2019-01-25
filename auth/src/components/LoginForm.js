import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'react-native-firebase';
import {
  Button, Card, CardSection, Input, Spinner,
} from './common';

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  };

  onButtonPress = () => {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(() => {
            this.setState(this.onLoginFail);
          });
      });
  };

  onLoginFail = () => {
    this.setState({ error: 'Authentication Failed.', loading: false });
  };

  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    });
  };

  renderButton() {
    const { loading } = this.state;
    if (loading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={this.onButtonPress}>Log In</Button>;
  }

  render() {
    const { email, password, error } = this.state;
    return (
      <Card>
        <CardSection>
          <Input
            value={email}
            onChangeText={changedText => this.setState({ email: changedText })}
            label="Email"
            placeholder="user@email.com"
          />
        </CardSection>

        <CardSection>
          <Input
            placeholder="password"
            label="Password"
            value={password}
            onChangeText={changedText => this.setState({ password: changedText })}
            secureTextEntry
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{error}</Text>

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

export default LoginForm;
