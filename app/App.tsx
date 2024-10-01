import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigate from './Navigate';
import Header from '../ui/components/Header/Header';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Navigate />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
