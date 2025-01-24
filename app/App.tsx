import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigate from './Navigate';
import {ButtonProvider} from '../shared/ButtonContext/ButtonContext';
import {DataProvider} from '../context/DataProvider';
import {IndexWallProvider} from '../context/IndexWallContext/IndexWallContext';
import {ModalVisibleProvider} from '../context/ModalVisible/ModalVisibleContext';
function App(): React.JSX.Element {
  return (
    <ModalVisibleProvider>
      <IndexWallProvider>
        <SafeAreaView style={styles.container}>
          <ButtonProvider>
            <Navigate />
          </ButtonProvider>
        </SafeAreaView>
      </IndexWallProvider>
    </ModalVisibleProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
