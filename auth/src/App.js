import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import {
  Header, Button, Spinner, CardSection,
} from './components/common';
import LoginForm from './components/LoginForm';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent = () => {
    const { loggedIn } = this.state;

    switch (loggedIn) {
      case true:
        return (
          <CardSection>
            <Button
              onPress={() => {
                firebase.auth().signOut();
              }}
            >
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  };

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
