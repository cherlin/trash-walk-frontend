import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { StyleSheet, View } from 'react-native';
import Expo from 'expo';
import RootNavigator from './navigation/RootNavigator';
import reducers from './reducers';
import { saveState, loadState } from './localStorage';

import { api } from './middlewares/api';

import MontserratRegular from './assets/fonts/Montserrat-Regular.ttf';
import MontserratMedium from './assets/fonts/Montserrat-Medium.ttf';
import MontserratSemiBold from './assets/fonts/Montserrat-SemiBold.ttf';
import MontserratBold from './assets/fonts/Montserrat-Bold.ttf';
import MontserratExtraBold from './assets/fonts/Montserrat-ExtraBold.ttf';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/* eslint-disable no-underscore-dangle */
const middleware = [api];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));
/* eslint-enable */

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      MontserratRegular,
      MontserratSemiBold,
      MontserratMedium,
      MontserratBold,
      MontserratExtraBold,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <RootNavigator />
        </View>
      </Provider>
    );
  }
}
