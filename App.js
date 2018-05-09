import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { StyleSheet, View } from 'react-native';
import RootNavigator from './navigation/RootNavigator';
import reducers from './reducers';

import { api } from './middlewares/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(api),
    /* eslint no-underscore-dangle: ["error",
    { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] } ] */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <RootNavigator />
      </View>
    </Provider>
  );
}
