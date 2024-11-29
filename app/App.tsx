import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigate from './Navigate';
import {ButtonProvider} from '../shared/ButtonContext/ButtonContext';
import {DataProvider} from '../context/DataProvider';
function App(): React.JSX.Element {
  return (
    <DataProvider>
      <SafeAreaView style={styles.container}>
        <ButtonProvider>
          <Navigate />
        </ButtonProvider>
      </SafeAreaView>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
