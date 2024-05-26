import React from 'react';
import { StyleSheet, StatusBar, Platform, View } from "react-native";
import Navigator from "./src/navigation/Navigator";
import { Provider } from 'react-redux';
import store from './src/store';
import { initSQLiteDB } from './src/presistence';

(async() => {
  const response = await initSQLiteDB();
})();

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }
});

export default App;
