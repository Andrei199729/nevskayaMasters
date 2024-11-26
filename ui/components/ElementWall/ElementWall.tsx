import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../../../shared/tokens';
import ModalSizesElement from '../ModalSizesElement/ModalSizesElement';

export default function ElementWall({
  nameElement,
  stateElement,
  position,
  onPress,
  dataSizeElement,
  addedElement,
  modalVisibleSizes,
  setIsModalVisible,
  isActive,
  dataElement,
  isModalVisible,
  selectedElement,
  ...props
}: any) {
  return (
    <Pressable onPress={onPress}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <Text>
          {position} {nameElement}
        </Text>
        {stateElement === 'ventilation' && (
          <View style={styles.elementVentilation}></View>
        )}
        {stateElement === 'elementDoor' && (
          <View style={styles.elementDoor}></View>
        )}
        {stateElement === 'elementWindow' && (
          <View
            style={{
              ...styles.elementWindow,
              backgroundColor: Colors.green,
            }}></View>
        )}
        {stateElement === 'elementSocket' && (
          <View
            style={{
              ...styles.elementWindow,
              backgroundColor: Colors.red,
            }}></View>
        )}
        {stateElement === 'elementBattery' && (
          <View
            style={{
              ...styles.elementWindow,
              backgroundColor: Colors.lightGray,
            }}></View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  elementsWallContainer: {
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 630,
    borderColor: Colors.black,
    borderWidth: 1,
  },

  elementVentilation: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
    borderRadius: 1000,
    backgroundColor: Colors.menuBottom,
  },

  elementDoor: {
    width: 30,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
    backgroundColor: Colors.white,
  },

  elementWindow: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },
});
