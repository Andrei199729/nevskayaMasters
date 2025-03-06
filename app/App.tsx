import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigate from './Navigate';
import {ButtonProvider} from '../shared/ButtonContext/ButtonContext';
import {IndexWallProvider} from '../context/IndexWallContext/IndexWallContext';
function App(): React.JSX.Element {
  return (
    <IndexWallProvider>
      <SafeAreaView style={styles.container}>
        <ButtonProvider>
          <Navigate />
        </ButtonProvider>
      </SafeAreaView>
    </IndexWallProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
