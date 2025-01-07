import {Modal, StyleSheet, View} from 'react-native';
import {Colors} from '../../../shared/tokens';
import Svg, {Path} from 'react-native-svg';

export default function DrawModalWall({
  drawModalVisible,
  setDrawModalVisible,
  drawing,
  id,
}: any) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={drawModalVisible}
      onRequestClose={() => setDrawModalVisible(!drawModalVisible)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Svg key={id} style={styles.savedDrawing} viewBox="0 0 200 200">
              {drawing.shapes.map(
                (line: {path: string | undefined}, idx: number) => (
                  <Path
                    key={idx}
                    d={line.path}
                    stroke={'black'}
                    strokeWidth={4}
                    fill="none"
                  />
                ),
              )}
            </Svg>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 500,
    zIndex: 1,
  },
  modalView: {
    width: '100%',
    height: 500,
    margin: 30,
    backgroundColor: 'white',
    padding: 20,
    shadowColor: Colors.green,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 10,
  },
  savedDrawing: {
    marginVertical: 10,
  },
});
