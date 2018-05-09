import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StyleSheet, View } from 'react-native';
import RootNavigator from './navigation/RootNavigator';
import reducers from './reducers/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const store = createStore(reducers,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <RootNavigator />
      </View>
    </Provider>
  );
}
