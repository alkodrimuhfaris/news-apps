import React, {Component} from 'react';
import Main from './src/screens/Main';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import store from './src/redux/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.parent}>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          <Main />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  }
})