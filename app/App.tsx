import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigate from './Navigate';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
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
